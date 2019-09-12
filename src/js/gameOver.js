class GameOver
{
	constructor(level)
	{
		this.level = level
	}

	frame()
	{
	}

	draw()
	{
		background.draw();

		background.drawForHUD();
		blackText("You died..",800,320,60,"center");
		blackText("You made it to the level "+(this.level+1)+". Congratulations !",800,460,70,"center");
		
		blackText("Press enter to go back to the shop and retry the level",800,600,40,"center");
	}

	cleanup()
	{
	}


	switchScreen()
	{
		if(keys[13])return new Shop(0,this.level);
		return null;
	}
}
