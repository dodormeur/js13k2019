

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var lastFrame;
var frameDelta = 0;
var frameTime = 5;
var d_frames = [];
var d_pointer = 0;
var keys = {};
var state;

var rW;

window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }
window.onresize = resizeCanvas;
function resizeCanvas()
{
	var ratio = 16/9;
	if(window.innerHeight*ratio<window.innerWidth)
	{
		canvas.width = window.innerHeight*ratio;
		canvas.height = window.innerHeight;
	}
	else
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerWidth/ratio;
	}

	rW = canvas.width/1600.0;

}

function init()
{
	background = new Background();
	resizeCanvas();
	lastFrame = window.performance.now();
	heros = new Heros();
	state = new MainMenu();
	step(lastFrame);
}

function step(timestamp)
{

	if(timestamp-lastFrame > 500 || keys[80])
	{
		lastFrame = timestamp;
		window.requestAnimationFrame(step);
		return;
	}
	frameDelta += timestamp-lastFrame;
	d_frames[d_pointer] = timestamp-lastFrame;
	lastFrame = timestamp;

	while(frameDelta>frameTime)
	{
		state.frame();
		state.cleanup();
		frameFX();
		frameDelta-=frameTime;
	}
	ctx.save();
	drawFXBefore();
	state.draw();

	var temp = state.switchScreen();
	if(temp != null)state = temp;
	debug();
	ctx.restore();
	window.requestAnimationFrame(step);
}


function debug()
{
	ctx.fillStyle="black";
	var total = 0;
	for(var i = 0;i<d_frames.length;i++)
		total+=d_frames[i];
	var meanFps =total/d_frames.length;

	blackText("fps:"+Math.round(10000/meanFps)/10, 1590,40,35,"end");
	d_pointer++;
	if(d_pointer>120)d_pointer = 0;

	//debugHit();
}

function debugHit()
{
	ctx.fillStyle="transparent";
	ctx.strokeStyle="magenta";
	ctx.lineWidth=1;
	bullets_ally.forEach(x => x.hit.debug());
	bullets_enemy.forEach(x => x.hit.debug());
	enemies.forEach(x => x.getHitbox().debug());
	heros.hit.debug();
	heros.bulletproofHit.debug();
}

setTimeout(init,50);
