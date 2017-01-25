let socketId =      "webAppPi";
let terminalName =  "terminalSonatoPi";
let serverId =      "serverPi";

var io = require('socket.io-client'),
socket = io.connect('http://192.168.1.97:8080');
var wpi = require('wiring-pi');

socket.on('connect', function () {
  console.log("socket connected");
  handleEntryConnection(socket);

});


function handleEntryConnection(socket){
  console.log("Terminal: mensaje recibido del server");

  socket.on("messagesFromServerToTerminal", function(socketId, data, callback){
    // socketName[socket.id] = socketId;
    if (socketId == serverId) {
      switch (data) {
        case "abrirPuerta":
            abrirPuerta();
          break;
        default:
           console.log("messageFromClient not valid");
      }
    }

  });
}
socket.emit('messageFromTerminalToServer', terminalName, "connection");


//send message to server
function abrirPuerta(){
  console.log("Terminal: recibido orden de abrir puerta");
  socket.emit('messageFromTerminalToServer', terminalName, "doorOpened");

// GPIO pin of the led
var configPin = 7;
// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);

var isLedOn = 0;
var i = 0;

var interval = setInterval(function() {
	i++;
	if (i <= 6){
	isLedOn = +!isLedOn;
	//isLedOn = !isLedOn;
	wpi.digitalWrite(configPin, isLedOn );
	}else{
	clearInterval(interval);
	}
}, configTimeout);

  return false;

}
