const canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


var colors = [
    '#146152',
    '#44803F',
    '#B4CF66',
    '#FFEC5C',
    '#FF5A33'
]

function circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function() {
        c.beginPath();
        
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.nextFrame = function() {

         if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * 0.75;
            if(this.dy > 0)  this.dx = 0;
         } else {
            this.dy += 1;
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius  < 0) {
            this.dx = -this.dx;
        }
        
         this.y += this.dy;
         this.x += this.dx;
         this.draw();    
    }

}

var balls = [];

for(var i = 0; i < 100; i++) {
    var radius = Math.random() * 40 + 20;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    if(canvas.height - 300 < y ) y = canvas.height / 2;

    var dx = Math.random() > 0.5 ? 2 : -2;
     
    balls.push(new circle(x, y, dx, 4, radius))
}




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.nextFrame();
    });


}

animate();