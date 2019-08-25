

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var lastFrame;
var frameDelta = 0;
var frameTime = 5;
var heros;
var enemies = [];
var bullets_ally = [];
var bullets_enemy = [];
var background;
var d_frames = [];
var d_pointer = 0;
var keys = {};
var hud;
var hudStart = 140;
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
}

function init()
{
	resizeCanvas();
	lastFrame = window.performance.now();
	heros = new Heros();
	hud = new HUD();
	background = new Background();
	for(var i = 0;i<10;i++)
		enemies.push(new Enemy());
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
		frame();
		collision();
		frameDelta-=frameTime;
	}

	draw();
	cleanup();
	debug();
	console.log(bullets_enemy.length);
	window.requestAnimationFrame(step);
}

function collision()
{
	enemies.forEach(x => {
		bullets_ally.forEach(y => {
			if(y.collide(x))x.collide(y)
		});
	});

	bullets_enemy.forEach(y => {
		if(y.collide(heros))heros.collide(y)
	});
}

function frame()
{
	heros.frame();
	enemies.forEach(x => x.frame());
	bullets_ally.forEach(x => x.frame());
	bullets_enemy.forEach(x => x.frame());
	background.frame();

}


function draw()
{

	background.draw();
	ctx.lineWidth=3*canvas.width/1600;
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

function cleanup()
{
	bullets_ally = bullets_ally.filter(x => x.mustRemove !== true);
	bullets_enemy = bullets_enemy.filter(x => x.mustRemove !== true);
	enemies = enemies.filter(x => x.mustRemove !== true);

}

function debug()
{
	ctx.fillStyle="black";
	var total = 0;
	for(var i = 0;i<d_frames.length;i++)
		total+=d_frames[i];
	var meanFps =total/d_frames.length;


	ctx.font="normal 100 40px \"Comic Sans MS\", cursive, sans-serif";

	ctx.fillText("fps:"+Math.round(10000/meanFps)/10, canvas.width-200, 40);
	d_pointer++;
	if(d_pointer>120)d_pointer = 0;
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

init();
