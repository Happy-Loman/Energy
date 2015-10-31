//Help
$(".help_").click(function(){
	$(this).toggleClass("show");
	$(this).children().toggleClass("show_");
});

$(".setting").click(function(){
	$(".help").toggleClass("off");
	$(".game_area_container").toggleClass("off");
	$(this).removeClass("settingshow");
})

//Random number Generator
function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

//Getting elements by ID for UI/UX
function GID(id){
  return document.getElementById(id);
}

var batteries = {
	name:"Batteries",
	amount: 0,
    E_produced: 0.1,
	searching:false,
	looking: false, 
	convert: false,
	open:true,
	ctfUpper: 3,
	bot: {
		amount:0,
	  	//Bots use up energy
	  	eIntput:0.06,
	  	cost: 30,
	  	activated:false,
	  	display:"",
    },
	display:"<div>Name</div>",
};

var wires = {
	name:"Wires",
	amount: 0,
    E_produced: 0.5,
	searching:false,
	looking: false,
	convert: false,
	open:false,
	batteriesNeeded:500,
	ctfUpper: 4,
	bot: {
		amount:0,
	  	//Bots use up energy
	  	eIntput:0.09,
	  	cost: 1000,
	  	activated:false,
	  	display:"",
    },
	display:0,
};

var lightbulb = {
	name:"Lightbulb",
	amount: 0,
    E_produced: 3,
	searching:false,
	looking: false,
	convert: false,
	open:false,
	batteriesNeeded:1000,
	wiresNeeded:400,
	ctfUpper: 5,
	bot: {
		amount:0,
	  	eIntput:0.1,
	  	cost: 5000,
	  	activated:false,
	  	display:"",
    },
	display:0,
};

var generator = {
	name:"Generator",
	amount: 0,
    E_produced: 2,
	convert: false,
	open:false,
	makeable:false,
	wiresNeeded:3000,
	batteriesNeeded:1000,
	decay_time:500,
	decay:1000,
	display:0,
};

var charger = {
	name:"Charger",
	amount: 0,
    E_produced: 3,
	convert: false,
	open:false,
	makeable:false,
	wiresNeeded:5000,
	batteriesNeeded:20000,
	generatorsNeeded:5,
	decay_time:1000,
	decay:1000,
	display:0,
};

var heat = {
	name:"Heat",
	amount: 0,
    E_produced: 5,
	convert: false,
	open:false,
	makeable:false,
	lightbulbNeeded:3000,
	generatorsNeeded:40,
	decay_time:2000,
	decay:2000,
	display:0,
};

var solar = {
	name:"Solar",
	amount: 0,
    E_produced: 50,
    searching:false,
	looking: false,
	ctfUpper: 100,
	energyNeeded: 1000000,
	open:false,
	display:"solar",
};

var energy = {
	name: "Energy",
	enrg:0,
};

var parts = {
	name: "Parts",
	amount:0,
	//save for later version//////
    /*type:["Thrust", ""],	*/
    /////////////////////////////
};

//Save for later version//
var ship = {
	energy: 0,
    batteries: 0,
	wires: 0,
	bulbs: 0,
	generators: 0,
	heat: 0,
	solar: 0,
	launch: false,
};
////////////////////

//Look for energy
function lookFor(item){
	if(item.open && item.looking){
		var rand = randNum(0, item.ctfUpper);
	    item.searching = true;
        if(rand <= 1){
	        if(item.bot.activated){
	        	item.amount += Math.round(randNum(1, 5)) * Math.round(randNum(1, item.bot.amount * 2));
	        } else {
	        	item.amount += Math.round(randNum(1, 5));
	        }
        } else if(rand > 2 && rand < item.ctfUpper){
            parts.amount += 1;
		} else {
			console.log("Found Nothing");
		}
		item.searching = false;
	}
}

//convert found energy
function convert(item){
	if(item.open && item.convert){
		var x = 0;
	    if(item.amount > 0){
		    item.amount--;
		    x = Number(energy.enrg);
	        energy.enrg = x + (item.E_produced);
		    energy.enrg = (energy.enrg).toFixed(2);
		    x += item.E_produced;
	    }
	} else {
		
	}
}

//generate energy
function generateE(object){
	if(object.open && object.decay_time > 0 && object.amount > 0){
		var x = 0;
	    if(object.amount > 0){
		    x = Number(energy.enrg);
	        energy.enrg = x + (object.E_produced * object.amount);
		    energy.enrg = (energy.enrg).toFixed(2);
		    x += object.E_produced;
	    }
	    object.decay_time--;
	}
	if(object.decay_time <= 0 && object.amount > 0){
		object.amount--;
		object.decay_time = object.decay;
	}
}

function removeE(amount){
	x = Number(energy.enrg);
	energy.enrg = x - amount;
	energy.enrg = (energy.enrg).toFixed(2);
}

var clicked = false;
$(".button").click(function(){
    if(!clicked){
		$(this).addClass("clicked");
		clicked = true;
	}
	
	window.setTimeout(function(){
		$(".button").removeClass("clicked");
		clicked = false;
	}, 100);
});

$(".sub_buttons").click(function(){
    $(this).toggleClass("active");
});

$("#batteries").click(function(){
	if(batteries.looking && !batteries.searching){
		lookFor(batteries);
	}
});

$("#wires").click(function(){
	if(wires.looking && !wires.searching){
		lookFor(wires);
	}
});

$("#bulb").click(function(){
	console.log(lightbulb.open);
	if(lightbulb.looking && !lightbulb.searching){
		lookFor(lightbulb);
	}
});

$("#generator").click(function(){
	console.log("gen: " + generator.makeable);
	if(generator.makeable){
		generator.amount += 1;
		batteries.amount -= generator.batteriesNeeded;
		wires.amount -= generator.wiresNeeded;

		generator.batteriesNeeded += generator.batteriesNeeded * 0.4;
		generator.wiresNeeded += generator.wiresNeeded * 0.4;
	}
});

$("#charger").click(function(){
	console.log(charger.convert);
	if(charger.makeable){
		charger.amount += 2;
		batteries.amount -= charger.batteriesNeeded;
		wires.amount -= charger.wiresNeeded;
		generator.amount -= charger.generatorsNeeded;

		charger.batteriesNeeded += charger.batteriesNeeded * 0.5;
		charger.wiresNeeded += charger.wiresNeeded * 0.5;
	}
});

$("#heat").click(function(){
	console.log(heat.convert);
	if(heat.makeable){
		heat.amount += 3;
		lightbulb.amount -= heat.lightbulbNeeded;		
		generator.amount -= heat.generatorsNeeded;

		heat.lightbulbNeeded +=  heat.lightbulbNeeded * 0.7;
	}
});

$("#solar").click(function(){
	if(solar.open){
		lookFor(solar);
	}
});

$("#batteries_bot").click(function(){
	if(energy.enrg >= batteries.bot.cost){
		batteries.bot.activated = true;
		batteries.bot.amount ++;
		removeE(batteries.bot.cost);
		batteries.bot.cost += batteries.bot.cost * 0.4;
	}
});

$("#wires_bot").click(function(){
	if(energy.enrg >= wires.bot.cost){
		wires.bot.activated = true;
		wires.bot.amount ++;
		removeE(wires.bot.cost);
		wires.bot.cost += wires.bot.cost * 0.6;
	}
});

$("#bulb_bot").click(function(){
	if(energy.enrg >= lightbulb.bot.cost){
		lightbulb.bot.activated = true;
		lightbulb.bot.amount ++;
		removeE(lightbulb.bot.cost);
		lightbulb.bot.cost += lightbulb.bot.cost * 0.7;
	}
});

$("#batteries").hover(function(){
	mouse.display = batteries.display;
});

$("#wires").hover(function(){
	mouse.display = wires.display;
});

$("#bulb").hover(function(){
	mouse.display = lightbulb.display;
});

//bot display
$("#batteries_bot").hover(function(){
	mouse.display = batteries.bot.display;
});

$("#wires_bot").hover(function(){
	mouse.display = wires.bot.display;
});

$("#bulb_bot").hover(function(){
	mouse.display = lightbulb.bot.display;
});

//
$("#generator").hover(function(){
	mouse.display = generator.display;
});

$("#charger").hover(function(){
	mouse.display = charger.display;
});

$("#heat").hover(function(){
	mouse.display = heat.display;
});

$("#solar").hover(function(){
	if(!solar.open){
		mouse.display = "Mystery??";
	}
});

var mouse = {
	display:"",
}
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

$(".lookFor").click(function(){
	var id = this.id;
	console.log(id);
	if(id[0] == "b"){
		batteries.looking = !batteries.looking;
	} else if(id[0] == "w"){
		wires.looking = !wires.looking;
	} else if(id[0] == "l"){
		lightbulb.looking = !lightbulb.looking;
	} else if(id[0] == "s"){
		solar.looking = !solar.looking;
	}
});

$(".convert").click(function(){
	var id = this.id;
	if(id[0] == "b"){
		batteries.convert = !batteries.convert;
	} else if(id[0] == "w"){
		wires.convert = !wires.convert;
	} else if(id[0] == "l"){
		lightbulb.convert = !lightbulb.convert;
	} else if(id[0] == "g"){
		generator.convert = !generator.convert;
	} else if(id[0] == "c"){
		charger.convert = !charger.convert;
	} else if(id[0] == "h"){
		heat.convert = !heat.convert;
	} 
});

//update the display
function updateDisplays(){
	batteries.display = "<div>" + batteries.name + "</div><div>Energy Produced: " + batteries.E_produced + "<span style=\"font-size:10px;\">e<span></div>";
	if(!wires.open){
		wires.display = "<div>" + wires.name + "</div><div>Energy Produced: " + wires.E_produced + "<span style=\"font-size:10px;\">e<span></div></div><div>Batteries Needed: " + wires.batteriesNeeded + "<span style=\"font-size:10px;\">b<span></div>";
	} else {
		wires.display = "<div>" + wires.name + "</div><div>Energy Produced: " + wires.E_produced + "<span style=\"font-size:10px;\">e<span></div>";
	}
	
	if(!lightbulb.open){
		lightbulb.display = "<div>" + lightbulb.name + "</div><div>Energy Produced: " + lightbulb.E_produced + "<span style=\"font-size:10px;\">e<span></div></div><div>Batteries Needed: " + lightbulb.batteriesNeeded + "<span style=\"font-size:10px;\">b<span></div></div><div>Wires Needed: " + lightbulb.wiresNeeded + "<span style=\"font-size:10px;\">l<span></div>";
	} else {
		lightbulb.display = "<div>" + lightbulb.name + "</div><div>Energy Produced: " + lightbulb.E_produced + "<span style=\"font-size:10px;\">e<span></div>";
	}
	
	//Bots
	batteries.bot.display = "<div>Cost: " + batteries.bot.cost + "<span style=\"font-size:10px;\">e<span></div>";
	wires.bot.display = "<div>Cost: " + wires.bot.cost + "<span style=\"font-size:10px;\">e<span></div>";
	lightbulb.bot.display = "<div>Cost: " + lightbulb.bot.cost + "<span style=\"font-size:10px;\">e<span></div>";

	generator.display = "<div>" + generator.name + " Cost</div><div>Batteries Needed: " + batteries.amount + "/" + generator.batteriesNeeded + "<span style=\"font-size:10px;\">g<span></div><div>Wires Needed: " + wires.amount + "/" + generator.wiresNeeded + "<span style=\"font-size:10px;\">w<span></div><div>Decay Time: " + generator.decay_time + "</div>";
	charger.display = "<div>" + charger.name + " Cost</div><div>Batteries Needed: " + batteries.amount + "/" + charger.batteriesNeeded + "<span style=\"font-size:10px;\">b<span></div><div>Wires Needed: " + wires.amount + "/" + charger.wiresNeeded + "<span style=\"font-size:10px;\">w<span></div><div>Generators Needed: " + generator.amount + "/" + charger.generatorsNeeded + "<span style=\"font-size:10px;\">g<span></div>";
	heat.display = "<div>" + heat.name + " Cost</div><div>Lightbulbs Needed: " + lightbulb.amount + "/" + heat.lightbulbNeeded + "<span style=\"font-size:10px;\">l<span></div><div>Generators Needed: " + generator.amount + "/" + heat.generatorsNeeded + "<span style=\"font-size:10px;\">g<span></div>";
}

//game loop
function gameLoop(){
	updateDisplays();
	if(energy.enrg <= 0){
		energy.enrg = 0;
	}
	if(batteries.amount > wires.batteriesNeeded || wires.open){
		wires.open = true;
		$("#wire_button").removeClass("deactivated");
	}

	if(((batteries.amount > lightbulb.batteriesNeeded) && (wires.amount > lightbulb.wiresNeeded)) || lightbulb.open){
		lightbulb.open = true;
		$("#bulb_button").removeClass("deactivated");
	}

	if((batteries.amount > generator.batteriesNeeded && wires.amount > generator.wiresNeeded)){
		generator.open = true;
		generator.makeable = true;
		$("#generator_button").removeClass("deactivated");
	} else {
		generator.makeable = false;
	}
	//make sure item is open
	if(generator.open){
		$("#generator_button").removeClass("deactivated");
	}

	if((batteries.amount > charger.batteriesNeeded && wires.amount > charger.wiresNeeded && generator.amount > charger.generatorsNeeded)){
		charger.open = true;
		charger.makeable = true;
		$("#charger_button").removeClass("deactivated");
	} else {
		charger.makeable = false;
	}

	if(charger.open){
		$("#charger_button").removeClass("deactivated");
	}

	if((lightbulb.amount > heat.lightbulbNeeded && generator.amount > heat.generatorsNeeded)){
		heat.open = true;
		heat.makeable = true;
		$("#heat_button").removeClass("deactivated");
	} else {
		heat.makeable = false;
	}

	if(heat.open){
		$("#heat_button").removeClass("deactivated");
	}

	if((energy.enrg >= solar.energyNeeded && batteries.amount >= 1000 && wires.amount >= 1000 && lightbulb.amount >= 1000 && generator.amount >= 1000 && charger.amount >= 1000 && heat.amount >= 1000) || solar.open){
		solar.open = true;
		$("#solar_button").removeClass("deactivated");
	}

	if(energy.enrg > 1000000000 && parts.amount > 1000000000000 && solar.amount > 50){
		alert("You beat the game");
	}
}

//Look for speed and loop
var speed = 0.01;
window.setInterval(function(){
	updateBot();
}, 1000 * speed);

function updateBot(){
	if(batteries.bot.activated && energy.enrg > 0 && batteries.looking){
		lookFor(batteries);
		removeE(batteries.bot.eIntput);
	}

	if(wires.bot.activated && energy.enrg > 0 && wires.looking){
		lookFor(wires);
		removeE(wires.bot.eIntput);
	}

	if(lightbulb.bot.activated && energy.enrg > 0 && lightbulb.looking){
		lookFor(lightbulb);
		removeE(lightbulb.bot.eIntput);
	}
}

//convert speed and loop
var speed = 0.02;
window.setInterval(function(){
	updateconvert();
}, 1000 * speed);

function updateconvert(){
	if(batteries.convert){
		convert(batteries);
	}

	if(wires.convert){
		convert(wires);
	}

	if(lightbulb.convert){
		convert(lightbulb);
	}

	if(generator.convert){
		generateE(generator);
	}

	if(charger.convert){
		generateE(charger);
	}

	if(heat.convert){
		generateE(heat);
	}

	if(solar.convert){
		generateE(solar);
	}
}

window.setInterval(function(){
	gameLoop();
	GID("sub_Mouse").innerHTML = mouse.display;

	GID("batteries").innerHTML = batteries.amount + " <span style=\"font-size:10px;\">b<span>";
	GID("wires").innerHTML = wires.amount + " <span style=\"font-size:10px;\">w<span>";
	GID("bulb").innerHTML = lightbulb.amount + " <span style=\"font-size:10px;\">l<span>";
	GID("generator").innerHTML = generator.amount + " <span style=\"font-size:10px;\">g<span>";
	GID("charger").innerHTML = charger.amount + " <span style=\"font-size:10px;\">c<span>";
	GID("heat").innerHTML = heat.amount + " <span style=\"font-size:10px;\">h<span>";
	GID("solar").innerHTML = solar.amount + " <span style=\"font-size:10px;\">s<span>";

	//Bots
	GID("batteries_bot").innerHTML = "Bots: " + batteries.bot.amount;
	GID("wires_bot").innerHTML = "Bots: " + wires.bot.amount;
	GID("bulb_bot").innerHTML = "Bots: " + lightbulb.bot.amount;
	 
	GID("energy").innerHTML = (energy.enrg) + "e";
	GID("parts").innerHTML = parts.amount + "p";
}, 1);




var t = 0;
var listRef = new Firebase("https://brilliant-fire-8407.firebaseio.com/online");
var userRef = listRef.push({players:t++});
//listRef.push();
//listRef.push({players:10});
// Add ourselves to presence list when online.
var presenceRef = new Firebase("https://brilliant-fire-8407.firebaseio.com/online");
presenceRef.on("value", function(snap) {
  if (snap.val()) {
    userRef.set(true);
    // Remove ourselves when we disconnect.
    userRef.onDisconnect().remove();
  }
});

// Number of online users is the number of objects in the presence list.
listRef.on("value", function(snap) {
  var l = snap.numChildren();
  document.getElementById("userNum").innerHTML = "Current Players: " + l;
});










