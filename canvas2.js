var canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var c = canvas.getContext('2d');

function drawRotatedImage(c, image, x, y, width, height, rotation) {

	var halfWidth = width/2;
	var halfHeight = height/2;

	c.save();

	c.translate(x+halfWidth, y+halfHeight);
	c.rotate(rotation);
	c.drawImage(image, -halfWidth, -halfHeight, width, height);

	c.restore();

}

// wrap drawing operations in a function
function draw(c, image) {

	if (!image.complete) {
		setTimeout(function(){
			draw(c, image);
		}, 50);
		return;
	}

	c.drawImage(image, 20, 20, 300, 500);

	drawRotatedImage(c, image, 400, 20, 300, 500, Math.PI/4);

}

var image = new Image();
image.src = './images.png';

draw(c,image);
