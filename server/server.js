(function(){
    var express = require("express");
    var bodyparser = require("body-parser");
    var app = express();
    
    app.use(express.static(__dirname + '/build'));
    app.use(bodyparser.urlencoded({extended: true}));
    app.get("/",function(req,res){
        res.sendFile(__dirname + "/build/index.html");
    });
    var userInputName= "";
    app.post('/chat', function(req,res){
        userInputName = req.body.username;
        if(userInputName.length == 0){
            userInputName = "名無し";
        }
        
        res.sendFile(__dirname + "/build/main.html");
    });
   
    var http = require("http");
    var server = http.createServer(app);
    var io = require("socket.io").listen(server);
    
    var user = null;
    var participants =[];
    var canvasDataUrl = "";
    
    io.sockets.on("connection", function(socket){
        socket.on("connected",function(){
            user = {name: username, id: socket.id, canvasDataUrl: canvasDataUrl};
            
            //既存の参加者情報を送る
            for (var i in participants){
                socket.emit("join", participants[i]);
            }
            
            participants[socket.id] = user;
            socket.broadcast.emit("join",user);
            var msg = user.name + "(" + socket.id + ")" + "が退室しました";
            console.log(msg);
            delete participants[socket.id];
            socket.broadcast.emit("leave",{id:socket.id});
            socket.broadcast.emit("message",{name:"システム",message: user.name + "さんが退室しました"})
        });
    });
    
    socket.on("message",function(message){
        socket.broadcast.emit("message",message);
        socket.emit("message",message);
    })
    
    server.listen(process.env.PORT || 8080);
});