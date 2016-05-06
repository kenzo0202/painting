$(document).ready(function(){
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


    $("#red").on("click",function(){
        color = red;
    });            
    $("#blue").on("click",function(){
        color = blue;
    });            
    $("#yellow").on("click",function(){
        color = yellow;
    }); 
    $("#triangle").on("click",function(){
        linestyle = "triangle";
        console.log(linestyle);
    });  

    $("#eraser").on("click",function(){
        color = "#FFF";
        weight  = $("#bold").val();
    });

    $("#straight").on("click",function(){
        if(i % 2 == 0){
            $("#straight").text("普通線");
            linestyle = "straight";
            i++
            console.log(linestyle)
        }else if(i % 2 == 1){
            $("#straight").text("直線");
            linestyle = "normal";
            i++
        }
    });


    $("#color").change(function(){
        color = $("#color").val();
    });
    $("#bold").change(function(){
        weight  = $("#bold").val()/5;
    });
    $("#delete").on("click",function(){
        context.clearRect(0,0,500,500);
    });


    $(can).on("mousedown",function(e){
        if(linestyle =="normal" || linestyle == "triangle"){
        on = true;
        old_x = e.offsetX;
        old_y = e.offsetY;
        console.log(old_x)
        }
        else if(linestyle == "straight"){
        on = true;
        old_x = e.offsetX;
        old_y = e.offsetY;
        prev_imagedata = context.getImageData(0,0,500,500)
        }
    });

    $(can).on("mousemove",function(e){
        if(linestyle =="normal"){
            if(on ==true){
                changed_x = e.offsetX;
                changed_y = e.offsetY;
                context.lineWidth = weight;
                context.strokeStyle = color;
                context.beginPath();
                context.lineJoin="round";
                context.lineCap="round";
                context.moveTo(old_x,old_y);
                context.lineTo(changed_x,changed_y);
                context.stroke();
                context.closePath(); 
                old_x = changed_x;
                old_y = changed_y;
            }
        }else if(linestyle =="straight"){
            if(on ==true){
                context.putImageData(prev_imagedata,0,0)
                changed_x = e.offsetX;
                changed_y = e.offsetY;
                context.lineWidth = weight;
                context.strokeStyle = color;
                context.beginPath();
                context.lineJoin="round";
                context.lineCap="round";
                context.moveTo(old_x,old_y);
                context.lineTo(changed_x,changed_y);
                context.stroke();
                context.closePath(); 
            }
        };
    });

    $(can).on("mouseup", function(e){
         if(linestyle =="normal"){
            on = false;
         }else if(linestyle == "straight"){
            if(on ==true){
            changed_x = e.offsetX;
            changed_y = e.offsetY;
            context.lineWidth = weight;
            context.strokeStyle = color;
            context.beginPath();
            context.lineJoin="round";
            context.lineCap="round";
            context.moveTo(old_x,old_y);                    
            context.lineTo(changed_x,changed_y);
            context.stroke();
            context.closePath(); 
            old_x = changed_x;
            old_y = changed_y;
            on = false;
            }
        }else if(linestyle == "triangle"){
            context.fillStyle = color;
            context.rect(old_x,old_y,weight,weight);
            context.fill();
        }
    });
    $(can).on("mouseout", function(e){
        on = false;
    });
    
    

});