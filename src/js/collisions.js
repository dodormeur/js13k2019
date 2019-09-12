class Hitbox
{

	constructor()
	{
		this.type = "n";
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.angle = 0;
		this.hitboxes = null;
	}
	null()
	{
		this.type = "n";
	}
	circle(x,y,w)
	{
		this.type = "c";
		this.x = x;
		this.y = y;
		this.w = w;
	}

	rect(x,y,w,h,angle)
	{
		this.type = "r";
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.angle = angle;
	}

	multiple(hitboxes)
	{
		this.type = "m";
		this.hitboxes = hitboxes;
	}

	collide(other)
	{
		if(this.type == "n")return false;
		if(other.type == "n")return false;
		if(this.type == "m")
		{
			for(var i = 0;i<this.hitboxes.length;i++)
			{
				if(this.hitboxes[i].collide(other))
					return true;
			}
			return false;
		}
		if(other.type == "m")
		{
			return other.collide(this);
		}

		if(this.type == "c" && other.type == "c")
		{
			var dist = (this.x-other.x)*(this.x-other.x)+ (this.y-other.y)*(this.y-other.y)
			return dist<=(this.w+other.w)*(this.w+other.w);
		}
		if(this.type == "r" && other.type == "r")
		{
			return doPolygonsIntersect(calculateCorners(this),calculateCorners(other));
		}
		if(this.type == "r" && other.type == "c")
		{
			var c = calculateCorners(this);
			for(var i = 0;i<4;i++)
			{
				var temp = {x1 : c[i].x,y1 : c[i].y,x2 : c[(i+1)%4].x,y2 : c[(i+1)%4].y};
				if(circleDistFromLineSeg(other,temp)<other.w)return true;
			}
		}
		if(this.type == "c" && other.type == "r")
		{
			return other.collide(this);
		}
	}

	debug()
	{
		if(this.type == "m")
		{
			for(var i = 0;i<this.hitboxes.length;i++)
			{
				this.hitboxes[i].debug();
			}
		}
		if(this.type == "c")
		{
			circle(this.x,this.y,this.w,true);
		}
		if(this.type == "r")
		{
			ctx.beginPath();
			angleRect(this.x,this.y,this.w,this.h,this.angle);
			ctx.stroke();
		}
	}
}

function calculateCorners(rect)
{
	var points = [];
	var delta =[[1,1],[-1,1],[1,-1],[-1,-1]];
	for(var i = 0;i<4;i++)
	{
		var x = rect.x-(rect.w*delta[i][0])/2;
		var y = rect.y-(rect.h*delta[i][1])/2;

		var tempX = x - rect.x;
		var tempY = y - rect.y;

		// now apply rotation
		var rotatedX = tempX*Math.cos(rect.angle) - tempY*Math.sin(rect.angle);
		var rotatedY = tempX*Math.sin(rect.angle) + tempY*Math.cos(rect.angle);

		// translate back
		x = rotatedX + rect.x;
		y = rotatedY + rect.y;
		points.push({x:x,y:y});
	}
	return points;
}

//https://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if ((minA===undefined) || projected < minA) {
                    minA = projected;
                }
                if ((maxA===undefined) || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if ((minB===undefined) || projected < minB) {
                    minB = projected;
                }
                if ((maxB===undefined) || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                return false;
            }
        }
    }
    return true;
};

//https://stackoverflow.com/questions/37224912/circle-line-segment-collision
//circle : {x,y,w}
//line : {x1,x2,y1,y2}
function circleDistFromLineSeg(circle,line){
    var v1, v2, v3, u;
    v1 = {};
    v2 = {};
    v3 = {};
    v1.x = line.x2 - line.x1;
    v1.y = line.y2 - line.y1;
    v2.x = circle.x - line.x1;
    v2.y = circle.y - line.y1;
    u = (v2.x * v1.x + v2.y * v1.y) / (v1.y * v1.y + v1.x * v1.x); // unit dist of point on line
    if(u >= 0 && u <= 1){
        v3.x = (v1.x * u + line.x1) - circle.x;
        v3.y = (v1.y * u + line.y1) - circle.y;
        v3.x *= v3.x;
        v3.y *= v3.y;
        return Math.sqrt(v3.y + v3.x); // return distance from line
    }
    // get distance from end points
    v3.x = circle.x - line.x2;
    v3.y = circle.y - line.y2;
    v3.x *= v3.x;  // square vectors
    v3.y *= v3.y;
    v2.x *= v2.x;
    v2.y *= v2.y;
    return Math.min(Math.sqrt(v2.y + v2.x), Math.sqrt(v3.y + v3.x)); // return smaller of two distances as the result
}
