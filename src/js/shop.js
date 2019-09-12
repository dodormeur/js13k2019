

class Shop
{

	constructor(nextType,nextLevel)
	{
		this.nextType = nextType;
		this.nextLevel = nextLevel;
		this.selected = {x:0,y:0};
		this.keyUp = true;

		this.heros = new Heros();
		this.heros.x = 100;
		this.heros.y = 750;
		this.heros.upgrades  = [
			[1,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		]

		this.selectedCost = 0;
		this.maxCost = 1000;
		this.error = false;
		this.finished = false;

		heros.life = heros.maxLife;


		bullets_ally = [];
		bullets_enemy = [];
		enemies.push(new Enemy(0,0,0,1200,800));
	}

	calculateCost()
	{
		this.selectedCost=0;
		for(var i = 0;i<4;i++)
		{
			for(var j = 0;j<4;j++)
			{
				if(heros.upgrades[i][j])
					this.selectedCost+=getPriceUpgrade()[i][j];
			}
		}
	}

	finish()
	{

		this.calculateCost();
		if(this.selectedCost<this.maxCost)
		{
			this.finished=true;
		}
		else
		{
			this.error = true;
		}
	}

	frame()
	{
		this.heros.upgrades[this.selected.x][this.selected.y] = 0;
		if(this.keyUp == true)
		{
			if(keys[38])this.selected.y--;
			if(keys[40])this.selected.y++;
			if(keys[37])this.selected.x--;
			if(keys[39])this.selected.x++;
			if(keys[32])heros.upgrades[this.selected.x][this.selected.y] = !heros.upgrades[this.selected.x][this.selected.y];
			if(keys[13])this.finish();
		}
		if(keys[38] || keys[40] || keys[37] || keys[39] || keys[32])
		{
			if(this.keyUp == true)
				this.heros.frameUltimate = 1;
			this.keyUp = false;
		}
		else this.keyUp = true;
		this.selected.x = (this.selected.x+4)%4;
		this.selected.y = (this.selected.y+4)%4;

		this.calculateCost();
		if(this.maxCost>this.selectedCost)this.error = 0;

		this.heros.upgrades[this.selected.x][this.selected.y] = 1;
		this.heros.fire();


		this.heros.frame();

		enemies.forEach(x => x.frame());
		bullets_ally.forEach(x => x.frame());


		enemies.forEach(x => {
			bullets_ally.forEach(y => {
				if(y.collide(x.getHitbox()))x.collide(y.getDamage())
			});
		});
	}

	draw()
	{
		background.draw();

		ctx.lineWidth=3*rW;
		ctx.fillStyle="white";
		ctx.strokeStyle="blue";
		ctx.beginPath();
		bullets_ally.forEach(x => x.draw());
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle="white";
		ctx.strokeStyle="black";
		this.heros.draw();
		enemies.forEach(x => x.draw());

		ctx.setLineDash([]);


		var dist = 250;
		var start = 20;
		var yStart = 40;
		blackText("Primary",start+dist*0.5,hudStart+yStart,40,"center");
		blackText("Secondary",start+dist*1.5,hudStart+yStart,40,"center");
		blackText("Ultimate",start+2.5*dist,hudStart+yStart,40,"center");
		blackText("Abilities",start+3.5*dist,hudStart+yStart,40,"center");

		var names = [
			["Gatling gun","The shocker","Temporal rain","My little nuker"],
			["auto find","(rockets)^3","tremors","sattelite"],
			["Boom","Carpe diem","Fire at will","Ghosting"],
			["shields","pick mercy","armor boost","barrel roll"]
		];

		var descriptions = [
			[
				"Fire a lot of bullet, for a lot of fun !",
				"growing shockwaves that passes through ennemies while dealing damage",
				"bullets that comes back in time when hitting ennemies",
				"a portable nuclear launcher that can destruct a lot of ennemies or small japanese cities"
			],
			[
				"small bullets that track, find and destroy ennemies. Found them on the dark web.",
				"a rocket launcher that launches rocket in all direction; would be more effective to point a direction, but it wasn't on the budget",
				"regular shockwaves damanging nearby ennemies. Yes, it works in space",
				"Launch a small moon orbiting around its launch point. No, that's not overkill"
			],
			[
				"Send all the nuclear warhead in store. Very satisfying to watch",
				"Slow down the time for the ennemies, allowing you to make cool matrix tricks",
				"Send waves of bullets. Simple, clean, effective.",
				"Makes you invulnerable for a time, passing through bullets."
			],
			[
				"Create a bullet-proof shield in front of you for a short time. press A/Q to use",
				"Restore a bit of life. Press Z/W to use",
				"Restore your armor to full. Press E to use",
				"Do a magnificient dodge movement, avoiding bullet for a short time. Press R to use"
			]
		];

		var margin = 10;
		for(var i = 0;i<names.length;i++)
		{
			for(var j = 0;j<names[i].length;j++)
			{
				var x = start+i*dist+margin;
				var y = hudStart+yStart+20+j*(100+margin*2);
				if(heros.upgrades[i][j])
					ctx.strokeStyle = "green";
				else
					ctx.strokeStyle = "black";
				ctx.fillStyle = "transparent";
				ctx.lineWidth=3*rW;
				filledRect(x,y,dist-margin*2,100,0);

				if(this.selected.x == i && this.selected.y == j)
				{
					var p = 4;
					ctx.strokeStyle = "blue";
					ctx.lineWidth=3*rW;
					filledRect(x-p,y-p,dist-margin*2+2*p,100+2*p,0);
				}
				blackText(names[i][j],x+5,y+40,27,"start");
				blackText(getPriceUpgrade()[i][j]+" $",x+10,y+80,25,"start");
			}
		}

		line(1280,hudStart,1280,900,1,"blue");
		blackText(names[this.selected.x][this.selected.y],1600-(1600-1280)/2,hudStart+80,43,"center");
		longText(descriptions[this.selected.x][this.selected.y],1290,hudStart+160,300,40,40,"start");


		background.drawForHUD();

		blackText("Welcome to the store !",802,60,40,"center");
		ctx.fillStyle = this.maxCost<this.selectedCost?"red":"green";
		colorText("Total cost : "+this.selectedCost+" $",20,60,40,"left");
		blackText("Maximum cost : "+this.maxCost+" $",20,120,40,"left");
		blackText("Press space to (un)equip",1580,60,40,"right");
		blackText("Press enter to finish",1580,120,40,"right");

		ctx.fillStyle = "red";
		if(this.error)
			colorText("Your ship cost too much !",802,120,40,"center");
	}

	cleanup()
	{

		bullets_ally = bullets_ally.filter(x => x.mustRemove !== true);

	}

	switchScreen()
	{
		if(this.finished)
		{
			return new Game(this.nextType,this.nextLevel);
		}
		return null;

	}
}


function getPriceUpgrade()
{
	return [
		[100,200,300,400],
		[110,210,310,410],
		[120,220,320,420],
		[130,230,330,430]
	];
}
