function surport(){
   //If borwse does surport loal storage 
  if(typeof(Storage) !== "undefined"){
    return true;
  } else {
    //otherwise reload page
    location.reload();
  }
}

function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

function store (set_to, set) {
  surport();
  localStorage.setItem(set_to, (set + "")); 
}

function get_item (get) {
  surport();
  return localStorage.getItem(get);
}

function search_name(name){
    var nam;
    for(var i = 0; i < name.length; i++){
        if(i > (name.length - 2)){
            return false;
        } else {
            nam = name[i] + name[i + 1] + name[i + 2];
            if(nam == "mod" || nam == "Mod" || nam == "MOd" || nam == "MOD" || nam == "MoD" || nam == "mOd" || nam == "moD" || nam == "mOD"){
                return true;
            }
        }
    }
}

// CREATE A REFERENCE TO FIREBASE
  var messagesRef = new Firebase('https://brilliant-fire-8407.firebaseio.com/-K1FiKTXl2MAqyPpP6fX');

  // REGISTER DOM ELEMENTS
  var messageField = $('#messageInput');
  var messageList = $('#example_messages');
  var name_change = false;
  var chatting = false;
  var n = $('#username');
  // LISTEN FOR KEYPRESS EVENT 
function change_name(){
    document.getElementById("change_name_container").style.display = "block";
}

var name_save = "Test101";
var n1 = ["Laveta", "Weideman",
"Charlene", "Mcalpin",
"Victor", "Pak",
"Genia", "Scala",
"Mercedez", "Pinedo",
"Giuseppe", "Mccarron",
"Alvina", "Yonker",
"Royce", "Palmore",
"Cliff", "Overfelt",
"Amparo", "Nyquist",
"Vivienne", "Erskine",
"Shelia", "Beres",
"Johnathan", "Henline",
"Joslyn", "Whitty"];

var n2 = ["Laveta", "Weideman",
"Charlene", "Mcalpin",
"Victor", "Pak",
"Genia", "Scala",
"Mercedez", "Pinedo",
"Giuseppe", "Mccarron",
"Alvina", "Yonker",
"Royce", "Palmore",
"Cliff", "Overfelt",
"Amparo", "Nyquist",
"Vivienne", "Erskine",
"Shelia", "Beres",
"Johnathan", "Henline",
"Joslyn", "Whitty"];

var ran = Math.round(randNum(0, 27));
var ran2 = Math.round(randNum(0, 27)); 
var username; 
if(JSON.parse(localStorage.getItem("username1")) == null){
    username = n1[ran] + " " + n2[ran2]; 
    localStorage.setItem("username1", JSON.stringify(username));
} else {
    username = JSON.parse(localStorage.getItem("username1"));
}
var s = new Date().getTime(); 
var lastMsg = "";
messageField.keypress(function (e) {
   if (e.keyCode == 13) {
        var message = messageField.val();
        var newMsg = message;
        var end = new Date().getTime();
        var f = Math.round((end - s)/1000);
        console.log("f: "+ f);
        chatting = true;
        if(messageField.val() !== "" && f >= (2) && lastMsg != newMsg){
            //FIELD VALUES
          if(get_item(name_save) !== null){
              //username = get_item(name_save);
          }
         
          if(get_item(name_save) == "Bob" || get_item(name_save) == "bob" || get_item(name_save) == "BOb" || get_item(name_save) == "BOB" || get_item(name_save) == "BoB" || get_item(name_save) == "boB"){
              alert("Your not allowed to type sorry");
              return 0;
          }
          console.log("hey");
          message = messageField.val();
        
          //SAVE DATA TO FIREBASE AND EMPTY FIELD 
          messagesRef.push({name:username, text:message});
          // End of save
          store(name_save, username);
          document.getElementById("username").innerHTML = "Welcome " + get_item(name_save);
          document.getElementById("messageInput").value = "";
          //messageField.val('');
        }
        s = new Date().getTime();
        lastMsg = newMsg;
    }
}); 
var ch = false;
  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(20).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'> </strong>");
    nameElement.text(username + ": ");
    messageElement.text(message).prepend(nameElement); 
    if(name_change === true){
        messageElement.css("color", "red");
        name_change = !false; 
    }
    
    if((search_name(get_item(name_save))) && chatting === true){
       messageElement.css("color", "blue");
       chatting = false;
        ch = true;
    }
      
     if(ch === true){
         messageElement.css("color", "blue");
     }
    //ADD MESSAGE
    messageList.append(messageElement); 
      
    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  }); 

var d = new Date();
var hour = d.getHours();
var min = d.getMinutes();

console.log(hour + ":" + min);  

var chatMod = {
    message:function(type){
      switch(type){
          case clear:
            messagesRef.push({name:"Chat Mod", text:"This room will be cleared soon."}); 
            messageElement.css("color", "blue");
            break;
      }
    },
};
 








