class HUD
{

	draw()
	{
		var rW = canvas.width/1600.0
		ctx.fillStyle="#888";
		ctx.strokeStyle="transparent";
		ctx.lineWidth = 0;
		circle(562,36,12,true);
		circle(1046,36,12,true);

		var size = Math.round(40*rW);
		ctx.font="normal 100 "+size+"px \"Comic Sans MS\", cursive, sans-serif";

		ctx.lineWidth = size/20;
		ctx.fillStyle="black";
		ctx.strokeStyle="white";
		text("Level 1", 730, 70);


		size = Math.round(35*rW);
		ctx.lineWidth = size/20;
		ctx.font="normal 100 "+size+"px \"Comic Sans MS\", cursive, sans-serif";
		var y = 38;
		var x = 20;
		text("life", x, y);
		text("shield", x, y+40);
		text("energy", x, y+80);


		ctx.strokeStyle="black";

		ctx.fillStyle="green";
		filledRect(x+130,12,350,30,heros.life/heros.maxLife);

		ctx.fillStyle="#25F";
		filledRect(x+130,52,350,30,heros.armor/heros.maxArmor);

		ctx.fillStyle="orange";
		filledRect(x+130,92,350,30,0.2);


	}
}
