var loaded = false;

if(JSON.parse(localStorage.getItem("save2")) == null){
    saving();
} else {
    load();
    loaded = true;
    console.log("done");
}

load();

function saving() {
    var save = {
        batteries:batteries,
        wires:wires,
        lightbulb:lightbulb,
        generator:generator,
        charger:charger,
        heat:heat,
        solar:solar,
        energy:energy,
        parts:parts,
        ship:ship,
    }
    localStorage.setItem("save2", JSON.stringify(save));
}

function load() {
    var saveObj2 = JSON.parse(localStorage.getItem("save2"));
    batteries = saveObj2.batteries;
    wires = saveObj2.wires;
    lightbulb = saveObj2.lightbulb;
    generator = saveObj2.generator;
    charger = saveObj2.charger;
    heat = saveObj2.heat;
    solar = saveObj2.solar;
    energy = saveObj2.energy;
    parts = saveObj2.parts;
    ship = saveObj2.ship;

    batteries.looking = false;
    batteries.convert = false;

    wires.looking = false;
    wires.convert = false;

    lightbulb.looking = false;
    lightbulb.convert = false;

    generator.convert = false;
    charger.convert = false;
    heat.convert = false;
    solar.convert = false;
}

window.setInterval(function(){
    if(loaded){
        saving();
        //console.log(save.batteries);
    }
}, 10);
