class Enemy
{
	//types : 0 = shop dummy
	//movement : 0 = not moving
	//shoot : 0 = no shooting
	constructor(type,movement,shoot,x,y)
	{
		if(type == 10)type = 9;
		this.type = type;
		this.movementAI = movement;
		this.shootAI = shoot;

		this.x = x;
		this.y = y;
		this.life = 1000;
		this.angle = 0;
		this.frameCount = 0;

		this.type = type;
		this.drawing = type;
		this.speed = 1;
		switch(type)
		{
			case 0:
				this.life = 99999;
				this.drawing = 0;
				break;
			case 1:
				this.life = 500;
				this.drawing = 1;
				this.speed = 0.5;
				break;
			case 2:
				this.life = 1000;
				this.drawing = 2;
				this.speed = 1;
				break;
			case 3:
				this.life = 100;
				this.drawing = 3;
				this.speed = 3;
				break;
			case 4:
				this.life = 3000;
				this.drawing = 4;
				this.speed = 0.2;
				break;
			case 5:
				this.life = 2000;
				this.drawing = 5;
				this.speed = 1.4;
				break;
			case 6:
				this.life = 4000;
				this.drawing = 6;
				this.speed = 0.8;
				break;
			case 7:
				this.life = 5000;
				this.drawing = 7;
				this.speed = 0.7;
				break;
			case 8:
				this.life = 6000;
				this.drawing = 8;
				this.speed = 1.5;
				break;
			case 9:
				this.life = 5000;
				this.drawing = 9;
				this.speed = 2.5;
				break;
			case 11:
				this.life = 10000;
				this.drawing = 11;
				this.speed = 1;
				break;
			case 12:
				this.life = 20000;
				this.drawing = 12;
				this.speed = 1;
				break;

		}

		this.fireRate = (shoot%4)*(shoot%4)+1;
		this.fireType = Math.floor(shoot/4);
		this.mustRemove = false;
		this.tookDamage = 0;
		this.maxTookDamage = 0;
		this.hit = new Hitbox();
		this.movementTarget = null;
	}
	draw()
	{

		ctx.strokeStyle="black";
		ctx.fillStyle="white";
		if(this.tookDamage>0)
		{
			ctx.setLineDash([1, this.tookDamage/(this.maxTookDamage/5)]);
			var temp = 256-Math.round(256*this.tookDamage/this.maxTookDamage);
			ctx.fillStyle="rgb("+temp+","+temp+","+temp+")";
		}
		else
			ctx.setLineDash([]);

		ctx.save();
		ctx.translate(this.x*rW,this.y*rW);
		ctx.rotate(this.angle);
		switch(this.drawing)
		{
			//15->12 : big bosses
			//11->8 : medium ennemies
			case 14:case 13:


			case 12:
				ctx.beginPath();
				wave(0,0,40,100,Math.PI,false)
				wave(50,8,30,80,Math.PI/2,false)
				wave(50,-8,30,80,Math.PI*3/2,false)
				circle(30,50,10,false);
				circle(30,-50,10,false);
				circle(90,-12,10,false);
				circle(90,12,10,false);
				ctx.stroke();
				ctx.fill();

			break;
			case 11:

				ctx.beginPath();
				var size = Math.sin(this.frameCount/200)*5;
				wave(0,0,20+size,60,Math.PI*3/2,false);
				wave(0,0,20+size,60,0,false);
				wave(0,0,20+size,60,Math.PI/2,false);
				circle(0,0,20,false);
				ctx.stroke();
				ctx.fill();
				circle(0,0,10,true);
			break;
			case 10://TODO : redo

				break;
			case 9:

				ctx.beginPath();
				var size = Math.sin(this.frameCount/200)*5;
				wave(0,0,25+size,60,0,false);
				wave(0,0,25+size,60,Math.PI,false);
				wave(0,0,25+size,60,Math.PI/2,false);
				wave(0,0,25+size,60,Math.PI*3/2,false);
				ctx.stroke();
				ctx.fill();
			break;
			case 8:
				ctx.beginPath();

				ctx.save();
				var angle = this.frameCount/200;
				ctx.rotate(-angle);
				angleRect(13,13,15,15,Math.PI/2);
				angleRect(13,-13,15,-15,Math.PI/2);
				angleRect(-13,13,-15,15,Math.PI/2);
				angleRect(-13,-13,-15,-15,Math.PI/2);

				ctx.restore();
				//angleRect(0,0,15,15,Math.PI/4);
				circle(0,0,8,false);
				angle = this.frameCount/100;
				var cos = Math.cos(angle);
				var sin = Math.sin(angle);
				wave(40*cos,40*sin,20,30,angle,false);
				wave(-40*cos,-40*sin,20,30,Math.PI+angle,false);
				wave(-40*cos,40*sin,20,30,-angle+Math.PI,false);
				wave(40*cos,-40*sin,20,30,-angle,false);
				//wave(40*cos,-40*sin,20,30,-Math.PI/2+angle,false);
				/*wave(28*cos,-28*sin,20,30,7*Math.PI/4-angle,false);
				wave(-28*cos,28*sin,20,30,3*Math.PI/4-angle,false);
				wave(-28*cos,-28*sin,20,30,5*Math.PI/4-angle,false);*/
				ctx.stroke();
				ctx.fill();
			break;

			//0->7 : small size ennemies
			case 7:

				ctx.beginPath();
				//ctx.rect(-15,-15,30,30);
				angleRect(0,0,27,27,Math.PI/4);
				angleRect(0,0,30,30,0);
				ctx.stroke();
				ctx.fill();

			break;
			case 6:

				ctx.beginPath();
				angleRect(8,8,5,5,0);
				angleRect(-8,8,-5,5,0);
				angleRect(8,-8,5,-5,0);
				angleRect(-8,-8,-5,-5,0);
				circle(0,0,8,false);
				ctx.stroke();
				ctx.fill();
			break;
			case 5:
				ctx.beginPath();
				wave(0,20,15,50,Math.PI/2,false);
				circle(-11,0,14,false);
				wave(0,-20,15,50,-Math.PI/2,false);
				ctx.stroke();
				ctx.fill();
			break;
			case 4:
				circle(0,0,10,true);
				ctx.beginPath();
				wave(20,0,15,50,0,false);
				wave(0,20,15,50,Math.PI/2,false);
				wave(-20,0,15,50,Math.PI,false);
				wave(0,-20,15,50,-Math.PI/2,false);
				ctx.stroke();
				ctx.fill();

			break;
			case 3:
				circle(0,0,20,true);
				circle(7,0,10,true);
				circle(0,0,2,true);
			break;
			case 2:
				ctx.beginPath();
				triangle(10,0,20,15,0,false);
				triangle(0,10,20,15,Math.PI/2,false);
				triangle(0,-10,20,15,-Math.PI/2,false);
				triangle(-10,0,20,15,Math.PI,false);
				ctx.stroke();
				ctx.fill();
			break;
			case 1:
				ctx.beginPath();
				wave(0,20,15,50,Math.PI/2,false);
				circle(0,0,15,false);
				wave(0,-20,15,50,-Math.PI/2,false);
				ctx.stroke();
			    ctx.fill();
			break;
			case 0:
				circle(0,0,10,true);
			break;
		}

		ctx.restore();
	}

	frame()
	{
		/*this.angle+= 0.01;
		this.x+= 0.1*Math.cos(this.angle);
		this.y+= 0.1*Math.sin(this.angle);*/

		if(oob(this.x,this.y,1000))this.mustRemove = true;
		this.tookDamage--;
		this.frameCount++;

		var tourniquetSpeed = 100;

		var speed = this.speed/heros.slowDown;
		switch(this.movementAI)
		{
			case 0:
			break;

			case 1 :
				this.x -= speed;
			break;
			case 2 :
				this.x -= speed;
				this.y += speed*Math.cos(this.frameCount/100);
			break;
			case 3 :
				if(this.frameCount < 500)
					this.x-=speed;
				else if(this.frameCount > 1000) this.x += speed;
			break;
			case 4 :
				if(this.y<500)
					this.y += speed;
				else
					this.y -= speed;
				if(this.frameCount > 150)
					this.x += speed*(this.frameCount-150)/100;
			break;

			case 8:

				this.movementTarget = {x:heros.x,y:heros.y};
			case 7:
				if(this.movementTarget === null)
					this.movementTarget = {x:heros.x,y:heros.y};
			case 6:
				if(this.movementTarget === null)
					this.movementTarget = {x:Math.random()*800+800,y:Math.random()*(900-hudStart)+hudStart};

			case 5:
				if(this.movementTarget === null)
					this.movementTarget = {x:Math.random()*1600,y:Math.random()*(900-hudStart)+hudStart};

				var angle = Math.atan2(this.y-this.movementTarget.y,this.x-this.movementTarget.x)+Math.PI;
				this.x += speed*Math.cos(angle);
				this.y += speed*Math.sin(angle);

				var dx = this.x-this.movementTarget.x;
				var dy = this.y-this.movementTarget.y;

				if(dx*dx+dy*dy <= speed*speed*1.2)
					this.movementTarget = null;

			break;
			case 9 :
				if(this.frameCount < 500)
					this.x-=speed;
			break;
		}


		if((this.frameCount%(500/this.fireRate*heros.slowDown)) == 1)
		switch(this.fireType)
		{
			case 0:break;

			case 3:
				addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x)+0.2,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x)-0.2,false));
			case 2:
				addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x)+0.1,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x)-0.1,false));
			case 1:
				addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x),false));
			break;


			case 5:
				addBullet(new Bullet(this.x,this.y,0,Math.PI*1.25 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*2.25 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*1.75 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*2.75 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
			case 4:
				addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x),false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*2 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*1.5 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*2.5 + Math.atan2(this.y-heros.y,this.x-heros.x),false));
			break;

			case 10:
				addBullet(new Bullet(this.x,this.y,0,Math.PI+0.5,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI-0.5,false));
			case 9:
				addBullet(new Bullet(this.x,this.y,0,Math.PI+0.35,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI-0.35,false));
			case 8:
				addBullet(new Bullet(this.x,this.y,0,Math.PI+0.2,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI-0.2,false));
			case 7:
				addBullet(new Bullet(this.x,this.y,0,Math.PI+0.1,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI-0.1,false));
			case 6:
				addBullet(new Bullet(this.x,this.y,0,Math.PI,false));
			break;



			case 14:
				addBullet(new Bullet(this.x,this.y,0,Math.PI/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*3/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*5/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*7/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*9/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*11/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*13/8,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*15/8,false));
			case 13:
				addBullet(new Bullet(this.x,this.y,0,Math.PI/4,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*3/4,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*5/4,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI*7/4,false));
			case 12:
				addBullet(new Bullet(this.x,this.y,0,-Math.PI/2,false));
				addBullet(new Bullet(this.x,this.y,0,0,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI/2,false));
			case 11:
				addBullet(new Bullet(this.x,this.y,0,Math.PI,false));
			break;

			case 17:
				addBullet(new Bullet(this.x,this.y,0,-Math.PI/2+this.frameCount/tourniquetSpeed,false));
				addBullet(new Bullet(this.x,this.y,0,Math.PI/2+this.frameCount/tourniquetSpeed,false));
			case 16:
				addBullet(new Bullet(this.x,this.y,0,Math.PI+this.frameCount/tourniquetSpeed,false));
			case 15:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed,false));
			break;

			case 24:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed+0.6,false));
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed-0.6,false));
			case 23:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed+0.5,false));
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed-0.5,false));
			case 22:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed+0.4,false));
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed-0.4,false));
			case 21:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed+0.3,false));
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed-0.3,false));
			case 20:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed+0.2,false));
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed-0.2,false));
			case 19:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed+0.1,false));
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed-0.1,false));

			case 18:
				addBullet(new Bullet(this.x,this.y,0,this.frameCount/tourniquetSpeed,false));
		}
	}

	getHitbox()
	{
		if(this.hit == null)this.hit = new Hitbox();

		switch(this.drawing)
		{
			case 0 :
				this.hit.circle(this.x,this.y,10);
			break;
			case 1:
				this.hit.rect(this.x,this.y,50,43,0);
			break;
			case 2:
				var i = new Hitbox();
				i.rect(this.x,this.y,15,40,0);
				var j = new Hitbox();
				j.rect(this.x,this.y,40,15,0);
				this.hit.multiple([i,j]);
			break;
			case 3:
				this.hit.circle(this.x,this.y,20);
			break;
			case 4:
				this.hit.rect(this.x,this.y,45,45,0);
			break;
			case 5:
				this.hit.rect(this.x,this.y,45,40,0);
			break;
			case 6:
				this.hit.rect(this.x,this.y,21,21,0);
			break;
			case 7:
				this.hit.rect(this.x,this.y,32,32,0);
			break;
			case 8:
				var i = new Hitbox();
				var j = new Hitbox();
				var k = new Hitbox();
				var angle = this.frameCount/200;
				i.rect(this.x,this.y,40,40,-angle);
				angle = this.frameCount/100;
				j.rect(this.x,this.y,35,80,-angle+Math.PI/2);
				k.rect(this.x,this.y,35,80,angle+Math.PI/2);
				this.hit.multiple([i,j,k]);
			break;
			case 9:
				this.hit.rect(this.x,this.y,60,60,0);
			break;
			case 11:
				this.hit.circle(this.x,this.y,25);
			break;
			case 12:
				var i = new Hitbox();
				i.rect(this.x+60,this.y,80,40,0);
				var j = new Hitbox();
				j.rect(this.x+20,this.y,40,120,0);
				this.hit.multiple([i,j]);
			break;

		}
		//this.hit.rect(this.x,this.y,20,20,0);
		return this.hit;
	}
	collide(damage)
	{
		if(damage > this.tookDamage)
		{
			this.tookDamage = damage;
			this.maxTookDamage = damage;
		}
		this.life -= damage;
		if(this.life <= 0)this.mustRemove = true;

		//this.mustRemove = true;
	}
}
