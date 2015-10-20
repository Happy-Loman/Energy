//Create an array to store all packets
var packets = [];
//Push 10 gems into the array
for(var i = 0; i < 200; i++){
  var rand = randNum(3, 7);
    packets.push({
      single:false,
      x:randNum(-map_w, map_w),
      y:randNum(-map_h, map_h),
      r:rand,
      og_r:rand,
      energy:0,
      vx:0,
      vy:0,
      speed:1,
      pos:i,
      color:randColor(),
      mass:randNum(1, 5),
      pulled:false,
    });
    numOfPackets++;
}

function draw_packets(object1){
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));
    // clear the viewport
    //ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);
    
    // draw the other stuff
        // we should really only draw the things that intersect the viewport!
        // but I am lazy so we are drawing everything here
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.arc(object1.x, object1.y, object1.r, 0, (2 * Math.PI));
        ctx.fillStyle = object1.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(object1.x, object1.y, object1.r, 0, (2 * Math.PI));
        ctx.fillStyle = object1.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
        ctx.fill();

        ctx.restore();
}

function update_packets(){
  for (var i = 0; i < packets.length; i++) {
        var packet = packets[i];
        packet.x += packet.vx;
        packet.y += packet.vy;
        packet.energy = packet.r * 5;

        var dis = return_distance(vPlayer.x, vPlayer.y, packet.x, packet.y);
        if(dis < 1000){
          draw_packets(packet);
        }

        if(packet.pulled === false){
          packet.vx = 0;
          packet.vy = 0;
        }

        if(packet.x <= (cw/2 + 100) && packet.x >= (cw/2 - 100)){
          packet.x = randNum(-map_w, map_w);
        }

        if(packet.y <= (cw/2 + 100) && packet.y >= (cw/2 - 100)){
          packet.y = randNum(-map_h, map_h);
        }
    } 

  var randInterval = randNum(1, 5);
    //console.log(numOfPackets);
    if(randInterval < 1.1 && numOfPackets < 1050){
      numOfPackets++;
      packets.push({
        single:false,
        x:randNum(-map_w, map_w),
        y:randNum(-map_h, map_h),
        r:randNum(1, 5),
        energy:0,
        vx:0,
        vy:0,
        speed:1,
        pos:packets.length,
        color:randColor(),
        mass:randNum(1, 5),
        pulled:false,
      });
    }
}

var stars = [];
//Push 10 gems into the array
for(var i = 0; i < 5000; i++){
    stars.push({
      single:true,
      x:randNum(-map_w, map_w),
      y:randNum(-map_h, map_h),
      r:randNum(0.1, 3),
      energy:0,
      vx:0,
      vy:0,
      pos:i,
      color:"white",
    });
}

function draw_stars(object1){
      ctx.save();
      ctx.translate((offset.directionX), (offset.directionY));
      // clear the viewport
      //ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);
      if(cell.checkCollision(object1)){
        object1.x = randNum(-map_w, map_w);
        object1.y = randNum(-map_h, map_h);
      }

      ctx.beginPath();
      ctx.arc(object1.x, object1.y, object1.r, 0, (2 * Math.PI));
      ctx.fillStyle = object1.color;
      ctx.fill();
    
      ctx.restore();
}

function update_stars(){
  for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      var dis = return_distance(vPlayer.x, vPlayer.y, star.x, star.y);
      if(dis < 1800){
        draw_stars(star);
      }
    };
}
