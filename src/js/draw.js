function circle(x,y,radius,begin)
{
	if(begin)
		ctx.beginPath();
	ctx.moveTo(x*rW,(y+radius)*rW);
	ctx.arc(x*rW,y*rW,radius*rW,0,Math.PI*2);

	if(begin)
	{
		ctx.stroke();
		ctx.fill();
	}
}

function drawText(text,x,y)
{
	ctx.fillText(text,x*rW,y*rW);
	ctx.strokeText(text,x*rW,y*rW);
}


function blackText(text,x,y,size,align)
{

	ctx.textAlign = align;
	size = Math.round(size*rW);
	ctx.font="normal 100 "+size+"px \"Comic Sans MS\", cursive, sans-serif";

	ctx.lineWidth = size/20;
	ctx.fillStyle="black";
	ctx.strokeStyle="white";
	drawText(text, x, y);
}


function longText(text,x,y,ySize,align)
{

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


function triangle(centerX,centerY,width,height,rotation)
{
	var w = width/2;
	var h = height/2;
	ctx.save();
	ctx.translate(centerX*rW,centerY*rW);
	ctx.rotate(rotation*Math.PI/180);
	ctx.beginPath();
    ctx.moveTo((-w)*rW,(-h)*rW);
    ctx.lineTo((-w)*rW,(h)*rW);
    ctx.lineTo((w)*rW,0);
	ctx.closePath();
	ctx.stroke();
    ctx.fill();
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
