var lastInstruction;

function displaySing(){
  document.getElementById("sing").style.display = "block";
  toggleLiveInput();
  areYouSinging = true;
  updateInstructions("Singing mode active. Sing a note to get chord suggestions");
  // var singTimer = window.setInterval(function() {getSingingNoteAndSuggestChords();},300);
}
function hideSing(){
  // console.log("YOOOO HIDESING WAS CALLED");
  areYouSinging = false;
  updateInstructions("Singing mode disabled");
  delayedHideInstructions();
  document.getElementById("sing").style.display = "none";
  toggleLiveInput();
  // clearInterval(singTimer);
  // console.log("hideSing was called");
  currentMelodyNote = notesSungStack[0];
  unhighlightChordSuggestions();
  setMode("Freestyle");
  setTimeout(function() { setMode("Composition"); highlight(); },300);
}
// updates the instruction box
function updateInstructions(myText){
  var myInstructions = document.getElementById("instructions");
  if(myInstructions != null){
    if(myText == ""){
      myInstructions.style.display = "none";
    } else {
      myInstructions.style.display = "block";
      myInstructions.innerHTML = '<p>'+myText+'</p>';
    }
  }
}

function delayedHideInstructions() {
  lastInstruction = document.getElementById("instructions").innerHTML;
  setTimeout(function() {
    if (document.getElementById("instructions").innerHTML == lastInstruction) {
      updateInstructions("");
    }
    else {
      //do nothing
    }
  },1100);
}

function show(){
  //var mydisplay = document.getElementById("sing").style.display;
  /*
    if(mydisplay == 'block'){
    document.getElementById("sing").style.display = "none";
    } else {
    document.getElementById("sing").style.display = "block";
    }*/

}
