var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  helpers.init();
});

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var circleArray = [];
var colorArray = ["#FF8200", "#FF9300", "#FFC018", "#F28627", "#F26B1D"];

const helpers = {
  init: function(key, danceability, energy, tempo, duration_ms) {
    var duration = duration_ms
    console.log("duration", duration)
    if (duration !== undefined){
      var hexString = duration.toString(16)
      console.log("hexstring", hexString)
    
      if (hexString.length == 6){
        let new_hex = '#'+ hexString
        console.log("new_hex", new_hex)
        colorArray.push(new_hex)
        console.log("colourArray",colorArray)}
      else if (hexString.length == 5) {
        let new_hex = '#'+ hexString + 'F'
        console.log("new_hex", new_hex)
        colorArray.pop()
        colorArray.push(new_hex)
        console.log("colourArray",colorArray)
      }
      }
    circleArray = [];
    for (var i = 0; i < energy; i++) {
      var radius = Math.random() * tempo + 1;
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * danceability;
      var dy = (Math.random() - 0.5) * danceability;

      circleArray.push(new this.MovingCircle(x, y, dx, dy, radius));
    }
    // c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
    // c.stroke();
  },

  returnCircleArray: function() {
    return circleArray;
  },

  MovingCircle: function(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
      c.fillStyle = this.color;
    };

    this.update = function() {
      if (
        this.x + this.radius > window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius > window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };
    this.draw();
  },

  animate: function() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
    requestAnimationFrame(() => this.animate());
  }
};

export default helpers;
