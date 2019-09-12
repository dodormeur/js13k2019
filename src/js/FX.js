

var fx_shake = 0;
var fx_shakeDuration = 0;

function addShake(strengh,duration)
{
	fx_shake = strengh;
	fx_shakeDuration = duration;
}

function frameFX()
{
	fx_shakeDuration--;
}
function drawFXBefore()
{
	if(fx_shakeDuration>0)
	{
		ctx.translate((Math.random()-0.5)*fx_shake,(Math.random()-0.5)*fx_shake);
	}
}
