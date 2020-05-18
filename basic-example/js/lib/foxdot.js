// ------------------------------------------------------------------------------------
// OSC
// ------------------------------------------------------------------------------------


function setupOsc(oscPortIn, oscPortOut) {

  var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });

  socket.on('connect', function() {
    socket.emit('config', {	
      server: { port: oscPortIn,  host: '127.0.0.1'},
      client: { port: oscPortOut, host: '127.0.0.1'}
    });
  });

  socket.on('message', function(msg) {
    if (msg[0] == '#bundle') {
      for (var i=2; i<msg.length; i++) {receiveOsc(msg[i][0], msg[i].splice(1));}
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });

}


function sendOsc(address, value){socket.emit('message', [address].concat(value))};


function receiveOsc(address, value) {

  if (address == '/s_new') {
    if(f.sd[value[0]]!= undefined){
      for(i = 4; i < 110; i = i+2){f.sd[value[0]][value[i]]=value[i+1];}	
    }
  }else{
    //console.log(address + " : "+ value);
  }

}


// ------------------------------------------------------------------------------------
// FOXDOT
// ------------------------------------------------------------------------------------


class FoxDot{

  constructor(){

    this.sdNames = [
      "loop", "stretch", "play1", "play2", "audioin", 
      "noise", "dab", "varsaw", "lazer", "growl", 
      "bass", "dirt", "crunch", "rave", "scatter", 
      "charm", "bell", "gong", "soprano", "dub", 
      "viola", "scratch", "klank", "feel", "glass", 
      "soft", "quin", "pluck", "spark", "blip", 
      "ripple", "creep", "orient", "zap", "marimba", 
      "fuzz", "bug", "pulse", "saw", "snick", 
      "twang", "karp", "arpy", "nylon", "donk", 
      "squish", "swell", "razz", "sitar", "star", 
      "jbass", "sawbass", "prophet", "pads", "pasha", 
      "ambi", "space", "keys", "dbass", "sinepad"	
    ];

    this.sdAttributes = [
      "bus", "freq", "delay", "buf", 
      "sample", "fmod", "pan", "rate", "midinote", 
      "channel", "vib", "vibdepth", "slide", "slidedelay", 
      "slidefrom", "glide", "glidedelay", "bend", "benddelay", 
      "course", "striate", "pshift", "hpf", "hpr", 
      "lpf", "lpr", "swell", "bpf", "bpr", 
      "bpnoise", "chop", "tremolo", "beat_dur", "echo", 
      "echotime", "spin", "cut", "room", "mix", 
      "formant", "shape", "drive", "sus", "blur", 
      "amp", "amplify", "dur", "oct", "atk", 
      "decay", "rel", "root"
    ];

    this.sd = {};

    for(var i = 0; i < this.sdNames.length; i++){
      this.sd[this.sdNames[i]] = {};	
      for(var j = 0; j < this.sdAttributes.length; j++){this.sd[this.sdNames[i]][this.sdAttributes[j]]=0;}
    }

    //console.log("foxdot synthDefs created");
  }

}


