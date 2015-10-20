var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var map_w = cw * 4;
var map_h = ch * 4;
var numOfPackets = 0;

//canvas.style.width = "1600px";
$(window).resize(function() {
  $("#canvas").height($("#canvas").width());
});

$(window).resize();

var offset = {
  speedx: 9,
  speedy: 9,
  maxSpeed: 10,
  offSetting: false,
  directionX: 0,
  directionY: 0,

  gaugeSpeed: function(){
    if(offset.speedx > offset.maxSpeed){
      offset.speedx = this.maxSpeed;
    } else {
      offset.speedx += 0.1;
    }

    if(offset.speedy > offset.maxSpeed){
      offset.speedy = this.maxSpeed;
    } else {
      offset.speedy += 0.1;
    }
  },
};

//Here we will update the virtual player's position
var vPlayer = {
    x: cw/2,
    y: ch/2,
    worldx:randNum(-map_w, map_w),
    worldy:randNum(-map_h, map_h), 
    vx:0,
    vy:0,    
    update: function(){
        this.x += this.vx;
        this.y += this.vy;
    }
};

//Random number Generator
function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

function randVal(x, y){
  var rand = randNum(1, 3);
  if(rand < 2){
    return y;
  } else {
    return x;
  }
}

//Getting elements by ID for UI/UX
function GID(id){
  return document.getElementById(id);
}

//Make a random color
function randColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Get the distance between object1 and object2
function return_distance(object1_x, object1_y, object2_x, object2_y){
    var dx = object1_x - object2_x;
    var dy = object1_y - object2_y;
    var d = Math.sqrt(dx * dx + dy * dy);

    return d;
}

//Get the angle of object1 against object2
function return_angle(object1_x, object1_y, object2_x, object2_y){
    var dx = object1_x - object2_x;
    var dy = object1_y - object2_y;
    
    var angle = Math.atan2(dy, dx);
    return angle;
}

function checkCollisionObjects(object1, objects){
  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    var object1ToObject2 = return_distance(object1.x, object1.y, obj.x, obj.y);
    if (object1ToObject2 < (object1.r) + obj.r) { 
      return true;
    }
  }
  return false;
}

//Request animation frame for rendering
window.requestAnimFrame = ( function() {
  return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ) {
          window.setTimeout( callback, 1000 / 60 );
        };
})();
