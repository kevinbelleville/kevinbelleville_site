var canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var c = canvas.getContext('2d');


// Circle type
var Circle = function(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
}

Circle.prototype.isHitBy = function(x, y) { 
	var distance = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
	distance = Math.sqrt(distance);
	return (distance <= this.radius);
}

// Rectangle type
var Rectangle = function(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

Rectangle.prototype.isHitBy = function(x, y) {
	return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.height + this.y);
}

// Create shapes (and draw)

var circle = new Circle(150, 150, 100, 0);
var rectangle = new Rectangle(250, 50, 100, 200, 0);
/**
c.beginPath();
c.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
c.fill();

c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
*/


// create array of colors
var colors = ["black", "red", "green", "blue", "yellow", "orange", "purple", "pink", "white", "last"];

// Listen for clicks
canvas.addEventListener('click', function(e){

	var canvasBounds = canvas.getBoundingClientRect();

	var clickX = e.pageX;
	var clickY = e.pageY;

	if (circle.isHitBy(clickX, clickY)) {
		console.log("Circle is hit!")
		// put animation stuff here
		circle.color += 1;
	}
	if (rectangle.isHitBy(clickX, clickY)) {
		console.log("Rectangle is hit!")
		// put animation stuff here
		rectangle.color += 1;
	}

});



// Animate color changes

// create animation class
var Animation = function() {

	this.boundUpdate = this.update.bind(this);
	this.circle = circle;
	this.rectangle = rectangle;

	this.lastAnimationTime = 0;

}

// variables, that i want to change in between frames
var angle = 0;

// give animation class a function called update
Animation.prototype.update = function() {

	// clear stuff
	c.clearRect(0,0,canvas.width, canvas.height);

	// put perma stuff under here


	// update based on time delta
	var currentAnimationTime = Date.now();
	var animationTimeDelta = (currentAnimationTime - (this.lastAnimationTime || Date.now())) / 1000;

	this.lastAnimationTime = currentAnimationTime;


	// animate the animated stuff
	c.beginPath();
	if (circle.color === 9) { 
		circle.color = 0;
	}
	c.fillStyle = colors[circle.color];
	c.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
	c.fill();

	if (rectangle.color === 9) { 
			rectangle.color = 0;
		}
	c.fillStyle = colors[rectangle.color];
	c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

	// get the next animation frame, i think?
	window.requestAnimationFrame(this.boundUpdate);
}

// create instance of animation and then run it
var animation = new Animation();
animation.update();
