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

	c.drawImage(image, 20, 20, 3840/5, 2160/5);

}


function draw2(c, image2, x, y, width, height, rotation) {

	if (!image2.complete) {
		setTimeout(function(){
			draw2(c, image2, x, y, width, height, rotation);
		}, 50);
		return;
	}

	drawRotatedImage(c, image2, x, y, width, height, rotation);


}

var image = new Image();
image.src = './no_eyes.jpg';


// draw(c,image);

var eye = new Image();
eye.src = "./porter_eye.png";


// draw2(c, eye, 520, 200, 80, 80, Math.PI/4);


var Animation = function() {

	this.boundUpdate = this.update.bind(this);
	this.eyes = [
		{x: 520, y: 200, width: 80, height: 80, rotation: Math.PI/8},
		{x: 200, y: 200, width: 80, height: 80, rotation: Math.PI/8}
	];

	this.lastAnimationTime = 0;

}

var angle = 0;

Animation.prototype.update = function() {

	c.clearRect(0,0,canvas.width, canvas.height);

	draw(c,image);

	var currentAnimationTime = Date.now();
	var animationTimeDelta = (currentAnimationTime - (this.lastAnimationTime || Date.now())) / 1000;

	this.lastAnimationTime = currentAnimationTime;

	this.eyes.forEach(function(i) { 
		draw2(c, eye, i.x, i.y, i.width, i.height, i.rotation);
		i.rotation += Math.abs(Math.cos(angle));
		
	});

	

	angle += Math.PI/800;

	window.requestAnimationFrame(this.boundUpdate);
}




var animation = new Animation();
animation.update();
