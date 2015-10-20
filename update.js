//Request animation frame for rendering
window.requestAnimFrame = ( function() {
  return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ) {
          window.setTimeout( callback, 1000 / 60 );
        };
})();

function gradient(){
        ctx.save();
        ctx.translate((offset.directionX), (offset.directionY));
    for(var i = 0; i < 100; i++){
        ctx.beginPath(); 
        ctx.arc(vPlayer.x, vPlayer.y, i , 0, (2 * Math.PI)); 
        ctx.fillStyle = "rgba(255, 255, 255," + i * 0.00009 + ")"; 
        ctx.fill();
    }
    ctx.restore();
}

/*function start(){
  window.requestAnimFrame(start);
    ctx.clearRect(0,0,map_w, map_h); 

    player.draw();
    player.update();

    cell.draw();
    cell.update();

    bot_draw();
    bot_update();
    
    update_packets();

    energytransport.draw();

    UI.update();
}

start();*/

var FPS = 50;
window.setInterval(function(){
    ctx.clearRect(0,0,map_w, map_h); 

    player.draw();
    player.update();
    cell.draw();
    cell.update();
    UI.update();

    bot_production();
    bot_draw();
    bot_update();

    update_packets();
    update_stars();

    energytransport.draw();
}, 1000/FPS);
