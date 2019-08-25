

class Background
{
	constructor()
	{
		this.scroll = 0;
	}

	frame()
	{
		//this.scroll+=0.2;
		this.scroll = this.scroll%20;
	}

	draw()
	{

		var rW = canvas.width/1600.0;
		var rH = canvas.height/900.0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle="blue";
		ctx.lineWidth = 0.1;
		ctx.beginPath();
		for(var i = 0;i<900;i+=20)
		{
			ctx.moveTo(0,i*rH);
			ctx.lineTo(rW*1600,i*rH);
		}
		for(var j = -this.scroll;j<1600;j+=20)
		{
			ctx.moveTo(j*rW,0);
			ctx.lineTo(j*rW,900*rH);
		}
		ctx.closePath();
		ctx.stroke();

	}

	drawForHUD()
	{
		var rW = canvas.width/1600.0;
		var rH = canvas.height/900.0;
		ctx.clearRect(0, 0, canvas.width, hudStart*rH);

		ctx.strokeStyle="blue";
		ctx.lineWidth = 0.1;
		ctx.beginPath();
		for(var i = 0;i<hudStart;i+=20)
		{
			ctx.moveTo(0,i*rH);
			ctx.lineTo(rW*1600,i*rH);
		}
		for(var j = -this.scroll;j<1600;j+=20)
		{
			ctx.moveTo(j*rW,0);
			ctx.lineTo(j*rW,hudStart*rH);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle="red";
		ctx.lineWidth = 1;
		ctx.moveTo(0,hudStart*rH);
		ctx.lineTo(rW*1600,hudStart*rH);
		ctx.closePath();
		ctx.stroke();
	}
}
