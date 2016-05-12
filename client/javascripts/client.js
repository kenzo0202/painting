$(document).ready(function(){
    var socketio = null;
    socketio = io.connect("http://localhost:8080")
    
    var user = {};
    var participantInfo = [];
    var can = $("#board")[0];
    var context = can.getContext("2d");
    var on = false;
    var old_x;
    var old_y;
    var changed_x;
    var changed_y;
    var color;
    var red = $("#red").val();
    var blue = $("#blue").val();
    var yellow = $("#yellow").val();
    var weight  = $("#bold").val()/5;
    var linestyle = "normal";
    var i = 0;
    var prev_imagedata;
    
    socketio.emit("connected",{});
    
    socketio.on("connected",function(object){
        user.name = object.name;
        user.id = object.id;
        user.drawInfo = {}
    });
    
    //入室した時の参加者情報の取得
    socketio.on("join", function(object){
        var otheruser = {};
        otheruser.name = object.name;
        otheruser.id = object.id;
        otheruser.drawInfo = {pointX: null, pointY: null};
        participantInfo[object.id] = otheruser;
        updateParticipantList();
    })
    //入室した時のメッセージ機能
    socketio.on("message",function(messageObject){
        var message = messageObject.name + ":" + messageObject.message;
        var element = document.getElementById("logArea");
        var str = element.value;
        element.value = (typeof str == "undefiend" || str.length == 0) ? message: message + "\n" + str;
    })
    
    socketio.on("leave",function(object){
        delete participantInfo[object.id];
        updateParticipantList();
    })
    
    
    //参加者情報のアップデート
    //毎回入室するたびに、一度全部消して更新してる
    var updateParticipantList = function(){
        var element = document.getElementById("participantList");
        for (var i in element.options){
            element[i] = null;
        }
        var count = 0;
        for(var i in participantInfo){
            element.options[count++] = new Option(participantInfo[i].name);
        }
    };
    
    this.talk = function(){
        var element = document.getElementById("talkInput");
        var text = element.value;
        if(text.length !== 0){
            socketio.emit("message",{name:user.name, message:text});
            element.value="";
        }   
    };
    this.talkKeyPress = function(code){
        if(code == 13){
            talk();
        }
    };
    
//    $("#red").on("click",function(){
//        color = red;
//    });            
//    $("#blue").on("click",function(){
//        color = blue;
//    });            
//    $("#yellow").on("click",function(){
//        color = yellow;
//    }); 
//    $("#triangle").on("click",function(){
//        linestyle = "triangle";
//        console.log(linestyle);
//    });  
//
//    $("#eraser").on("click",function(){
//        color = "#FFF";
//        weight  = $("#bold").val();
//    });
//
//    $("#straight").on("click",function(){
//        if(i % 2 == 0){
//            $("#straight").text("普通線");
//            linestyle = "straight";
//            i++
//            console.log(linestyle)
//        }else if(i % 2 == 1){
//            $("#straight").text("直線");
//            linestyle = "normal";
//            i++
//        }
//    });
//
//
//    $("#color").change(function(){
//        color = $("#color").val();
//    });
//    $("#bold").change(function(){
//        weight  = $("#bold").val()/5;
//    });
//    $("#delete").on("click",function(){
//        context.clearRect(0,0,500,500);
//    });
//
//
//    $(can).on("mousedown",function(e){
//        if(linestyle =="normal" || linestyle == "triangle"){
//        on = true;
//        old_x = e.offsetX;
//        old_y = e.offsetY;
//        socketio.emit("mousedown",{id: user.id,ui:selectedUI,pointX: old_x,pointY: old_y});
//        }
//        else if(linestyle == "straight"){
//        on = true;
//        old_x = e.offsetX;
//        old_y = e.offsetY;
//        socketio.emit("mousedown",{id: user.id,ui:selectedUI,pointX: old_x,pointY: old_y});
//        prev_imagedata = context.getImageData(0,0,500,500)
//        }
//    });
//
//    $(can).on("mousemove",function(e){
//        if(linestyle =="normal"){
//            if(on ==true){
//                changed_x = e.offsetX;
//                changed_y = e.offsetY;
//                context.lineWidth = weight;
//                context.strokeStyle = color;
//                context.beginPath();
//                context.lineJoin="round";
//                context.lineCap="round";
//                context.moveTo(old_x,old_y);
//                context.lineTo(changed_x,changed_y);
//                context.stroke();
//                context.closePath(); 
//                old_x = changed_x;
//                old_y = changed_y;
//                socketio.emit("mousemove",{id:user.id,lineWidth:weight,strokeStyle: color, })
//            }
//        }else if(linestyle =="straight"){
//            if(on ==true){
//                context.putImageData(prev_imagedata,0,0)
//                changed_x = e.offsetX;
//                changed_y = e.offsetY;
//                context.lineWidth = weight;
//                context.strokeStyle = color;
//                context.beginPath();
//                context.lineJoin="round";
//                context.lineCap="round";
//                context.moveTo(old_x,old_y);
//                context.lineTo(changed_x,changed_y);
//                context.stroke();
//                context.closePath(); 
//            }
//        };
//    });
//
//    $(can).on("mouseup", function(e){
//         if(linestyle =="normal"){
//            on = false;
//         }else if(linestyle == "straight"){
//            if(on ==true){
//            changed_x = e.offsetX;
//            changed_y = e.offsetY;
//            context.lineWidth = weight;
//            context.strokeStyle = color;
//            context.beginPath();
//            context.lineJoin="round";
//            context.lineCap="round";
//            context.moveTo(old_x,old_y);                    
//            context.lineTo(changed_x,changed_y);
//            context.stroke();
//            context.closePath(); 
//            old_x = changed_x;
//            old_y = changed_y;
//            on = false;
//            }
//        }else if(linestyle == "triangle"){
//            context.fillStyle = color;
//            context.rect(old_x,old_y,weight,weight);
//            context.fill();
//        }
//    });
//    $(can).on("mouseout", function(e){
//        on = false;
//    });
//    
//    
//
//});