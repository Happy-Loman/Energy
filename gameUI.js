var statuses = ["Sending", "Charging", "Idle"];

var UI = {
	status: "Idle",

    mouse: {
        status: "",
        update: function(){
            GID("mouse").innerHTML = this.status;
        }   
    },

	update: function(){
		//$(".cell_charge").css("width", ((cell.energy/cell.maxEnergy) * 400 ) + "px");
    	$(".player_charge").css("width", ((player.energy/player.max_storage) * 250) + "px"); 
        GID("cell_charge").innerHTML = "Cell Charge: " + Math.round(cell.energy);
    	GID("status").innerHTML = this.status;
    	if(energytransport.sendingEnergy){
        	this.status = "Sending";
    	} else if(player.charging){
    		this.status = "Charging";
    	} else {
    		this.status = "Idle";
    	}

        this.mouse.update();
	},
};

 $(".player_charge").mouseenter(function(){
    UI.mouse.status = player.energy + "/" + player.max_storage;
});
 $(".player_charge").mouseleave(function(){
    UI.mouse.status = "Idle";
});

window.onmousemove = function(e){
    var d = GID('mouse');
    d.style.position = "absolute";
    e = e || window.event;
    var position = [e.clientX || e.pageX, e.clientY || e.pageY];
    
    var x = e.clientX;
    var y = e.clientY;
    GID("mouse").style.opacity = 0.7;
    d.style.left = (position[0] + 30) + "px";
    d.style.top = (position[1]) + "px";
   //console.log("X: " + e.clientX + " Y: " + e.clientY);
};  

$(".energy_display").click(function(){
    $(".energy_display").toggleClass("pull_up");
    $(".get_display").addClass("pull_down"); 
});

$(".get_display").click(function(){
    $(".get_display").addClass("pull_up");
    $(".get_display").removeClass("pull_down"); 
    $(".energy_display").toggleClass("pull_up");
}); 

