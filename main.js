var status="";
object=[];
var song="";

function preload(){
  song= loadSound('alarm.mp3');
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    object_detector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
}

function modelLoaded(){
  console.log("Model Loaded");
  status= true;
}

function gotResults(error,result){
   if(error){
     console.error(error);
   }
   else{
     console.log(result);
     object= result;
   }
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
      object_detector.detect(video, gotResults);
      for(i=0; i<object.length; i++){
       document.getElementById("status").innerHTML= "Status: Object Detected";
       fill("#fff");
       percent= floor(object[i].confidence*100);
       text(object[i].label+" "+percent+"%",object[i].x+20,object[i].y+20);
       noFill();
       stroke("#fff");
       rect(object[i].x,object[i].y,object[i].width,object[i].height);
       if(object[i].label == "person"){
       document.getElementById("object_found").innerHTML="Baby found";
       song.stop();
    }
    else{
      document.getElementById("object_found").innerHTML="Baby not found";
      song.play();
    }
      }
      if(object.length==0){
        document.getElementById("object_found").innerHTML="Baby not found";
        song.play();
      }
    }
    
}