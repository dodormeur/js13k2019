

class Shop
{

	constructor()
	{
		this.selected = {x:0,y:0};
		this.keyUp = true;
	}
	init()
	{
	}

	frame()
	{
		if(this.keyUp == true)
		{
			if(keys[38])this.selected.y--;
			if(keys[40])this.selected.y++;
			if(keys[37])this.selected.x--;
			if(keys[39])this.selected.x++;
		}
		if(keys[38] || keys[40] || keys[37] || keys[39])
			this.keyUp = false;
		else this.keyUp = true;
		this.selected.x = (this.selected.x+5)%5;
		this.selected.y = (this.selected.y+4)%4;

	}

	draw()
	{
		background.draw();

		var dist = 250;
		var start = 20;
		var yStart = 80;
		blackText("Primary",start+dist*0.5,hudStart+yStart,40,"center");
		blackText("Secondary",start+dist*1.5,hudStart+yStart,40,"center");
		blackText("Ultimate",start+2.5*dist,hudStart+yStart,40,"center");
		blackText("Abilities",start+3.5*dist,hudStart+yStart,40,"center");
		blackText("Passives",start+4.5*dist,hudStart+yStart,40,"center");

		var names = [
			["Gatling gun","The shocker","Temporal rain","My little nuker"],
			["auto find","(rockets)^3","tremors","TODO"],
			["Boom","TODO","TODO","TODO"],
			["shields","pick mercy","armor boost","barrel roll"],
			["grazing","slow mo","TODO","TODO"]
		];

		var descriptions = [
			[
				"Fire a lot of bullet, for a lot of fun !",
				"small shocwaves that passes through ennemies",
				"bullets that comes back in time when hitting ennemies",
				"a portable nuclear launcher that can destruct a lot of ennemies or small japanese cities"
			],
			[
				"small bullets that track, find and destroy ennemies. Found them on the dark web.",
				"a rocket launcher that launches rocket in all direction; would be more effective to point a direction, but it wasn't on the budget",
				"regular shockwaves damanging nearby ennemies. Yes, it works in space",
				"TODO"
			],
			[
				"a real nuclear explosion. Good for exploding stuff",
				"TODO",
				"TODO",
				"TODO"
			],
			[
				"Create a bullet-proof shield around your position for a short time. press A/Q to use",
				"Restore a bit of life. Press Z/W to use",
				"Restore your armor to full. Press E to use",
				"Do a magnificient dodge movement, avoiding bullet for a short time. Press R to use"
			],
			[
				"Having bullet come close to you increase your energy",
				"When a bullet come too close, slow a bit the flow of time",
				"TODO",
				"TODO"
			]
		];

		var margin = 20;
		for(var i = 0;i<names.length;i++)
		{
			for(var j = 0;j<names[i].length;j++)
			{
				var x = start+i*dist+margin;
				var y = hudStart+yStart+60+j*(100+margin*2);
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
				blackText("200 $",x+10,y+80,25,"start");
			}
		}

		line(1280,hudStart,1280,900,1,"blue");
		blackText(names[this.selected.x][this.selected.y],1600-(1600-1280)/2,hudStart+80,43,"center");
		blackText(descriptions[this.selected.x][this.selected.y],1280,hudStart+200,42,"center");
		background.drawForHUD();

		blackText("Welcome to the store !",802,59,40,"center");
	}

	cleanup()
	{

	}

	switchScreen()
	{
		return null;

	}
}
