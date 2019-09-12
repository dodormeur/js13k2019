class Heros
{

	constructor()
	{
		this.x = 800;
		this.y = 450;
		this.maxArmor = 3000;
		this.armor = 3000;
		this.life = 10000;
		this.maxLife = 10000;
		this.offAngle = 0;
		this.energy = 0;
		this.maxEnergy = 10000;
		this.cooldown = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		this.hit = new Hitbox();
		this.frameUltimate = 0;
		this.invulnerable = 0;
		this.slowDown = 1;
		this.mustRemove = false;
		this.upgrades = [
			[1,1,1,1],
			[1,1,1,1],
			[1,1,1,1],
			[1,1,1,1]
		]

		this.bulletproofX = -1;
		this.bulletproofY = -1;
		this.bulletproofFrame = 0;
		this.bulletproofHit = new Hitbox();

	}

	draw()
	{
		if(this.invulnerable>100)
			ctx.setLineDash([1, 2]);
		else if(this.invulnerable>0)
			ctx.setLineDash([1, this.invulnerable/50]);
		triangle(this.x,this.y,40,30,0,true);
		ctx.setLineDash([]);

		if(this.bulletproofFrame>0)
		{
			wave(this.bulletproofX,this.bulletproofY,10,100,0,true);
		}
	}

	frame()
	{
		if(this.armor<this.maxArmor)
			this.armor++;

		for(var i = 0;i<12;i++)
			this.cooldown[i]--;

		if(this.bulletproofFrame>0)this.bulletproofFrame--;
		if(this.invulnerable>0)this.invulnerable--;
		if(this.energy<this.maxEnergy)
			this.energy+=1.5;
		if(this.frameUltimate >0)this.frameUltimate ++;
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
		if(keys[32])
		{
			this.fire();
		}
		if(keys[70])
		{
			if(this.energy >= this.maxEnergy)
			{
				this.energy = 0;
				this.frameUltimate = 1;
			}
		}
		if((keys[65] || keys[81]) && this.upgrades[3][0])
		{
			if(this.energy > this.maxEnergy*0.2 && this.cooldown[8]<=0)
			{
				this.energy -= this.maxEnergy*0.2;
				this.cooldown[8] = 2000;

				this.bulletproofX = this.x+30;
				this.bulletproofY = this.y;
				this.bulletproofFrame = 2000;
				//pare balle
			}
		}
		if((keys[90] || keys[87])  && this.upgrades[3][1])
		{
			if(this.energy > this.maxEnergy*0.4 && this.cooldown[9]<=0)
			{
				this.energy -= this.maxEnergy*0.4;
				this.life+= this.maxLife*0.05;
				if(this.life >this.maxLife)this.life = this.maxLife;
				this.cooldown[9] = 200;
				//shield
			}
		}
		if(keys[69] && this.upgrades[3][2])
		{
			if(this.energy > this.maxEnergy*0.4 && this.cooldown[10]<=0)
			{
				this.energy -= this.maxEnergy*0.4;
				this.armor = this.maxArmor;
				this.cooldown[10] = 200;
			}
		}
		if(keys[82] && this.upgrades[3][3])
		{
			if(this.energy > this.maxEnergy*0.4 && this.cooldown[11]<=0)
			{
				this.energy -= this.maxEnergy*0.4;
				this.invulnerable = 100;
				this.cooldown[11] = 200;
			}
		}
		this.ultimate();
	}

	ultimate()
	{
		this.slowDown = 1;
		if(this.frameUltimate<=0)return;
		for(var i = 0;i<4;i++)
		{
			if(this.upgrades[2][i])
			{
				switch(i)
				{
					case 0:
						if(this.frameUltimate<610 && (this.frameUltimate%30) == 2)
						{
							var angle = (this.frameUltimate/600)*(this.frameUltimate/600)*Math.PI/2
							addBullet(new Bullet(this.x,this.y,3,angle,true));
							addBullet(new Bullet(this.x,this.y,3,-angle,true));
						}
					break;
					case 1:
						var plateau = 1000;
						var slope = 500;
						var slow = 5;
						if(this.frameUltimate<plateau)
						{
							this.slowDown = slow;
						}
						else if(this.frameUltimate<plateau+slope)
						{
							this.slowDown = slow-(this.frameUltimate-plateau)*(slow-1)/(slope);
						}

					break;
					case 2:
						if(this.frameUltimate<600)
						{
							addBullet(new Bullet(this.x,this.y,0,this.frameUltimate/10,true));
							addBullet(new Bullet(this.x,this.y,0,Math.PI+this.frameUltimate/10,true));
						}
					break;
					case 3:
						if(this.frameUltimate==3)
						{
							this.invulnerable = 1000;
						}

					break;
				}
			}

		}
	}

	fire()
	{
		for(var i = 0;i<4;i++)
		{
			if(this.upgrades[0][i])
			{
				if(this.cooldown[i]<=0)
				{
					switch(i)
					{
						case 0 :
							addBullet(new Bullet(this.x,this.y,0,(Math.random()-0.5)*(Math.random()-0.5)/10,true));
							this.cooldown[0] = 20;
						break;
						case 1 :
							addBullet(new Bullet(this.x,this.y,1,(Math.random()-0.5)/5,true));
							this.cooldown[1] = 10;
						break;
						case 2 :
							addBullet(new Bullet(this.x,this.y,2,0,true));
							this.cooldown[2] = 50;
						break;
						case 3 :
							addBullet(new Bullet(this.x+5,this.y,3,0,true));
							this.cooldown[3] = 150;
						break;
					}
				}
			}
		}

		for(var i = 0;i<4;i++)
		{
			if(this.upgrades[1][i])
			{

				if(this.cooldown[i+4]<=0)
				{
					switch(i)
					{
						case 0 :
							addBullet(new Bullet(this.x,this.y,5,Math.PI/2,true));
							addBullet(new Bullet(this.x,this.y,5,-Math.PI/2,true));
							this.cooldown[4] = 80;
						break;
						case 1 :
							this.offAngle += Math.PI/4;
							addBullet(new Bullet(this.x,this.y,7,this.offAngle,true));
							addBullet(new Bullet(this.x,this.y,7,this.offAngle+Math.PI*2/3,true));
							addBullet(new Bullet(this.x,this.y,7,this.offAngle+Math.PI*4/3,true));
							this.cooldown[5] = 80;
						break;
						case 2 :
							var nb = 15;
							for(var i = 0;i<nb;i++)
								addBullet(new Bullet(this.x,this.y,6,Math.PI*2*i/nb,true));
							this.cooldown[6] = 250;
						break;
						case 3 :
							addBullet(new Bullet(this.x-10,this.y,8,Math.PI*3/2,true));
							this.cooldown[7] = 350;
						break;

					}
				}
			}
		}
	}

	bulletproofCollide(bullet)
	{
		this.bulletproofFrame-=250;
	}

	collide(bullet)
	{
		this.armor-=1500;
		if(this.armor<0)
		{
			this.life+=this.armor;
			this.armor = 0;
			if(this.life<0)
			{
				this.mustRemove = true;
			}
		}
	}

	getHitbox()
	{
		if(this.invulnerable>0)this.hit.null();
		else
		{
			var i = new Hitbox();
			i.rect(this.x-10,this.y,20,26,0);
			var j = new Hitbox();
			j.rect(this.x,this.y,20,16,0);
			var k = new Hitbox();
			k.rect(this.x+15,this.y,10,6,0);
			this.hit.multiple([i,j,k]);
		}
		return this.hit;
	}

	getBulletProofHitbox()
	{
		if(this.bulletproofFrame<=0)this.bulletproofHit.null();
		else this.bulletproofHit.rect(this.bulletproofX-5,this.bulletproofY,10,100,0);
		return this.bulletproofHit;
	}
}
