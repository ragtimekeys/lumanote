/*******************************************************************************

	controller.js
	* contains the code related to communication with a MIDI Controller

*******************************************************************************/

var log = document.getElementById("midi-log");
var midi;
var midiSound;
var isChrome = !!window.chrome && !!window.chrome.webstore;

init(); // start the midi controllers

// requests midi access and initalizes controller
function init() {
  logText("Starting up the MIDI");
  if (isChrome == true) {
    navigator.requestMIDIAccess().then(onSuccess, onFailure); //get midi access
  } else {
    logText("Attempting to use jazz plugin...");
    document.getElementById ('jazz-div').innerHTML = '<object id="Jazz1" classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90" class="hidden"><object id="Jazz2" type="audio/x-jazz" class="hidden">';
    logText("Jam out to some notes yo");
    logText(" ");

    //----------------------------------------------------------------------------
    var Jazz;
    var active_element;
    var current_in;
    var msg;
    var sel;

    //// Callback function
    function midiProc(t,a,b,c){
     //msg.innerHTML=msg.innerHTML+midiString(a,b,c)+"<br>";
     var message = {}
     message.data = [a,b,c];
     onMIDIMessage(message);
    }

    //// Listbox
    function changeMidi(){
     try{
      if(sel.selectedIndex){
       current_in=Jazz.MidiInOpen(sel.options[sel.selectedIndex].value,midiProc);
      } else {
       Jazz.MidiInClose(); current_in='';
      }
      for(var i=0;i<sel.length;i++){
       if(sel[i].value==current_in) sel[i].selected=1;
      }
     }
     catch(err){}
    }

    //// Connect/disconnect
    function connectMidiIn(){
     try{
      var str=Jazz.MidiInOpen(current_in,midiProc);
      for(var i=0;i<sel.length;i++){
       if(sel[i].value==str) sel[i].selected=1;
      }
     }
     catch(err){}
    }
    function disconnectMidiIn(){
     try{
      Jazz.MidiInClose(); sel[0].selected=1;
     }
     catch(err){}
    }
    function onFocusIE(){
     active_element=document.activeElement;
     connectMidiIn();
    }
    function onBlurIE(){
     if(active_element!=document.activeElement){ active_element=document.activeElement; return;}
     disconnectMidiIn();
    }

    //// Initialize
    Jazz=document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
    msg=document.getElementById("msg");
    sel=document.getElementById("midiIn");
    try{
     current_in=Jazz.MidiInOpen(0,midiProc);
     var list=Jazz.MidiInList();
     for(var i in list){
      sel[sel.options.length]=new Option(list[i],list[i],list[i]==current_in,list[i]==current_in);
     }
    }
    catch(err){}

    if(navigator.appName=='Microsoft Internet Explorer'){ document.onfocusin=onFocusIE; document.onfocusout=onBlurIE;}
    else{ window.onfocus=connectMidiIn; window.onblur=disconnectMidiIn;}

    //----------------------------------------------------------------------------
  }

}


// get midi access and set event listener
function onSuccess(access){

  midi = access;
  //console.log("HERE................" );
  console.log(midi);
  var myinputs = midi.inputs;
  logText("Found " + myinputs.size + " MIDI input(s)");
  var inputs = midi.inputs.values();
  var deviceDropdown = document.getElementById("devices-dropdown");
  for (var input = inputs.next();
    input && !input.done;
    input = inputs.next()) {
    console.log("INPUT: ");
    console.log(input);
    console.log("Name: " + input.value.name + " - " + input.value.manufacturer)
    var item = "<li>" + input.value.name + " - " + input.value.manufacturer + "</li>";
    deviceDropdown.innerHTML += item;
    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = onMIDIMessage;
  }
  /*
  // loop through all devices if midi detected
  if(myinputs.size > 0) {
    var inputs = myinputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
       // each time there is a midi message call the onMIDIMessage function
       logText("Connected first input: " + input.name);
       logText("Jam out to some notes yo");
       logText(" ");
       input.value.onmidimessage = onMIDIMessage;
     }
  }
  */
}

// log failure of co
function onFailure(err){
  logText("MIDI Init Error. Error code: " + err.code);
  console.log("MIDI Init Error. Error code: " + err.code);
}

// play or stop the note
function onMIDIMessage(message){
  //console.log(message);
  var frequency = midiNoteToFrequency(message.data[1]);
  if (message.data[0] === 144 && message.data[2] > 0) {
      //playNote(frequency);
      handleMIDIMessage(message);
  }
  if (message.data[0] === 128 || message.data[2] === 0) {
      //stopNote(frequency);
      handleMIDIMessage(message);
  }
}

// logs the text on the screen
function logText(str){
  // console.log(str);
  //log.innerHTML += str;
  //log.innerHTML += "<br>";
  //log.scrollTop = log.scrollHeight;
}
