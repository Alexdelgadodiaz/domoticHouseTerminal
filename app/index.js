let socketId =      "webAppPi";
let terminalName =  "terminalSonatoPi";
let serverId =      "serverPi";

var io = require('socket.io-client'),
socket = io.connect('http://192.168.1.99:8080');

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

  // var payload = {
  //   action : "abrirPuerta",
  // };
  // console.log(payload);
  return false;

}
