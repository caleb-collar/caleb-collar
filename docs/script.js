//Starfield effect for full webpage | Caleb C.

//Globals
const canvas = document.getElementById('starField');
const c = canvas.getContext('2d');
const NUM_STARS = 1450;
var body = document.body, html = document.documentElement;
var y = window.scrollY - 2346;
var hyperIO = false;
var updated = true;

//Hyper button.
document.getElementById("hyperButton").addEventListener("click", function () {
  hyperIO ^= true;
  var element, elements;
  if (hyperIO) {
    element = document.getElementById("starField");
    element.classList.add("reveal");
    element = document.getElementById("contentPane");
    element.classList.add("darkBorder");
    element.classList.add("hyper");
    elements = document.getElementsByTagName("blockquote");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add("darkBorder");
    }
  } else {
    elements = document.getElementsByTagName("blockquote");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("darkBorder");
    }
    element = document.getElementById("contentPane");
    element.classList.remove("hyper");
    element.classList.remove("darkBorder");
    element = document.getElementById("starField");
    element.classList.remove("reveal");
  }
});

//Initial dimensions.
var width = window.innerWidth;
var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
height += 815; //padding
canvas.width = width;
canvas.height = height;

//On window scroll color and speed changes.
window.addEventListener('scroll', (event) => {
  y = window.scrollY - 2260;
  var perspective = Math.abs(y / 2260);
  if (perspective * 0.025 < 0.02) {
    speed = 0.02;
  } else {
    speed = perspective * 0.025;
  }
  c.strokeStyle = 'rgb(' + Math.round(255 - (21 * perspective)) + ', ' + Math.round(255 - (247 * perspective)) + ', ' + Math.round(255 - (199 * perspective)) + ')';
  currentStroke = c.strokeStyle;
  //console.log(perspective);
  //234, 8, 56
});

//Star object.
class Star {
  constructor() {
    //Initialize star paths.
    this.x = Math.random() * canvas.width - canvas.width / 2;  //random x
    this.y = Math.random() * canvas.height - canvas.height / 2; //random y
    this.px, this.py;
    this.z = Math.random() * 4; //random z    
  }

  update() {
    //Stores previous and generates new coordinates.
    var traveling = true;
    this.px = this.x;
    this.py = this.y;
    this.z += speed;
    this.x += this.x * (speed * 0.2) * this.z;
    this.y += this.y * (speed * 0.2) * this.z;
    if (this.x > canvas.width / 2 + 50 || this.x < -canvas.width / 2 - 50 || this.y > canvas.height / 2 + 50 || this.y < -canvas.height / 2 - 50) {
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
      this.px = this.x;
      this.py = this.y;
      this.z = 0;
    }
  }

  //draws line from x,y to px,py
  show() {
    c.lineWidth = this.z;
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.px, this.py);
    c.stroke();
    c.closePath();
  }
}

let speed = 0.04;
let stars = [];

//Create stars.
for (let i = 0; i < NUM_STARS; i++) stars.push(new Star());
c.fillStyle = 'rgba(0, 0, 0, 0.1)';
c.strokeStyle = 'rgb(255,255,255)';
var currentStroke = c.strokeStyle;

c.translate(canvas.width / 2, canvas.height / 2);

//Draw background and stars method.
function draw() {
  c.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  for (let s of stars) {
    s.update();
    s.show();
  }
  requestAnimationFrame(draw);
}

//Resize event.
var onresize = function (e) {
  canvas.width = e.target.outerWidth;
  canvas.height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  c.translate(canvas.width / 2, canvas.height / 2);
  c.strokeStyle = currentStroke;
}
window.addEventListener("resize", onresize);
//window.dispatchEvent(new Event('resize'));

//Start starfield.
draw();