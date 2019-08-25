function circle(x,y,radius,begin)
{
	if(begin)
		ctx.beginPath();
	ctx.moveTo(x*canvas.width/1600.0,(y+radius)*canvas.height/900.0);
	ctx.arc(x*canvas.width/1600.0,y*canvas.height/900.0,radius*canvas.height/900.0,0,Math.PI*2);

	if(begin)
	{
		ctx.stroke();
		ctx.fill();
	}
}

function text(text,x,y)
{
	var rW = canvas.width/1600.0;
	var rH = canvas.height/900.0
	ctx.fillText(text,x*rW,y*rH);
	ctx.strokeText(text,x*rW,y*rH);
}

function triangle(centerX,centerY,width,height,rotation)
{
	var w = width/2;
	var h = height/2;
	var rW = canvas.width/1600.0;
	var rH = canvas.height/900.0
	ctx.save();
	ctx.translate(centerX*rW,centerY*rH);
	ctx.rotate(rotation*Math.PI/180);
	ctx.beginPath();
    ctx.moveTo((-w)*rW,(-h)*rH);
    ctx.lineTo((-w)*rW,(h)*rH);
    ctx.lineTo((w)*rW,0);
	ctx.closePath();
	ctx.stroke();
    ctx.fill();
	ctx.restore();
}


function filledRect(x,y,w,h,percent)
{
	var rW = canvas.width/1600.0;
	ctx.beginPath();
	ctx.rect(x*rW,y*rW,w*rW*percent,h*rW);
	ctx.fill();
	ctx.beginPath();
	ctx.rect(x*rW,y*rW,w*rW,h*rW);
	ctx.stroke();
}
