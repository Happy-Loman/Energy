var bots = [];
var energyForNextBot = 500;
var energyForNextBotGrowthRate = 3.5;
var timeForNextBot = 1000;
var CTF = 1;
var PR = 50;
var MS = 200;
var numOfBots = 0;
function addNewBot(){
    numOfBots++;
    bots.push({
        single:true,
        x: cw/2,
        y: ch/2,
        r: 5,
        og_r:5,
        color: "red",
        vx: randNum(-10, 10),
        vy: randNum(-10, 10),
        speed: 10,
        energy:1,
        chanceToFind:CTF,
        produceRate:PR,
        max_storage:MS,
        launching: true,
        active:true,                                                                                                                                                                                                                                                                                                                                                                         
    });
}

function bot_draw(){
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];

        ctx.beginPath();
        ctx.arc(bot.x, bot.y, bot.r, 0, (2 * Math.PI));
        ctx.fillStyle = bot.color;
        ctx.fill();
    };
    ctx.restore();
}

function bot_update(){
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];
        bot.x += bot.vx;
        bot.y += bot.vy;

        if(bot_checkCollision(bot, cell) && !bot.active){
            cell.absorbEnergy(bot, 0);
        }

        if(return_distance(bot.x, bot.y, cell.x, cell.y) < cell.r){
            bot.launching = true;
            bot.vx = Math.cos(randNum(0, 360)) * bot.speed;
            bot.vy = Math.sin(randNum(0, 360)) * bot.speed;
        } else {
            bot.launching = false;
        }

        if(bot.energy < bot.max_storage){
            bot.active = true;
        }

        if(bot.active && !bot.launching){
            bot.r = bot.og_r;
            bot_gather(bot);
        } else {
            bot_return_to_cell(bot);
            if(bot_checkCollision(bot, cell)){
                bot.vx = -bot.vx;
                bot.vy = -bot.vy;
            }
        }
    };
}

function bot_production(){
    if(cell.energy >= energyForNextBot){
        addNewBot();
        console.log("Bots: " + numOfBots);
        CTF += 0.3;
        PR *= 2;
        MS *= 2.5;
        console.log("welp!");
        energyForNextBot *= energyForNextBotGrowthRate;
    }
}

function bot_gather(object1){
    var ran =  randNum(0, 100);
    object1.color = "gray";
    if(ran < object1.chanceToFind){
        var ang = return_angle(object1.x, object1.y, randNum(map_w, -map_w), randNum(map_h, -map_h));
        object1.energy += object1.produceRate;
        object1.r += 1;
    }

    if(ran < 1 && !bot_checkCollision(object1, cell)){
        object1.vx = Math.cos(ang) * -object1.speed;
        object1.vy = Math.sin(ang) * -object1.speed;
    }

    if(object1.energy >= object1.max_storage){
        object1.active = false;
    }
}

function bot_return_to_cell(object1){
    object1.color = "red";
    var ang = return_angle(object1.x, object1.y, cell.x, cell.y);
    object1.vx = Math.cos(ang) * -object1.speed;
    object1.vy = Math.sin(ang) * -object1.speed;
}

function bot_checkCollision(object1, object2){
    //check against 1 object
    if(object2.single){
        var dis = return_distance(object1.x, object1.y, object2.x, object2.y);
        if(dis < (object1.r) + object2.r){
            return true;
        }
    } else {
    //check againt multiple objects
        for (var i = 0; i < object2.length; i++) {
            var obj2 = object2[i];
            var dis = return_distance(object1.x, object1.y, obj2.x, obj2.y);
            if (dis < (object1.r) + obj2.r) {
                return true;
            }
        }
    }
}

function bot_absorbEnergy(object1, object2, amount){
    if(object2.single){
        if(amount <= 0){
            object1.energy += object2.energy;
            object2.energy = 0;
        } else {
            object1.energy += amount;
            object2.energy -= amount;
        }
    } else {
        for (var i = 0; i < object2.length; i++) {
            var obj = object2[i];
            var player_dToPkt = return_distance(object1.x, object1.y, obj.x, obj.y);

            if ((player_dToPkt < (object1.r) + obj.r)) {  
                if(amount > 0){
                    object1.energy += amount;
                    obj.energy -= amount;
                } else {
                    object1.energy += obj.energy;
                    obj.energy -= obj.energy;
                }
                object2.splice(obj.pos, 1, 0);
            }
        }
    };
}


/*var ang = 0;
window.setInterval(function(){
    bot.vx = Math.cos(randNum(-360, 360)) * bot.speed;
    bot.vy = Math.sin(randNum(-360, 360)) * bot.speed;
}, 1000 * (randNum(1, 7)));*/
