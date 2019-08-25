class Character {
	constructor()
	{
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.z = 0;
		this.headFrame = 0;
		this.bopping = 0;

		this.baseLegHeight = 20;
		this.legHeight = 20;
		this.torsoHeight = 40;

		this.legAnimation = {what:0,finished:-2,start:0,duration:500}; // 0 = idle, 1 = falled
		this.armAnimation = {what:0,finished:-2,start:0,duration:0};
		this.leg = {};
		this.legR = {};
		this.arm = {};
		this.armR = {};
		this.timestamp = 0;
		this.delta = 0;
		this.queue = [0,1,0,1,0,1,0];
	}

	setAnimation(which)
	{
		var timestamp = window.performance.now();
		switch(which)
		{
			case 0 :

				this.legAnimation = {what:0,finished:0,start:timestamp,duration:500};
			break;
			case 1 :

				this.legAnimation = {what:1,finished:0,start:timestamp,duration:300};
			break;
		}
	}

	cleanup()
	{
		if(this.legAnimation.finished == 2)
		{
			if(this.queue.length != 0)
			{
				this.setAnimation(this.queue.pop());
			}
		}
	}

	frame(delta)
	{
		if(this.z>0)
		{
			this.z-=delta/10;
			if(this.z<=0){
				this.z = 0;
				this.queue = [0,1];

			}
		}
	}

	draw(timestamp)
	{
		this.delta = timestamp-this.timestamp;
		this.frame(this.delta);
		this.timestamp = timestamp;
		ctx.lineWidth=3;
		ctx.strokeStyle= "black";
		ctx.fillStyle="white";
		ctx.lineCap = "round";
		this.bopping=Math.sin(timestamp/600);


		ctx.fillStyle="#BBB";
		ctx.beginPath();
		ctx.ellipse(this.x+0.5,this.y+0.5,14,8,0,0,8);
		ctx.fill();

		ctx.fillStyle="white";
		this.drawChar(this.x+0.5,this.y+0.5-this.z);

		this.cleanup();
	}

	drawChar(x,y)
	{
		this.drawLeg(x-5,y,true);
		this.drawLeg(x+5,y,false);

		this.drawTorso(x,y-this.legHeight);

		//this.drawArm(x-10,y+5,true);
	}

	drawTorso(x,y)
	{
		y-= this.torsoHeight;
		this.drawArm(x+11,y+10+this.bopping,false);
		this.drawArm(x-11,y+10+this.bopping,true);

		ctx.beginPath();
		ctx.rect(x-10,y+this.bopping+5,20,this.torsoHeight-this.bopping-7);
		ctx.stroke();
		ctx.fill();
		this.drawHead(x,y-10+this.bopping*2);
	}

	drawLeg(x,y,reverse)
	{

		var m = reverse?-1:1;
		var object = reverse?this.legR:this.leg;
		var targetLeg = object;
		var actualLeg = object;
		var targetHeight;

		if(this.legAnimation.what == 1){
			targetHeight=this.baseLegHeight*0.7;
			targetLeg = {x:0,y:targetHeight,handleX:targetHeight*m,handleY:targetHeight/2,height:targetHeight};
		}
		else if(this.legAnimation.what == 0)
		{
			targetHeight=this.baseLegHeight;
			targetLeg = {x:0,y:targetHeight,handleX:0,handleY:targetHeight/2,height:this.baseLegHeight};
		}
		if(this.legAnimation.finished != 2)
		{


			if(this.legAnimation.finished >= 0)
			{
				var delta = this.timestamp-this.legAnimation.start;
				var p = delta/this.legAnimation.duration;
				if(delta>this.legAnimation.duration)
				{
					this.legAnimation.finished++;
					if(reverse)
						this.legR = targetLeg;
					else
						this.leg = targetLeg;
				}
				actualLeg = this.transitionObject(object,targetLeg,this.lT,p);
				//{x:this.lT(object.x,targetLeg.x,p),y:this.lT(object.y,targetLeg.y,p),handleX:this.lT(object.handleX,targetLeg.handleX,p),handleY:this.lT(object.handleY,targetLeg.handleY,p),height:this.lT(object.height,targetLeg.height,p)}
			}
			else
			{
				this.legAnimation.finished++;
				if(reverse)
					this.legR = targetLeg;
				else
					this.leg = targetLeg;
			}
		}
		this.legHeight = actualLeg.height;
		y-=this.legHeight;


		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x+actualLeg.handleX, y+actualLeg.handleY,x+actualLeg.x,y+actualLeg.y);
		ctx.stroke(); // Draw it
	}
	drawHead(x,y)
	{
		ctx.lineWidth=3;
		ctx.beginPath();
		ctx.arc(x,y,15,0,8);
		ctx.stroke();
		ctx.fill();

		ctx.lineWidth=2;
		ctx.beginPath();
		ctx.moveTo(x-5,y-5);
		ctx.lineTo(x-5,y+2);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x+5,y-5);
		ctx.lineTo(x+5,y+2);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x-5,y+8);
		ctx.quadraticCurveTo(x,y+12,x+5,y+8);
		ctx.stroke();
	}



	drawArm(x,y,reverse)
	{
		var m = reverse?-1:1;

		var m = reverse?-1:1;
		var object = reverse?this.armR:this.arm;
		var targetArm = object;
		var actualArm = object;


		if(this.armAnimation.what == 0)
		{
			targetArm = {x:5+this.bopping,y:25,handleX:5,handleY:0};
		}
		if(this.armAnimation.finished != 2)
		{
			if(this.armAnimation.finished >= 0)
			{
				var delta = this.timestamp-this.armAnimation.start;
				var p = delta/this.armAnimation.duration;
				if(delta>this.armAnimation.duration)
				{
					this.armAnimation.finished++;
					if(reverse)
						this.armR = targetArm;
					else
						this.arm = targetArm;
				}
				actualArm = this.transitionObject(object,targetArm,this.lT,p);
				//{x:this.lT(object.x,targetLeg.x,p),y:this.lT(object.y,targetLeg.y,p),handleX:this.lT(object.handleX,targetLeg.handleX,p),handleY:this.lT(object.handleY,targetLeg.handleY,p),height:this.lT(object.height,targetLeg.height,p)}
			}
			else
			{
				this.armAnimation.finished++;
				if(reverse)
					this.armR = targetArm;
				else
					this.arm = targetArm;
			}
		}
		else actualArm = targetArm;

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x+actualArm.handleX*m, y+actualArm.handleY,x+actualArm.x*m,y+actualArm.y);
		ctx.stroke(); // Draw it

/*
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x+5*m, y,x+5*m+this.bopping*m,y+25);
		ctx.stroke(); // Draw it*/

	}



	lT(start,end,p)
	{
		return start+(end-start)*p;
	}

	transitionObject(startO,endO, transition,p)
	{
		var o = {};
		for (var prop in startO) {
		    if (Object.prototype.hasOwnProperty.call(startO, prop)) {
		        o[prop] = transition(startO[prop],endO[prop],p);
		    }
		}
		return o;
	}
}
