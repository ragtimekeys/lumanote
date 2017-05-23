/*******************************************************************************

	midi.js
	* contains the code for processing and displaying midi messages

  *******************************************************************************/

var sfAudioContext;
sfAudioContext = new AudioContext();

var globalPiano;


var keys = new Array(108);	//108 notes, 9 octave support
var keysString = "";

//make sure both of these numbers are updated when setting/changing keys
var keySig = "G";
var keySigNumber = 7;

//var keySig = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
var noteNamesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var noteNamesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

//contains all previously played melody notes
//chord.js has the same thing for chords
var melodyStack = [];

var entireScale;

var numActiveChordNotes = 0;
var numActiveMelodyNotes = 0;
var currentMelodyNote = null;

var wasNotePressed;
var activeNote;

// change split point
var change_split = false;

//remove div function
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}


//initalize all keys to null
initKeys();

function initKeys(){
	for (i=0; i<108; i++) {  //all notes are initially not pressed
		keys[i] = 128;  //not pressed notes have a fake "velocity" of 128
	}
}

function updateOnScreen() {
  var importantVariables ="";
	//this is just two simple looking pianos showing what note is being pressed and highlighted
  /*
	  keysString = "";
	  highlightedNotesString = "";
	  for (i=0; i<108; i++) {
		if (keys[i] == 128) {
		keysString += "---";
		} else {
		keysString += nameNote(i);
		}
		if (highlightedNotes[i] == 0) {
		highlightedNotesString += "-";
		} else {
		highlightedNotesString += "__" + nameNote(i) + ": " + highlightedNotes[i] + "__";
		}
		keysString += " ";
		highlightedNotesString += " ";
	  }
  */
	importantVariables +=
		"chordType: " + chordType
		+ " chordRootNote: " + chordRootNote
		+ " numActiveChordNotes: " + numActiveChordNotes
		+ " numActiveMelodyNotes: " + numActiveMelodyNotes
		+ " currentMelodyNote: " + currentMelodyNote
		+ " numHighlightedMelodyNotes: " + numHighlightedMelodyNotes
		+ " splitPoint: " + splitPoint
		+ " melodyStack[0]: " + melodyStack[0]
		+ " chordStack[0]: " + chordStack[0]
		+ " chordTypeStack[0]: " + chordTypeStack[0]
    + " chordSuggestions[0]: " + chordSuggestions[0]
    + " chordSuggestions[1]: " + chordSuggestions[1]
    + " chordSuggestions[2]: " + chordSuggestions[2];
	//document.getElementById("notes-pressed").innerHTML = keysString;
	//document.getElementById("highlighted-notes").innerHTML = highlightedNotesString;
	// document.getElementById("important-variables").innerHTML = importantVariables;
}

function handleMIDIMessage(event) {
	//event.data & event.receivedTime are populated
	//event.data has 3 components:
	//0) The device id
	//1) The controller id
	//2) The controller value (typically in the range 0 - 127)

	var device = event.data[0];
	activeNote = event.data[1];
	var activeNoteVelocity = event.data[2];

	if (event.data.length === 3) {
    //console.log("event.data = " + "[" + event.data[0] + "," + event.data[1] + "," + event.data[2] + "]");
    //console.log("event.receivedTime = " + event.receivedTime);
    //clearInterval(scaleTimer);
    //highlightEntireScale();
		if (device == 144 || device == 128) {
			//logText("device id:" + event.data[0]);
			if (keys[activeNote] == 128) {  //key was pressed
				wasNotePressed=true;
        keys[activeNote] = activeNoteVelocity;
				if(change_split){
					updateSplitPoint(activeNote);
				}

        // highlight the note that was pressed
				if (activeNote < splitPoint) {
					numActiveChordNotes++;
          // socket.emit('serialHighlight', "Pressed Chord Note", activeNote);
				} else {
					numActiveMelodyNotes++;
					currentMelodyNote = activeNote;
          /*
          if (entireScale == true) {
            console.log("ENTIRESCALE WAS TRUE");
            highlight(activeNote);
            unHighlightEntireScale();
          }
          */

          // socket.emit('serialHighlight', "Pressed Melody Note", activeNote);
					//releaseTimer being reset will continue allowing highlighting
					//releaseTimer.reset();
				}

				logText("keys[" + activeNote + "] " + nameNote(activeNote)
				        + " has been pressed, velocity of " + keys[activeNote]);
				//Do stuff with keypress here (includes velocity)
        scDelayHelper(activeNote);
				melodyStack.unshift(activeNote);

				if(nameNote(activeNote) == "C0"){
					logText("C was pressed!");
					for(var i = 0; i < 30; i++){
						highlightedNotes[activeNote+(i+1)] = 1+i;
					}
				}

				/* for highlighting the keyboard */
        //console.log("scrollKeyboard is called");
				scrollKeyboard(activeNote);
		    visual_play(activeNote);
        highlightKeyColor(activeNote);
        // socket.emit('piano message', activeNote);
        change_split = false;
        moveSplitPointClicked = false;
			}
      //key was released
      else if (keys[activeNote] != 128) {
				wasNotePressed = false;
				keys[activeNote] = 128;
				if (activeNote < splitPoint) {
					numActiveChordNotes--;
				} else {
					numActiveMelodyNotes--;
					if (numActiveMelodyNotes == 0) {
						currentMelodyNote = null;
					}
				}
				//if the melody note that was released is the last melody note being played
				if (activeNote >= splitPoint && activeNote == currentMelodyNote) {
					//releaseTimer will stop highlighting after ~400ms once started
					//releaseTimer.start();
				}
				logText("keys[" + activeNote + "] " + nameNote(activeNote)
				        + " has been released");
				//Do stuff with key release (does not include velocity)
        if (numActiveMelodyNotes == 0 && numActiveChordNotes == 0) {
          updateInstructions("");
        }
				/* for unhighlighting the keyboard LED */
        // socket.emit('serialHighlight', "Released Note", activeNote);
        clearNotes(activeNote);
        remove_visual_play(activeNote);
			}
			if (activeNote < splitPoint) {
				interpretChord(activeNote, wasNotePressed);
			}
			highlightNotes(activeNote,wasNotePressed);
		}
	}
	updateOnScreen();
}

function scaleify(noteNumber) {  //relative representation of note (scale degree)
	var scaledNote;
	var octave = Math.floor(noteNumber/12); //starts at 0
	var numWithinOctave = (noteNumber - octave * 12); //chromatic
	switch(keySig) { //make sure scaled note is between 0-11, and fix for keySig
	case "C": scaledNote = numWithinOctave; break;
	case "Db": scaledNote = numInOctave(numWithinOctave, 1); break;
	case "D": scaledNote = numInOctave(numWithinOctave, 2); break;
	case "Eb": scaledNote = numInOctave(numWithinOctave, 3); break;
	case "E": scaledNote = numInOctave(numWithinOctave, 4); break;
	case "F": scaledNote = numInOctave(numWithinOctave, 5); break;
	case "F#": scaledNote = numInOctave(numWithinOctave, 6); break;
	case "G": scaledNote = numInOctave(numWithinOctave, 7); break;
	case "Ab": scaledNote = numInOctave(numWithinOctave, 8); break;
	case "A": scaledNote = numInOctave(numWithinOctave, 9); break;
	case "Bb": scaledNote = numInOctave(numWithinOctave, 10); break;
	case "B": scaledNote = numInOctave(numWithinOctave, 11); break;
	default:
		//console.log("invalid or no key specified for variable keySig");
	}
	return (scaledNote);
}

function numInOctave(numWithinOctave, x){
	if (numWithinOctave < x) {
		return numWithinOctave + (12-x);
	} else {
		return numWithinOctave - x;
	}
}

function nameNote(noteNumber) {  //absolute representation of note (note letter)
	var octave = Math.floor(noteNumber/12); //starts at 0
	var numWithinOctave = (noteNumber - octave * 12); //chromatic
	octave--;
	switch(keySig) {
  	case "C": return(noteNamesFlat[numWithinOctave]+octave);
  	case "Db": return(noteNamesFlat[numWithinOctave]+octave);
  	case "D": return(noteNamesSharp[numWithinOctave]+octave);
  	case "Eb": return(noteNamesFlat[numWithinOctave]+octave);
  	case "E": return(noteNamesSharp[numWithinOctave]+octave);
  	case "F": return(noteNamesFlat[numWithinOctave]+octave);
  	case "F#": return(noteNamesSharp[numWithinOctave]+octave);
  	case "G": return(noteNamesSharp[numWithinOctave]+octave);
  	case "Ab": return(noteNamesFlat[numWithinOctave]+octave);
  	case "A": return(noteNamesSharp[numWithinOctave]+octave);
  	case "Bb": return(noteNamesFlat[numWithinOctave]+octave);
  	case "B": return(noteNamesSharp[numWithinOctave]+octave);
	}
}

function nameChordNoteNumber(noteName) {
  switch(noteName) {
  case "C":
  case "Cm":
    return 0;
  case "Db":
  case "Dbm":
  case "C#":
  case "C#m":
    return 1;
  case "D":
  case "Dm":
    return 2;
  case "Eb":
  case "Ebm":
  case "D#":
  case "D#m":
    return 3;
  case "E":
  case "Em":
    return 4;
  case "F":
  case "Fm":
    return 5;
  case "Gb":
  case "Gbm":
  case "F#":
  case "F#m":
    return 6;
  case "G":
  case "Gm":
    return 7;
  case "Ab":
  case "Abm":
  case "G#":
  case "G#m":
    return 8;
  case "A":
  case "Am":
    return 9;
  case "Bb":
  case "Bbm":
  case "A#":
  case "A#m":
    return 10;
  case "B":
  case "Bm":
    return 11;
  default:
    console.log("problem occured, the chord passed into the function is " + noteName);
    return 0;
    break;
  }
}

function loopAroundArray (getArray, getFromArray) {
  console.log("getFromArray: " + getFromArray);
  var notePlusKs = getFromArray + keySigNumber;
  console.log("notePlusKs: " + notePlusKs);
  if (notePlusKs < getArray.length) {
    return notePlusKs;
  } else {
    return notePlusKs - getArray.length;
  }
}

function nameChordNoteName(chordNumberfd) {
  var chordScaleRepresentation;
  switch (chordNumberfd) {
  case 1:
    chordScaleRepresentation = 0;
    break;
  case 2:
    chordScaleRepresentation = 2;
    break;
  case 3:
    chordScaleRepresentation = 4;
    break;
  case 4:
    chordScaleRepresentation = 5;
    break;
  case 5:
    chordScaleRepresentation = 7;
    break;
  case 6:
    chordScaleRepresentation = 9;
    break;
  default:
    console.log("invalid chord passed in");
    break;
  }


  switch (chordNumberfd) {
  case 1:
  case 4:
  case 5:
    if (keySigNumber == 0
        || keySigNumber == 2
        || keySigNumber == 4
        || keySigNumber == 6
        || keySigNumber == 7
        || keySigNumber == 9
        || keySigNumber == 11) {
      return noteNamesSharp[loopAroundArray(noteNamesSharp,chordScaleRepresentation)];
    } else {
      return noteNamesFlat[loopAroundArray(noteNamesSharp,chordScaleRepresentation)];
    }
  case 2:
  case 3:
  case 6:
    if (keySigNumber == 0
        || keySigNumber == 2
        || keySigNumber == 4
        || keySigNumber == 6
        || keySigNumber == 7
        || keySigNumber == 9
        || keySigNumber == 11) {
      return noteNamesSharp[loopAroundArray(noteNamesSharp,chordScaleRepresentation)] + "m";
    } else {
      return noteNamesFlat[loopAroundArray(noteNamesSharp,chordScaleRepresentation)] + "m";
    }
  }
}



function updateSplitPoint(an) {
  console.log("updateSplitPoint was called");
  // Remove current split point from the screen
  var node = document.getElementById("split-point").remove();
  var viz_split = document.getElementById("viz-note-" + splitPoint);
  viz_split.style.borderLeft = "";
  if (an != 107) {
    console.log("Changing split point to: " + an);
    splitPoint = an;
  }
	// Change local storage split point
	split_point = splitPoint;
	if (typeof(Storage) !== "undefined" && splitPoint != 107){
		localStorage.setItem("split-point", split_point);
		//console.log("set item: (split-point," + split_point + ")");
	}
	else{
		// console.log("No Web Storage support");
  }
  if (document.getElementById("split-point") != null) {
    var splitPointElement = document.getElementById("split-point");
    splitPointElement.style.visibility = 'hidden';
  }
  // Change the split point on the keyboard LED's
  socket.emit('serialHighlight', "Split Point Note", an);

  // Add new split point to the screen
	var add_node = document.getElementById("key_" + splitPoint);
  // //console.log("node");
  //console.log(add_node);
	var ele = document.createElement("div");
	ele.id = "split-point";
	ele.innerHTML = "SP";
  if (add_node.classList.contains("black-key")) {
    //console.log("HERE black-key");
    ele.style.right = "0%";
  }
  else {
    //console.log("HERE white-key");
    ele.right = "";
  }
  add_node.parentNode.insertBefore(ele, add_node.nextSibling);

  if (an != 107) {
    var viz_split = document.getElementById("viz-note-" + splitPoint);
    viz_split.style.borderLeft = "3px solid green";
  } else {
    document.getElementById("split-point").style.visibility = 'hidden';
  }

  // stop button pulsing
  $(document.getElementById("SplitPointButton")).removeClass("greenPulse").css("background-color", "hsl(0, 0%, 15%)");
	// change_split = false;
  //this is really lazy coding. fix this eventually.  all it's doing
  //is hiding the element
}
