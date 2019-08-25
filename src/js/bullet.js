class Bullet
{
	constructor(x,y,type,angle,ally)
	{
		this.x = x;
		this.y = y;
		this.type = type;
		this.angle = angle;
		this.mustRemove = false;
		this.speed = 1.5;
		this.ally = ally;
		if(ally)this.speed*=3;
	}

	frame()
	{
		switch(this.type)
		{
			case 0:
				this.y+=Math.sin(this.angle)*this.speed;
				this.x+=Math.cos(this.angle)*this.speed;

				if(oob(this.x,this.y,50))
					this.mustRemove = true;
			break;
		}
	}

	draw()
	{
		switch(this.type)
		{
			case 0:
				circle(this.x,this.y,5,false);
				break;
		}
	}

	collide(target)
	{
		var box = target.getBoundingBox();
		if(Math.abs(this.x-box.x)>(5+box.w/2))return false;
		if(Math.abs(this.y-box.y)>(5+box.h/2))return false;

		switch(this.type)
		{
			case 0:
				this.mustRemove = true;
		}
		return true;
	}
}
