var canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var c = canvas.getContext('2d');

var Animation = function() {

	this.boundUpdate = this.update.bind(this);
	this.rectangles = [
		{x: 0, y: 100, width: 100, height: 100, color: 'red', speedX: 60},
		{x: 0, y: 200, width: 100, height: 100, color: 'green', speedX: 120},
		{x: 0, y: 300, width: 100, height: 100, color: 'blue', speedX: 180},
	];

	this.lastAnimationTime = 0;

}

Animation.prototype.update = function() {

	c.clearRect(0,0,canvas.width, canvas.height);

	var currentAnimationTime = Date.now();
	var animationTimeDelta = (currentAnimationTime - (this.lastAnimationTime || Date.now())) / 1000;

	this.lastAnimationTime = currentAnimationTime;

	this.rectangles.forEach(function(rectangle) { 
		c.fillStyle = rectangle.color;
		c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);	

		rectangle.x += rectangle.speedX * animationTimeDelta;

	});

	window.requestAnimationFrame(this.boundUpdate);
}




var animation = new Animation();
animation.update();