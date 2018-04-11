var canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var c = canvas.getContext('2d');

function poly(numOfSides, size, Xcenter, Ycenter) {

	c.beginPath();
	c.moveTo(Xcenter+size+Math.cos(0), Ycenter + size * Math.sin(0));

	for (var i = 1; i <= numOfSides; i++) {
		c.lineTo(Xcenter + size * Math.cos(i*2*Math.PI / numOfSides), Ycenter + size * Math.sin(i*2*Math.PI / numOfSides));
	}
	c.fill();
}

var angle = 0;

function update() {

	c.clearRect(0,0,canvas.width,canvas.height);

	c.fillStyle = 'green';

	c.beginPath();
	var r = 25+150*Math.abs(Math.cos(angle));
	c.arc(225, 225, r, 0, Math.PI*2, false);
	c.closePath();

	c.fill();

	angle += Math.PI / 64;

	window.requestAnimationFrame(update);

}

update();