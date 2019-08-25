class Enemy
{
	constructor()
	{
		this.x = Math.random()*1600;
		this.y = Math.random()*(900-hudStart)+hudStart;
		this.mustRemove = false;
	}
	draw()
	{

		circle(this.x,this.y,10,true);
	}

	frame()
	{
		if(Math.random()<0.01)
		{
			addBullet(new Bullet(this.x,this.y,0,Math.PI + Math.atan2(this.y-heros.y,this.x-heros.x) + Math.random()*0.2-0.1,false));
		}
	}

	getBoundingBox()
	{
		return {x:this.x,y:this.y,w:20,h:20};
	}
	collide(damage)
	{
		this.mustRemove = true;
	}
}
