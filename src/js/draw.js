function circle(x,y,radius,begin)
{
	if(begin)
		ctx.beginPath();
	ctx.moveTo((x+radius)*rW,y*rW);
	ctx.arc(x*rW,y*rW,radius*rW,0,Math.PI*2);

	if(begin)
	{
		ctx.stroke();
		ctx.fill();
	}
}

function wave(x,y,w,h,angle,begin)
{
	h = h/2;
	ctx.save();
	ctx.translate(x*rW,y*rW);
	ctx.rotate(angle);
	if(begin)
		ctx.beginPath();
    ctx.moveTo((-w)*rW,(-h)*rW);
	ctx.quadraticCurveTo(0,-h*rW,0,0);
	ctx.quadraticCurveTo(0,h*rW,-w*rW,h*rW);
	ctx.quadraticCurveTo(-w*rW/2,h*rW,-w*rW/2,0);
	ctx.quadraticCurveTo(-w*rW/2,-h*rW,-w*rW,-h*rW);
	if(begin)
	{
		ctx.closePath();
		ctx.stroke();
	    ctx.fill();
	}
	ctx.restore();
}

function drawText(text,x,y)
{
	ctx.fillText(text,x*rW,y*rW);
	ctx.strokeText(text,x*rW,y*rW);
}


function blackText(text,x,y,size,align)
{

	ctx.fillStyle="black";
	colorText(text,x,y,size,align);
}

function colorText(text,x,y,size,align,)
{
	ctx.textAlign = align;
	size = Math.round(size*rW);
	ctx.font="normal 100 "+size+"px \"Comic Sans MS\", cursive, sans-serif";

	ctx.lineWidth = size/20;
	ctx.strokeStyle="white";
	drawText(text, x, y);
}

function longText(text,x,y,width,size,lineHeight,align)
{
	ctx.textAlign = align;
	size = Math.round(size*rW);
	ctx.font="normal 100 "+size+"px \"Comic Sans MS\", cursive, sans-serif";
	ctx.lineWidth = size/20;
	ctx.fillStyle="black";
	ctx.strokeStyle="white";
	var words = text.split(" ");
	var current = words[0];
	var line = y;
	width = width*rW;

	for(var i = 1;i<words.length;i++)
	{
		if(ctx.measureText(current+" "+words[i]).width>=width)
		{
			drawText(current,x,line);
			line+= lineHeight;
			current = words[i];
		}
		else current += " "+words[i];

	}
		drawText(current,x,line);
}

function line(x,y,x2,y2,width,color)
{
	ctx.beginPath();
	ctx.strokeStyle=color;
	ctx.lineWidth = width*rW;
	ctx.moveTo(x*rW,y*rW);
	ctx.lineTo(x2*rW,y2*rW);
	ctx.closePath();
	ctx.stroke();
}


function triangle(centerX,centerY,width,height,rotation,begin)
{
	var w = width/2;
	var h = height/2;
	ctx.save();
	ctx.translate(centerX*rW,centerY*rW);
	ctx.rotate(rotation);
	if(begin)
		ctx.beginPath();
    ctx.moveTo((-w)*rW,(-h)*rW);
    ctx.lineTo((-w)*rW,(h)*rW);
    ctx.lineTo((w)*rW,0);
	ctx.lineTo((-w)*rW,(-h)*rW);
	if(begin)
	{
		ctx.closePath();
		ctx.stroke();
	    ctx.fill();
	}
	ctx.restore();
}

function filledRect(x,y,w,h,percent)
{
	ctx.beginPath();
	ctx.rect(x*rW,y*rW,w*rW*percent,h*rW);
	ctx.fill();
	ctx.beginPath();
	ctx.rect(x*rW,y*rW,w*rW,h*rW);
	ctx.stroke();
}

function angleRect(x,y,w,h,angle)
{
	ctx.save();
	ctx.translate((x)*rW,(y)*rW);
	ctx.rotate(angle);
	ctx.rect(-w/2*rW,-h/2*rW,w*rW,h*rW);
	ctx.restore();
}
