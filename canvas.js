var canvas = document.querySelector('canvas');




canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ctx = canvas.getContext('2d');


// polygon
function poly(numOfSides) {
var size = 100;
	Xcenter = 200;
	Ycenter = 200;



ctx.beginPath();
ctx.moveTo(Xcenter+size+Math.cos(0), Ycenter + size * Math.sin(0));

for (var i = 1; i <= numOfSides; i++) {
	ctx.lineTo(Xcenter + size * Math.cos(i*2*Math.PI / numOfSides), Ycenter + size * Math.sin(i*2*Math.PI / numOfSides));
}

ctx.fillStyle = "green";
ctx.lineWidth = 1;
ctx.fill();
}

for (var i = 3; i < 7; i++) {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	setTimeout(poly(i), 500);
}


console.log(canvas)

