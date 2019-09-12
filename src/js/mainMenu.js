class MainMenu
{
	constructor()
	{
		this.keyDown = true;
		this.started = false;
		this.selected = 0;
		this.nbChoices = 3;
	}

	frame()
	{

		if(!this.keyDown)
		{
			if(keys[13])
			{
				if(this.selected == 0)
				{
					this.started = new Game(this.selected,0);
				}
				if(this.selected == 2)window.close();
			}
			if(keys[38])this.selected--;
			if(keys[40])this.selected++;
			this.selected = (this.selected+this.nbChoices)%this.nbChoices;
		}

		if(keys[38] || keys[40] || keys[37] || keys[39] || keys[32]|| keys[13])
		{
			this.keyDown = true;
		}
		else this.keyDown = false;
	}

	draw()
	{
		background.draw();

		background.drawForHUD();
		blackText("Main menu",800,100,100,"center");

		var options = ["start game","help","quit"];
		var description = [
			"Your ship is caught in a temporal loop, and is going back in time ! Try to survive the longest, while your ship loses abilities little by little !",
			"Press enter to validate in menu, space to shoot, the arrows to move,and a/q, z/w, e and r to use your abilities, and f to unleash your ultimate when your energy is full",
			"Leave the game. Not sure it needed an explaination..."
		]

		var s = 400;
		options.forEach((x,i)=>{
			ctx.fillStyle="white";
			ctx.strokeStyle="black";
			if(i == this.selected)triangle(130,s-20+i*100,60,30,0,true)
			blackText(x,200,s+i*100,80,"left")
		})

		longText(description[this.selected],900,300,600,40,40,"left");

	}

	cleanup()
	{
	}


	switchScreen()
	{
		if(this.started)return this.started;
		return null;
	}
}
