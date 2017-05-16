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

console.log('websockets server started');
ws.on('connection', function(socket) {
    console.log('client connection established');
    /*messages.forEach(function(msg) {
        socket.send(msg);
    });*/
    socket.on('message', function(data) {
        //console.log('message received: ' + data);
        board = data;
        console.log(board);
        ws.clients.forEach(function(clientsocket) {
          clientsocket.send(board);
        })
        /*messages.push(data);
        console.log(data)
        ws.clients.forEach(function(clientSocket) {
            clientSocket.send(data)
        });*/

    });
});
