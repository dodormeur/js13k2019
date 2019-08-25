class Heros
{

	constructor()
	{
		this.x = 800;
		this.y = 450;
		this.maxArmor = 1000;
		this.armor = 1000;
		this.life = 1000;
		this.maxLife = 1000;
		this.cooldown = 0;
	}

	draw()
	{

		triangle(this.x,this.y,20,15,0);
	}

	frame()
	{
		if(this.armor<this.maxArmor)
			this.armor++;
		this.cooldown--;
		var dirX = 0;
		var dirY = 0;
		if(keys[38])dirY--;
		if(keys[40])dirY++;
		if(keys[37])dirX--;
		if(keys[39])dirX++;

		var mult = 3;
		if(Math.abs(dirX)+Math.abs(dirY)>1)
			mult = 2;

		mult/=2
		var old = {x:this.x,y:this.y};
		this.x += dirX*mult;
		this.y += dirY*mult;
		if(oob(this.x,this.y,0))
		{
			this.x = old.x;
			this.y = old.y;
		}
		if(keys[32] && this.cooldown <=0)
		{
			addBullet(new Bullet(this.x,this.y,0,0,true));
			this.cooldown = 20;
		}
	}

	collide(bullet)
	{
		this.armor-=50;
		if(this.armor<0)
		{
			this.life+=this.armor;
			this.armor = 0;
			if(this.life<0)this.life = 0;
		}
	}

	getBoundingBox()
	{
		return {x:this.x,y:this.y,w:20,h:20};
	}
}
