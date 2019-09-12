
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

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle="blue";
		ctx.lineWidth = 0.1;
		ctx.beginPath();
		for(var i = 0;i<900;i+=20)
		{
			ctx.moveTo(0,i*rW);
			ctx.lineTo(rW*1600,i*rW);
		}
		for(var j = -this.scroll;j<1600;j+=20)
		{
			ctx.moveTo(j*rW,0);
			ctx.lineTo(j*rW,900*rW);
		}
		ctx.closePath();
		ctx.stroke();

	}

	drawForHUD()
	{
		ctx.clearRect(0, 0, canvas.width, hudStart*rW);

		ctx.strokeStyle="blue";
		ctx.lineWidth = 0.1;
		ctx.beginPath();
		for(var i = 0;i<hudStart;i+=20)
		{
			ctx.moveTo(0,i*rW);
			ctx.lineTo(rW*1600,i*rW);
		}
		for(var j = -this.scroll;j<1600;j+=20)
		{
			ctx.moveTo(j*rW,0);
			ctx.lineTo(j*rW,hudStart*rW);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle="red";
		ctx.lineWidth = 1*rW;
		ctx.moveTo(0,hudStart*rW);
		ctx.lineTo(rW*1600,hudStart*rW);
		ctx.closePath();
		ctx.stroke();

		ctx.fillStyle="#888";
		ctx.strokeStyle="transparent";
		ctx.lineWidth = 0;
		circle(562,36,12,true);
		circle(1046,36,12,true);
	}
}
