
var heros;
var enemies = [];
var bullets_ally = [];
var bullets_enemy = [];
var background;
var hud;

class Game
{
	init()
	{
		hud = new HUD();
		for(var i = 0;i<10;i++)
			enemies.push(new Enemy());
	}

	frame()
	{
		heros.frame();
		enemies.forEach(x => x.frame());
		bullets_ally.forEach(x => x.frame());
		bullets_enemy.forEach(x => x.frame());
		background.frame();


		//collisions
		enemies.forEach(x => {
			bullets_ally.forEach(y => {
				if(y.collide(x))x.collide(y)
			});
		});

		bullets_enemy.forEach(y => {
			if(y.collide(heros))heros.collide(y)
		});
	}

	draw()
	{
		background.draw();
		ctx.lineWidth=3*rW;
		ctx.fillStyle="white";
		ctx.strokeStyle="black";
		heros.draw();
		enemies.forEach(x => x.draw());

		ctx.strokeStyle="blue";
		ctx.beginPath();
		bullets_ally.forEach(x => x.draw());
		ctx.stroke();
		ctx.fill();
		ctx.strokeStyle="red";

		ctx.beginPath();
		bullets_enemy.forEach(x => x.draw());
		ctx.stroke();
		ctx.fill();

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
		if(enemies.length == 0 && bullets_enemy.length == 0)return new Shop();
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
