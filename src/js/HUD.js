
var hudStart = 140;

class HUD
{
	draw()
	{

		var y = 38;
		var x = 20;
		blackText("Level 1", 730, 58,40,"center");
		blackText("life", x, y,35,"start");
		blackText("shield", x, y+40,35,"start");
		blackText("energy", x, y+80,35,"start");

		ctx.strokeStyle="black";

		ctx.fillStyle="green";
		filledRect(x+130,12,350,30,heros.life/heros.maxLife);

		ctx.fillStyle="#25F";
		filledRect(x+130,52,350,30,heros.armor/heros.maxArmor);

		ctx.fillStyle="orange";
		filledRect(x+130,92,350,30,0.2);


	}
}
