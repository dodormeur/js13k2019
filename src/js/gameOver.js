class GameOver
{
	constructor()
	{

	}

	frame()
	{
	}

	draw()
	{
		background.draw();

		background.drawForHUD();
		blackText("You died",800,500,100,"center");
		blackText("Press enter to go back to the main menu",800,600,40,"center");
	}

	cleanup()
	{
	}


	switchScreen()
	{
		if(keys[13])return new MainMenu();
		return null;
	}
}
