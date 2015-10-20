var cell = {
  single:true,
	x: vPlayer.x,
  y: vPlayer.y,
	energy:100,
	collect_rad:0,
	color: "rgba(104, 155, 205, 0.3)",
	og_r:900,
	r: 900,
	vx:0,
	vy:0,	

  playerHoldingCenter: {
    single:true,
    x:cw/2,
    y: ch/2,
    r: player.r * 4,
    color: "rgba(255, 255, 255, 0.4)",
  },

	draw: function(){
		ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));

    ctx.lineWidth = 5;

      	// set line color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.og_r, 0, (2 * Math.PI));
    ctx.fillStyle = this.color;
    ctx.fill();

		ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.stroke();
    ctx.fill();

    //Player holding section
    ctx.beginPath();
    ctx.arc(this.playerHoldingCenter.x, this.playerHoldingCenter.y, this.playerHoldingCenter.r, 0, (2 * Math.PI));
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillStyle = this.playerHoldingCenter.color;
    ctx.stroke();
    ctx.fill();

		ctx.restore();
	},

	update: function(){
		this.x += this.vx;
		this.y += this.vy;

		this.collect_rad = this.r + 200;
		this.attract();
		if(this.checkCollision(packets)){
			this.absorbEnergy(packets, 0);
      numOfPackets--;
		}
	},

	checkCollision: function(object){
    //check against 1 object
    if(object.single){
      var dis = return_distance(this.x, this.y, object.x, object.y);
      if(dis < (this.r) + object.r){
        return true;
      }
    } else {
        //check againt multiple objects
      for (var i = 0; i < object.length; i++) {
        var obj = object[i];
        var dis = return_distance(this.x, this.y, obj.x, obj.y);
        if (dis < (this.r) + obj.r) {
          return true;
        }
      }
    }
  },


  absorbEnergy: function(object, amount){
    if(object.single){
      this.energy += object.energy;
      object.energy -= object.energy;
    } else {
      for (var i = 0; i < object.length; i++) {
        var obj = object[i];
        var player_dToPkt = return_distance(this.x, this.y, obj.x, obj.y);

        if ((player_dToPkt < (this.r) + obj.r)) {  
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

  attract: function(){
    for (var i = 0; i < packets.length; i++) {
     	var packet = packets[i];
      var dis = return_distance(this.x, this.y, packet.x, packet.y);
      if(dis < this.collect_rad){
        var ang = return_angle(this.x, this.y, packet.x, packet.y);
        packet.speed = 500/dis;

        packet.vx = Math.cos(ang) * packet.speed;
        packet.vy = Math.sin(ang) * packet.speed;
    	}
  	}
	},
}

window.setInterval(function(){
  if(cell.r >= cell.og_r + 100){
    cell.r = cell.og_r;
  }
  cell.r += 1;
}, 1);

var energytransport = {
  single:true,
  x:vPlayer.x,
  y:vPlayer.y,
  r:10,
  vx:0,
  vy:0,
  energy:0,
  takeAmount:0,
  speed:0,
  sendingEnergy:false,
  color: "rgba(255, 5, 0, 0)",

  draw: function(){
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));

    //ctx.lineWidth = 5;

    // set line color

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    ctx.stroke();
    ctx.fill();

    ctx.restore();

    if(!this.sendingEnergy){
      this.x = vPlayer.x;
      this.y = vPlayer.y;
      this.color = "transparent";
    } else {
      this.color = "rgba(200, 100, 200, 1)";
    }
  },

  sendTrasport: function(){
    this.x += this.vx;
    this.y += this.vy;

    var dis = return_distance(cell.x, cell.y, this.x, this.y);
    var ang = return_angle(cell.x, cell.y, this.x, this.y);
    this.speed = dis/10;

    this.vx = Math.cos(ang) * this.speed;
    this.vy = Math.sin(ang) * this.speed;

    if(cell.checkCollision(energytransport)){
      cell.absorbEnergy(energytransport, 0);
      this.reset();
    }
  },

  absorbEnergy: function(object, amount){
    if(object.single){
      var extractAmount = amount;
      this.energy += extractAmount;
      object.energy -= extractAmount;
    } else {
      for (var i = 0; i < object.length; i++) {
        var obj = object[i];
        var player_dToPkt = return_distance(this.x, this.y, obj.x, obj.y);

        if ((player_dToPkt < (this.r) + obj.r)) {  
          this.energy += amount;
          obj.energy -= amount;
          object.splice(obj.pos, 1, 0);
        }
      }
    }
  },

  reset: function(){
    player.absorbEnergy(this, 0);
    this.sendingEnergy = false;
    this.vx = 0;
    this.vy = 0;
    this.x = vPlayer.x;
    this.y = vPlayer.y;
  }
}

/*window.setInterval(function(){
  console.log("energy: " + player.energy + " Cell Energy: " + cell.energy);
  console.log("overGen: " + energytransport.energy);
}, 1000);*/
