
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var circleArray = []


const helpers = {

  init: function() {

    for (var i = 0; i < 100; i++){
      console.log("HOOKS",this)
      var radius = Math.random() * 7 + 1;
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 9;
      var dy = (Math.random() - 0.5) * 9;
      
      circleArray.push(this.MovingCircle(x,y,dx,dy,radius));

    }

    // c.beginPath();
    // c.arc(x, y, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
    // c.stroke();

  },
 // multiply: function(){
 //   console.log(i)
 //    for(var i = 0; i < 100; i++) {
 //    this.init();
 //    }
 //  },


  MovingCircle: function(x,y,dx,dy,radius){
    console.log("THIS",this)
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = "red";

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
      c.fillStyle = "red";
    };

    this.update = function() {
      if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
    };
   this.draw()
   }

}



export default helpers;