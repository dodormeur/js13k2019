class Bullet
{
	constructor(x,y,type,angle,ally)
	{
		this.x = x;
		this.y = y;
		this.type = type;
		this.angle = angle;
		this.mustRemove = false;
		this.speed = 1;
		this.ally = ally;
		this.frameCount = 0;

		this.width = 0;
		this.height = 0;
		this.acceleration = 0;
		this.target = null;
		this.hit = new Hitbox();
		switch(type)
		{
			case 0:
				this.speed = 1;
			break;
			case 1:
				this.speed = 1.5
			break;
			case 2:
				this.speed = 1;
			break;
			case 3:
				this.speed = 0;
			break;
			case 4:
				this.speed = 0;
			break;
			case 5:
				this.speed = 0.5;
			break;
			case 6:
				this.speed = 0.3;
			break;
			case 7:
				this.speed = 0.1;
				this.acceleration = 0.01;
				this.type = 0;
			case 8:
				this.speed = 0.3;
				this.acceleration = 0.001;
				this.width = 20;

		}
		if(ally === true)this.speed*=3;
		else this.speed/=1.5

	}

	frame()
	{
		this.frameCount++;
		switch(this.type)
		{
			case 0:

				if(oob(this.x,this.y,50))
					this.mustRemove = true;
			break;
			case 1:case 6:
				this.width = 30-(this.frameCount*(this.type==6?1.3:1))/10;
				this.height = this.frameCount/3+20;
				if(this.frameCount>300-(this.type-1)*20)
					this.mustRemove = true;
			break;
			case 2:

				if(oob(this.x,this.y,50))
					this.mustRemove = true;
			break;
			case 3:
				this.acceleration += 0.001;

				if(oob(this.x,this.y,50))
					this.mustRemove = true;
			break;
			case 5:
				if(this.target === null ||( this.frameCount%10) == 0)
				{
					var distance = 99999999;
					for(var i = 0;i<enemies.length;i++)
					{
						var e = enemies[i];
						var score = (e.x-this.x)*(e.x-this.x)+(e.y-this.y)*(e.y-this.y);
						if(score < distance)
						{
							this.target = e;
							distance= score;
						}
					}
				}
				if(this.target != null)
				{
					var targetAngle = Math.atan2(-this.y+this.target.y,-this.x+this.target.x);
					var deltaAngle = (targetAngle - this.angle);
					deltaAngle += Math.PI*3;
					deltaAngle %= (Math.PI*2);
					deltaAngle -= Math.PI;
					if(Math.abs(targetAngle-this.angle)<0.05)
					{
						this.angle = targetAngle;
					}
					else if(deltaAngle<0)
					{
						this.angle-=0.02;
					}
					else
						this.angle+=0.02;
				}

				this.angle += Math.PI
				this.angle = this.angle%(Math.PI*2);
				this.angle -= Math.PI
				if(this.frameCount>2000)
					this.mustRemove = true;
			break;
			case 8:
				this.angle+=0.02/this.speed;
				if(this.frameCount>20000)
					this.mustRemove = true;
				if(oob(this.x,this.y,2000))
					this.mustRemove = true;
			break;
		}
		this.speed += this.acceleration;
		var factor = 1;
		if(this.ally == false)factor = heros.slowDown;
		this.y+=Math.sin(this.angle)*this.speed/factor;
		this.x+=Math.cos(this.angle)*this.speed/factor;
	}

	draw()
	{
		switch(this.type)
		{
			case 0:
				circle(this.x,this.y,5,false);
				break;
			case 1:case 6:
				wave(this.x,this.y,this.width,this.height,this.angle,false);
				break;
			case 2:
				angleRect(this.x,this.y,10,10,this.frameCount);
				angleRect(this.x,this.y,10,10,-this.frameCount);
				break;
			case 3:
				circle(this.x,this.y,10,false);
				wave(this.x,this.y,30,30,this.angle,false);
				break;
			case 4:
				circle(this.x,this.y,this.width,false);
				break;
			case 5:
				circle(this.x,this.y,3,false);
				wave(this.x,this.y,15,15,this.angle,false);
				break;
			case 8:
				circle(this.x,this.y,this.width,false);
				break;
		}
	}

	getDamage()
	{
		switch(this.type)
		{
			case 0:return 100;
			case 1:return 5;
			case 2: return 200;
			case 3: return 500;
			case 5: return 50;
			case 6:return 5;
			case 8:return 500;
		}
		return 1;
	}


	refreshHitbox()
	{
		switch(this.type)
		{
			case 0:
				this.hit.circle(this.x,this.y,5);
			break;
			case 1:
				this.hit.rect(this.x-this.width/2,this.y,this.width,this.height,this.angle);
			break;
			case 2:
				this.hit.circle(this.x,this.y,8);
			break;
			case 3:
				this.hit.circle(this.x,this.y,10);
			break;
			case 5:
				this.hit.circle(this.x,this.y,7);
			break;
			case 6:
				this.hit.rect(this.x-this.width/2*Math.cos(this.angle),this.y-this.width/2*Math.sin(this.angle),this.width,this.height,this.angle);
			break;
			case 8:

				this.hit.circle(this.x,this.y,this.width);
			break;
		}
		//this.hit.rect(this.x,this.y,60,10,Math.PI/10);
	}

	collide(box)
	{
		this.refreshHitbox();
		switch(this.type)
		{
			case 0:
				if(this.hit.collide(box))
				{
					this.mustRemove = true;
					return true;
				}
				return false;
			break;
			case 1:
				return this.hit.collide(box);
				//this.mustRemove = true;
			break;
			case 2:
				if(!this.hit.collide(box))return false;
				this.y+= Math.random()*100-50;
				this.x-= 800*Math.cos(this.angle);
				if(this.x<0)this.x = 0;
				return true;
			break;
			case 3:
				if(!this.hit.collide(box))return false;
				addShake(20,20);
				this.mustRemove = true;
				var nb = 15;
				for(var i = 0;i<nb;i++)
					addBullet(new Bullet(this.x,this.y,6,Math.PI*2*i/nb,true));
				return true;
			break;
			case 4:
				console.log("legacy");
			break;
			case 5:
				if(!this.hit.collide(box))return false;
				this.mustRemove = true;
				return true;
			break;
			case 6:
				return this.hit.collide(box);
			case 8:
				if(this.hit.collide(box))
				{
					this.mustRemove = true;
					return true;
				}
				return false;
		}
		return true;
	}
}
