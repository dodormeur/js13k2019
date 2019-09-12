class MainMenu
{
	constructor()
	{
		this.keyDown = true;
		this.started = false;
		this.selected = 0;
		this.nbChoices = 5;
	}

	frame()
	{

		if(!this.keyDown)
		{
			if(keys[13])
			{
				if(this.selected == 0 || this.selected == 1 || this.selected == 2)
				{
					this.started = new Game(this.selected,0);
				}
				if(this.selected == 4)window.close();
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

		var options = ["story mode","endless mode","reverse endless","help","quit"];
		var description = [
			"Live the story of Mister McFlying, and help it restore the time flow !",
			"How long can you survive waves of ennemies, and how barebones can your ship get before losing?",
			"Time is restored, and you must start again at the begining ! How long will you survive ?",
			"Press enter to validate in menu, space to shoot, the arrows to move,and a/q, z/w, e, r and f to use your abilities",
			"Leave the game. Not sure it needed an explaination..."
		]

		options.forEach((x,i)=>{
			ctx.fillStyle="white";
			ctx.strokeStyle="black";
			if(i == this.selected)triangle(130,280+i*100,60,30,0,true)
			blackText(x,200,300+i*100,80,"left")
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
