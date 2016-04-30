var io = require('socket.io');
var socket = new io.Socket();
socket.connect();
socket.on("connect",function(data){
    console.log("connect session" + socket.transport.sessionid)
});

