var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
let board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

var player = 'red';
console.log('websockets server started');
ws.on('connection', function(socket) {
    console.log('client connection established');
    ws.clients.forEach(function(clientsocket) {
      clientsocket.send(JSON.stringify({
        serverBoard: board,
        playerTurn: player
      }));
    })
    /*messages.forEach(function(msg) {
        socket.send(msg);
    });*/
    socket.on('message', function(data) {
        //console.log('message received: ' + data);
        board = data;
        if(player == 'red')
          player = 'yellow'
        else
          player = 'red'
        ws.clients.forEach(function(clientsocket) {
          clientsocket.send(JSON.stringify({
            serverBoard: board,
            playerTurn: player
          }));
        })
        /*messages.push(data);
        console.log(data)
        ws.clients.forEach(function(clientSocket) {
            clientSocket.send(data)
        });*/

    });
});
