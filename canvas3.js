var canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var c = canvas.getContext('2d');

var rectangles = [
	{x: 0, y: 100, width: 100, height: 100, color: 'red', speedX: 1},
	{x: 0, y: 200, width: 100, height: 100, color: 'green', speedX: 2},
	{x: 0, y: 300, width: 100, height: 100, color: 'blue', speedX: 3},

];


function update() {

	c.clearRect(0, 0, canvas.width, canvas.height);

	rectangles.forEach(function(rectangle){
		c.fillStyle = rectangle.color;
		c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

		rectangle.x += 1*rectangle.speedX

	});

	window.requestAnimationFrame(update);

}

update();