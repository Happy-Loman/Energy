//The player object.
var player = {
    single:true,
    x: vPlayer.x,
    y: vPlayer.y,
    r: 10,
    vx: 0,
    vy: 0,
    color: "rgba(155, 155, 155, 1)",
    left:false,
    right:false,
    up:false,
    down:false,
    energy:50,
    energy_output:0.005,
    chargeSpeed:0.2,
    mass: 5,
    pull_rad:50,
    max_storage:200,
    charging:false,

    add_energy: function(amount){
        player.energy += amount;
        if(this.energy > play){
          this.energy = 0;
        }
    },

    draw: function(){
      ctx.save();
      ctx.translate((offset.directionX), (offset.directionY));

      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.arc(vPlayer.x, vPlayer.y, this.r * 2, 0, (2 * Math.PI));
      //ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
      ctx.fillStyle = "transparent"; 
      ctx.strokeStyle = 'rgba(230, 100, 0, 0.5)';
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x - (offset.directionX), this.y - (offset.directionY), this.r, 0, (2 * Math.PI));
      //ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
      ctx.fillStyle = this.color; 
      ctx.fill();
      ctx.restore();
    },
    
    
    update: function(){
      this.x += this.vx; 
      this.y += this.vy;

      /*if(offset.offSetting === true){
        offset.gaugeSpeed();
      }

      if(offset.offSetting === false){
        offset.speedx *= 0.7;
        offset.speedy *= 0.7;
      }*/

      if(this.energy <= 0 && !this.checkCollision(cell)){
        this.respawn(); 
      }

      if(this.checkCollision(cell) && player.energy < player.max_storage){
        player.charge();
      }

      if(this.left){
        offset.directionX -= offset.speedx;
          vPlayer.x += offset.speedx;
          vPlayer.worldx -= 1;
          player.energy -= player.energy_output;
      }
      if(this.up){
        offset.directionY -= offset.speedy;
          vPlayer.y += offset.speedy;
          vPlayer.worldy += 1;
          player.energy -= player.energy_output;
      }
      if(this.right){
        offset.directionX += offset.speedx; 
          vPlayer.x -= offset.speedx;
          vPlayer.worldx -= 1;
          player.energy -= player.energy_output;
      }
      if(this.down){
        offset.directionY += offset.speedy;
          vPlayer.y -= offset.speedy; 
          vPlayer.worldy -= 1;
          player.energy -= player.energy_output;
      }

      if(this.checkCollision(packets) && this.energy <= this.max_storage){
        this.absorbEnergy(packets, 0);
        numOfPackets--;
        //console.log(this.energy);
      }

      player.attract();

      if(energytransport.sendingEnergy){
        energytransport.sendTrasport();
      }
  },

  charge: function(){
    if(!(this.energy >= this.max_storage)){
      if(cell.energy > 50){
        player.charging = true;
        if(player.checkCollision(cell.playerHoldingCenter) && ((this.energy + this.chargeSpeed) <= this.max_storage)){
          this.energy += this.chargeSpeed;
          cell.energy -= this.chargeSpeed;
        }
      } else {
        player.charging = false;
      }
    }
  },

  checkCollision: function(object){
     //check against 1 object
    if(object.single){
      var dis = return_distance(vPlayer.x, vPlayer.y, object.x, object.y);
      if(dis < (this.r * 5) + object.r){
        return true;
      }
    } else {
        //check againt multiple objects
      for (var i = 0; i < object.length; i++) {
        var obj = object[i];
        var dis = return_distance(vPlayer.x, vPlayer.y, obj.x, obj.y);
        if (dis < (this.r * 5) + obj.r) {
          return true;
        }
      }
    }
  },

  absorbEnergy: function(object, amount){
    if(object.single){
      var extractAmount = (this.max_storage - this.energy);
      if(extractAmount > object.energy){
        this.energy += object.energy;
        object.energy = 0;
      } else {
        this.energy += extractAmount;
        object.energy -= extractAmount;
      }
    } else {
      //console.log("Almost");
      for (var i = 0; i < object.length; i++) {
        var obj = object[i];
        var player_dToPkt = return_distance(vPlayer.x, vPlayer.y, obj.x, obj.y);

        if ((player_dToPkt < (this.r) + obj.r) && (this.energy + obj.energy < this.max_storage)) {  
          if(amount > 0){
            this.energy += amount;
            obj.energy -= amount;
          } else {
            this.energy += obj.energy;
            obj.energy -= obj.energy;
          }
          object.splice(obj.pos, 1, 0);
        }
      }
    }
  },

  playsound: function(sound_to_play){
    this.sound = new Audio(sound_to_play);
    return this.sound.play();
  },

  attract: function(){
    for (var i = 0; i < packets.length; i++) {
      var packet = packets[i];
      var dis = return_distance(vPlayer.x, vPlayer.y, packet.x, packet.y);
      if(dis < 400 && !packet.pulled){
        packet.pulled = true;
        var ang = return_angle(vPlayer.x, vPlayer.y, packet.x, packet.y);

        packet.vx = Math.cos(ang) * 5;
        packet.vy = Math.sin(ang) * 5;
      } else {
        packet.pulled = false;
      }
    };
  },

  respawn: function(){
    var dx = vPlayer.x - cell.x;
    var dy = vPlayer.y - cell.y;
    offset.directionY += dy;
    vPlayer.y -= dy;

    offset.directionX += dx;
    vPlayer.x -= dx;
  },

  upgrade: function(upgrade_, upgrade_value){
    if(upgrade_ == "mass"){
      this.r +=  upgrade_value;
    } else if(upgrade_ == "pull_rad"){
      this.pull_rad +=  upgrade_value;
    } else if(upgrade_ == "speed"){
      offset.speedx += upgrade_value;
      offset.speedy += upgrade_value;
    } else if(upgrade_ == "max_storage"){
      this.max_storage += upgrade_value;
    }
  }
};
    //console.log(": " + upgrade_value);

var keyPressed = [];
window.onkeydown = function(e){
  e = e || window.event;
  keyPressed[e.keyCode] = true;
  e.preventDefault();
  if(keyPressed[37] || keyPressed[65]){
    offset.offSetting = true;
    player.right = true;
  }

  if(keyPressed[38] || keyPressed[87]){
    offset.offSetting = true;
    player.down = true;
  }

  if(keyPressed[39] || keyPressed[68]){
    offset.offSetting = true;
    player.left = true;
  }

  if(keyPressed[40]|| keyPressed[83]){
    offset.offSetting = true;
    player.up = true;
  }

  if(keyPressed[70] && player.energy > 0 && !energytransport.sendingEnergy){
    energytransport.absorbEnergy(player, player.energy * 0.5);
    energytransport.sendingEnergy = true;
  }

  if(keyPressed[82]){
    player.respawn();
  }
};

window.onkeyup = function(e){
  e = e || window.event;
  var code = e.which || e.keyCode;
  keyPressed[e.keyCode] = false;
  e.preventDefault();
  if(code === 37 || code === 65){ 
    offset.offSetting = false;
    player.right = false;
    vPlayer.vx = 0;
    offset.directionX -= 0;
  }
        
  if(code === 38 || code === 87){
    offset.offSetting = false;
    player.down = false; 
    vPlayer.vy = 0;
    offset.directionY -= 0;
  }
     
  if(code === 39 || code === 68){ 
    offset.offSetting = false;
    player.left = false;
    vPlayer.vx = 0;
    offset.directionX += 0; 
  } 
        
  if(code === 40 || code === 83){
    offset.offSetting = false;
    player.up = false;
    vPlayer.vy = 0;
    offset.directionY += 0;
  }
};
