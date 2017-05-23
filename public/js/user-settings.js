var setup = false;
var midi_controller = "";
var plays_piano = "";
var key_sig = "";
var scale_mode = "";
var genre = "";
var level = "";
var split_point = "";
var stored_instrument = "";
var hardware_option = "";

function load_settings(){
  // get midi controller that was used
  midi_controller = localStorage.getItem("midi-controller");
  //console.log("using midi controller... " + midi_controller);

  plays_piano = localStorage.getItem("plays-piano");
  //console.log("play the piano? " + plays_piano);

  key_sig = localStorage.getItem("key-sig");
  //console.log("previous key signature used... " + key_sig);

  scale_mode = localStorage.getItem("scale-mode");
  //console.log("previous scale mode used... " + scale_mode);

  genre = localStorage.getItem("genre");
  //console.log("previous genre used... " + genre);

  level = localStorage.getItem("level");
  //console.log("previous level used... " + level);

  split_point = localStorage.getItem("split-point");
  //console.log("previous split point used... " + split_point);

  stored_instrument = localStorage.getItem("instrument");
  //console.log("previous instrument used... " + stored_instrument);

  hardware_option = localStorage.getItem("hardware");
  //console.log("Are they using hardware... " + hardware_option);
}



/*******************************************************
 *                 CHECKING LOCAL STORAGE               *
 ********************************************************/
//Check settings that exist in local storage. If no settings show setup
window.onload = function() {
  console.log("From user-settings.js!!");

  // check if local storage is allowed or supported
  if (typeof(Storage) === "undefined") {
    //console.log("No Web Storage support or it might not be allowed :( ");
  }
  else{
    // check if they have been to the site before.
    //console.log(localStorage);
    if(localStorage.length > 0){
      //console.log("Welcome back! You don't have to go through our setup!");
      load_settings();
    }
    else{
      setup = true;
      console.log("Showing setup pages...");
    }
  }
};



/*******************************************************
 *             EVENT LISTENER: INSTRUMENTS              *
 ********************************************************/
// remember stored instrument if any. else just use the good ol' acoustic grand piano
if (localStorage.getItem("instrument") != null) {
  if (localStorage.getItem("instrument") == "mute") {
    // Do nothing
  }
  var instrument = localStorage.getItem("instrument");
  //console.log("Previously used " + instrument + " instrument");
  Soundfont.instrument(ac, instrument, { soundfont: 'MusyngKite' }).then(function (clavinet) {
    window.navigator.requestMIDIAccess().then(function(midiAccess){
      midiSound = midiAccess;
      midiSound.inputs.forEach(function (midiInput){
        clavinet.listenToMidi(midiInput)
      })
    })
  })
}
else {
  Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' }).then(function (clavinet) {
    window.navigator.requestMIDIAccess().then(function(midiAccess){
      midiSound = midiAccess;
      midiSound.inputs.forEach(function (midiInput){
        clavinet.listenToMidi(midiInput)
      })
    })
  })
}

document.getElementById("key").addEventListener("click",function(e) {
  // e.target is our targetted element.
  // try doing //console.log(e.target.nodeName), it will result LI
  if(e.target && e.target.nodeName == "LI") {
    //console.log(e.target.innerHTML + " was clicked");
    // creates the sound
    var instrument = e.target.innerHTML;
    instrument = instrument.replace(/\s+/g, '_').toLowerCase();
    stored_instrument = instrument;
    //console.log(instrument);
    Soundfont.instrument(ac, instrument, { soundfont: 'MusyngKite' }).then(function (sound) {
      midiSound.inputs.forEach(function (midiInput){
        sound.listenToMidi(midiInput);
      });
    });
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("instrument", stored_instrument);
      //console.log("set item: (instrument," + stored_instrument + ")");
    }
    else {
      //console.log("No Web Storage support");
    }
  }
});

document.getElementById("window-contents-popular").addEventListener("click",function(e) {
  // e.target is our targetted element.
  // try doing //console.log(e.target.nodeName), it will result LI
  console.log("clicked itemmteimetimetIMTEIMETIMETIMETIMETIMET");
  if(e.target && e.target.nodeName == "LI") {
    //console.log(e.target.innerHTML + " was clicked");
    // creates the sound
    var instrument = e.target.innerHTML;
    if (instrument == "Mute") {
      // No sound
    }
    instrument = instrument.replace(/\s+/g, '_');
    stored_instrument = instrument.toLowerCase();
    //console.log(instrument);
    Soundfont.instrument(ac, instrument.toLowerCase(), { soundfont: 'MusyngKite' }).then(function (sound) {
      midiSound.inputs.forEach(function (midiInput){
        sound.listenToMidi(midiInput)
      })
    })
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("instrument", stored_instrument);
      //console.log("set item: (instrument," + stored_instrument + ")");
    }
    else {
      //console.log("No Web Storage support");
    }
  }
});


/*******************************************************
 *             EVENT LISTENER: CHANGE IN KEY            *
 ********************************************************/
document.getElementById("keyDropdown").addEventListener("click",function(e) {
  // e.target is our targetted element.
  // try doing //console.log(e.target.nodeName), it will result LI
  if(e.target && e.target.nodeName == "LI") {
    //console.log(e.target.innerHTML + " was clicked");
    // creates the sound
    var keysig = e.target.innerHTML;
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("key-sig", keysig);
      //console.log("set item: (key-sig," + keysig + ")");
    }
    else {
      //console.log("No Web Storage support");
    }
  }
});


/*******************************************************
 *             EVENT LISTENER: CHANGE IN SCALE          *
 ********************************************************/
document.getElementById("scale-mode").addEventListener("click",function(e) {
  // e.target is our targetted element.
  // try doing //console.log(e.target.nodeName), it will result LI
  if(e.target && e.target.nodeName == "LI") {
    //console.log(e.target.innerHTML + " was clicked");
    // creates the sound
    var scale = e.target.innerHTML;
    if (typeof(Storage) !== "undefined"){
      localStorage.setItem("scale-mode", scale);
      //console.log("set item: (scale-mode," + scale + ")");
    }
    else{
      //console.log("No Web Storage support");
    }
  }
});
