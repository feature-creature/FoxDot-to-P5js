let w = 600;
let h = 600;
var pause = false;

//foxdot data
var f;

function setup() {
  var canvas = createCanvas(w,h);
  canvas.mousePressed(pauseSketch);
  frameRate(30);
  background(255);
  noFill();
  
  // FoxDot --> OSC --> P5js
  setupOsc(12345, 3334);
  f = new FoxDot;
}


function draw() {
  background(255);
  //backgroundGhosting();

  drawBass();
  drawGrowl();
}


function drawGrowl(){
  var xGrowl = 6;
  var yGrowl = 6;

  for(var i = 0; i < xGrowl; i++){
    for(var j = 0; j < yGrowl; j++){
      push();
      fill(255,170);
      //fill(25,255,0,170);
      stroke(255,0,0);
      //stroke(0,255,0,0);
      ellipse((w/xGrowl)*(i+0.5),(w/yGrowl)*(j+0.5),f.sd.growl.midinote,f.sd.growl.midinote);
      pop();   
    }
  } 
}


function drawBass(){
  push();
    translate(width/2,height/2);
    noStroke(); 
    fill(20,55);
    ellipse(
      map(noise(frameCount/50),0,1,-15-f.sd.space.midinote,15+f.sd.space.midinote),
      map( noise(frameCount/5),0,1,-15-f.sd.space.midinote,15+f.sd.space.midinote), 
      map(f.sd.jbass.freq,0,2000,50,w*3),  
      map(f.sd.jbass.freq,0,2000,50,h*3));
  pop();
}


function backgroundGhosting(){
  if(frameCount % 2 == 0){
    push();
    noStroke();
    fill(255,115);
    rect(0,0,w,h);
    pop();
  }
}


pauseSketch = function(){
  pause = pause ? false : true;
  pause?noLoop():loop();
}
