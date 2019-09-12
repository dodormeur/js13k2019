
var heros;
var enemies = [];
var bullets_ally = [];
var bullets_enemy = [];
var background;
var hud;

class Game
{
	constructor(gameMode,level)
	{
		this.gameMode = gameMode;
		this.gameOver = false;
		this.level = level;
		hud = new HUD();
		background = new Background();
		bullets_ally = [];
		bullets_enemy = [];
		enemies = [];

		heros.life = heros.maxLife;
		heros.mustRemove = false;
		heros.armor = heros.maxArmor;
		heros.energy = 0;
		this.frameCount = 0;
		//
		this.waves = [];
		this.loadLevel(level,gameMode);
		/*for(var i = 0 ;i<15;i++)
			enemies.push(new Enemy(i,0,72+i));
			*/
	}

	loadLevel(which,mode)
	{
		this.waves = [];
		//if(mode == 1)
		{
			this.waves.push({time:20,
				enemies : this.loadWave(1,11,30)});
		}
	}

	loadWave(type,enemy,shoot)
	{
		var t = [];
		switch(type)
		{
			case 0:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,1,shoot,1700,i));
			break;
			case 1:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,1,shoot,1500+i,i));
			break;
			case 2:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,1,shoot,2400-i,i));
			break;
			case 3:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,1,shoot,1650+((((i-200)%300)==0)?150:0),i));
			break;
			case 4:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,2,shoot,1700,i));
			break;
			case 5:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,2,shoot,1650+((((i-200)%300)==0)?150:0),i));
			break;
			case 6:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,3,shoot,1630,i));
			break;
			case 7:
				for(var i = 400;i<1300;i+=150)
					t.push(new Enemy(enemy,4,shoot,i,0));
			break;
			case 8:
				for(var i = 400;i<1300;i+=150)
					t.push(new Enemy(enemy,4,shoot,i,1000));
			break;
			case 9:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,5,shoot,1700,i));
			break;
			case 10:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,6,shoot,1700,i));
			break;
			case 11:
				for(var i = 400;i<1300;i+=150)
					t.push(new Enemy(enemy,6,shoot,i,0));
			break;
			case 12:
				for(var i = 400;i<1300;i+=150)
					t.push(new Enemy(enemy,6,shoot,i,950));
			break;
			case 13:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,7,shoot,1700,i));
			break;
			case 14:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,8,shoot,1700,i));
			break;
			case 15:
				for(var i = 200;i<900;i+=300)
					t.push(new Enemy(enemy,9,shoot,1700,i));
			break;
			case 16:
				for(var i = 200;i<900;i+=150)
					t.push(new Enemy(enemy,9,shoot,1700,i));
			break;
			case 17:
				for(var i = 200;i<900;i+=300)
					t.push(new Enemy(enemy,6,shoot,1700,i));
			break;
			case 18:
				t.push(new Enemy(enemy,6,shoot,1700,500));
			break;
		}

		return t;
	}
	addWave(wave)
	{
		enemies = enemies.concat(wave.enemies)
	}

	frame()
	{
		this.frameCount ++;

		this.waves.forEach(x =>{
			if(x.time == this.frameCount)
				this.addWave(x);
		});
		enemies.forEach(x => x.frame());
		heros.frame();
		bullets_ally.forEach(x => x.frame());
		bullets_enemy.forEach(x => x.frame());
		background.frame();


		//collisions
		enemies.forEach(x => {
			bullets_ally.forEach(y => {
				if(y.collide(x.getHitbox()))x.collide(y.getDamage())
			});
		});

		bullets_enemy.forEach(y => {
			if(y.collide(heros.getBulletProofHitbox()))heros.bulletproofCollide(y);
		});
		bullets_enemy.forEach(y => {
			if(y.collide(heros.getHitbox()))heros.collide(y)
		});

		if(heros.mustRemove)
		{
			this.gameOver = true;
		}

	}

	draw()
	{
		background.draw();
		ctx.lineWidth=3*rW;
		ctx.fillStyle="white";


		ctx.strokeStyle="red";
		ctx.beginPath();
		bullets_enemy.forEach(x => x.draw());
		ctx.stroke();
		ctx.fill();
		ctx.strokeStyle="black";
		enemies.forEach(x => x.draw());

		ctx.setLineDash([]);

		ctx.fillStyle="white";
		ctx.strokeStyle="blue";
		ctx.beginPath();
		bullets_ally.forEach(x => x.draw());
		ctx.stroke();
		ctx.fill();


		ctx.strokeStyle="black";
		heros.draw();


		background.drawForHUD();
		hud.draw();
	}

	cleanup()
	{
		bullets_ally = bullets_ally.filter(x => x.mustRemove !== true);
		bullets_enemy = bullets_enemy.filter(x => x.mustRemove !== true);
		enemies = enemies.filter(x => x.mustRemove !== true);
	}

	switchScreen()
	{
		if(this.gameOver)return new GameOver();
		if(enemies.length == 0 && bullets_enemy.length == 0){
			var flag = true;
			this.waves.forEach(x => {if(x.time >= this.frameCount)flag = false})
			if(flag)
				return new Shop(this.gameMode,this.level+1);
		}
		return null;
	}
}



function addBullet(bullet)
{
	if(bullet.ally)bullets_ally.push(bullet);
	else bullets_enemy.push(bullet);
}

function oob(x,y,padding)
{
	return x<-padding || y<hudStart-padding || x>1600+padding || y>900+padding;
}
