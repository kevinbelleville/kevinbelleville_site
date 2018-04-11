// Set up
var canvas = document.getElementById('canvas');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var c = canvas.getContext('2d');

var dragging = false;
var radius = 5;




c.lineWidth = radius*2;

// Listen for clicks mousedown
canvas.addEventListener('mousedown', function(e){

	var canvasBounds = canvas.getBoundingClientRect();

	var clickX = e.pageX;
	var clickY = e.pageY;

	/**
	c.beginPath();
	c.arc(clickX, clickY, radius, 0, Math.PI*2);
	c.fill();
	c.closePath();
	*/
	dragging = true;
	

});


// mouse move
canvas.addEventListener('mousemove', function(e){

	var canvasBounds = canvas.getBoundingClientRect();

	var clickX = e.pageX;
	var clickY = e.pageY;

	if (dragging) {
		
		//c.strokeStyle = "blue";
		//c.fillStyle = "blue";
		c.lineTo(clickX, clickY);
		c.stroke();
		c.beginPath();
		c.arc(clickX, clickY, radius, 0, Math.PI*2);
		c.fill();

		// preparing for next instance
		c.beginPath();
		c.moveTo(clickX, clickY);
	}
	console.log(e.offsetX + ", " + e.offsetY);
});



canvas.addEventListener('mouseup', function(e){

	var canvasBounds = canvas.getBoundingClientRect();

	var clickX = e.pageX;
	var clickY = e.pageY;

	dragging = false;
	c.beginPath();
	console.log(clickX + ", " + clickY);
});

canvas.addEventListener('mouseout', function(e){

	var canvasBounds = canvas.getBoundingClientRect();

	var clickX = e.pageX;
	var clickY = e.pageY;

	dragging = false;
	c.beginPath();
	console.log(clickX + ", " + clickY);
});

/// TOUCH TOUCH TOUCH



canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);



canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);



canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });

  canvas.dispatchEvent(mouseEvent);
}, false);



// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);



// Draw to the canvas
function renderCanvas() {
  if (drawing) {
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    lastPos = mousePos;
  }
}

window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
        window.setTimeout(callback, 1000/60);
           };
})();

// Allow for animation
(function drawLoop () {
  requestAnimFrame(drawLoop);
  renderCanvas();
})();

var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
        drawing = true;
  lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
  drawing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}


/**
// create animation class
var Animation = function() {

	this.boundUpdate = this.update.bind(this);

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
	

	// get the next animation frame, i think?
	window.requestAnimationFrame(this.boundUpdate);
}

// create instance of animation and then run it
var animation = new Animation();
animation.update();
*/