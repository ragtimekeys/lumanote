//highlight.js

//File that contains all functions pertaining to music theory highlighting logic



//this is the ultimate array that contains all currently highlited notes and their colors
var highlightedNotes = new Array(108);
var previouslyHighlightedNotes = new Array(108);
for (i=0; i<108; i++) {  //all notes are initially not highlighted
	highlightedNotes[i] = 0;  //not highlighted notes are 0
	previouslyHighlightedNotes[i] = 0;
}

var scBool = false;

var chordRootNoteSuggestions = new Array(0);

var lastActiveNote;

var howToPlayChordNotes = new Array(0);

var areYouSinging = false;


/*chord suggestions array
  1: I major
  2: ii minor
  3: iii minor
  4: IV major
  5: V major
  6: vi minor

  There will be more added to this, but they will be the out of scale chords
*/
var chordSuggestions = new Array(15);
for (i=0; i<15; i++) {
	chordSuggestions[i] = 0;
}

var highlightedNotesString = "";
var unhighlightDelay;

function highlightNotes(an, wnp) {
  if (my_mode == "Chords" && numActiveChordNotes == 0) {
    clearCircleColors();
  }
  if (my_mode == "Composition") {
    //HighlightEntireScale();
    //console.log("highlightNotes was called");
    updateOnScreen();
    scLogic();
    if (areYouSinging == true) {
      return;
    }
    if (numActiveChordNotes == 0 && wnp == true && an >= splitPoint) {
      lastActiveNote = currentMelodyNote;
      setTimeout(function () {suggestChords();},300);
      //suggestChords();
    } else if (wnp == false && an >= splitPoint) {
      unhighlightMelodySuggestions();
    } else {
      scLogic();
    }
	  switch (chordType) {
		  //if no chord is being pressed
	  case 0:

      break;

		  //if a chord is being pressed
	  default:
		  //last chord being pressed
      if (numActiveMelodyNotes > 0 && numActiveChordNotes > 1) {
        updateInstructions("Melody writing mode active");
      }
      
		  switch (chordStack[0]) {
			  //
			  //THE ONE CHORD
			  //
		  case 0:
			  unhighlightMelodySuggestions();
        scLogic();
			  switch(scaleify(currentMelodyNote)) {
				  //if melody note was root note of the scale
			  case 0:
				  highlight(currentMelodyNote+2, 21);
				  melodyHighlight(currentMelodyNote+4, 1);
				  melodyHighlight(currentMelodyNote+5, 8);
          melodyHighlight(currentMelodyNote+7, 3);
				  melodyHighlight(currentMelodyNote-1, 6);
				  melodyHighlight(currentMelodyNote-5, 1);
				  melodyHighlight(currentMelodyNote-5, 4);
				  break;
        case 1:
          melodyHighlight(currentMelodyNote,26);
          break;
			  case 2:
				  melodyHighlight(currentMelodyNote+2, 1);
				  melodyHighlight(currentMelodyNote-2, 1);
				  break;
        case 3:
          melodyHighlight(currentMelodyNote,16);
          melodyHighlight(currentMelodyNote+1,1);
          break;
			  case 4:
				  melodyHighlight(currentMelodyNote+1, 6);
				  melodyHighlight(currentMelodyNote+3, 1);
				  melodyHighlight(currentMelodyNote-2, 21);
				  melodyHighlight(currentMelodyNote-4, 1);
          melodyHighlight(currentMelodyNote-9, 5);
				  break;
			  case 5:
				  melodyHighlight(currentMelodyNote+2, 1);
				  melodyHighlight(currentMelodyNote-1, 1);
				  break;
			  case 6:
			    melodyHighlight(currentMelodyNote,16);
			    melodyHighlight(currentMelodyNote+1,1);
			    break;
			  case 7:
				  melodyHighlight(currentMelodyNote+2, 21);
				  melodyHighlight(currentMelodyNote+5, 2);
				  melodyHighlight(currentMelodyNote+4, 9);
          melodyHighlight(currentMelodyNote+9, 5);
				  melodyHighlight(currentMelodyNote-2, 7);
				  melodyHighlight(currentMelodyNote-3, 1);
				  melodyHighlight(currentMelodyNote-5, 24);
				  break;
			  case 8:
			    melodyHighlight(currentMelodyNote,16);
			    melodyHighlight(currentMelodyNote+1,11);
			    melodyHighlight(currentMelodyNote-1,1);
			    break;
			  case 9:
				  melodyHighlight(currentMelodyNote+2, 6);
				  melodyHighlight(currentMelodyNote-2, 1);
				  melodyHighlight(currentMelodyNote-4, 10);
				  break;
			  case 10:
			    melodyHighlight(currentMelodyNote,16);
			    melodyHighlight(currentMelodyNote+2,1);
			    melodyHighlight(currentMelodyNote-1,1); 	//WHAT TO DO WITH THIS IDK
			    break;
			  case 11:
				  melodyHighlight(currentMelodyNote+1, 1);
				  melodyHighlight(currentMelodyNote+3, 24);
				  melodyHighlight(currentMelodyNote-2, 21);
				  melodyHighlight(currentMelodyNote-4, 4);
				  break;
			  }
			  break;
		  case 1:
        unhighlightMelodySuggestions();
			  break;
		    //
		    //THE TWO CHORD
		    //
		  case 2:
			  unhighlightMelodySuggestions();
			  switch(scaleify(currentMelodyNote)) {
			  case 0:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote+4,7);
				  melodyHighlight(currentMelodyNote+5+1);
				  melodyHighlight(currentMelodyNote+7,12);
				  melodyHighlight(currentMelodyNote+9,3);
				  melodyHighlight(currentMelodyNote-1,21);
				  melodyHighlight(currentMelodyNote-3,3);
				  melodyHighlight(currentMelodyNote-5,14);
				  melodyHighlight(currentMelodyNote-7,4);
				  break;
			  case 1:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 2:
				  melodyHighlight(currentMelodyNote+2,6);
				  melodyHighlight(currentMelodyNote+3,1);
				  melodyHighlight(currentMelodyNote+5,12);
				  melodyHighlight(currentMelodyNote+7,3);
				  melodyHighlight(currentMelodyNote-2,11);
				  melodyHighlight(currentMelodyNote-5,2);
				  melodyHighlight(currentMelodyNote-9,3);
				  break;
			  case 3:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 4:
				  melodyHighlight(currentMelodyNote+1,1);
				  melodyHighlight(currentMelodyNote+3,11);
				  melodyHighlight(currentMelodyNote+5,4);
				  melodyHighlight(currentMelodyNote-2,1);
				  melodyHighlight(currentMelodyNote-4,13);
				  melodyHighlight(currentMelodyNote-7,4);
				  break;
			  case 5:
				  melodyHighlight(currentMelodyNote+2,21);
				  melodyHighlight(currentMelodyNote+4,2);
				  melodyHighlight(currentMelodyNote+7,13);
				  melodyHighlight(currentMelodyNote+9,4);
				  melodyHighlight(currentMelodyNote-1,6);
				  melodyHighlight(currentMelodyNote-3,1);
				  melodyHighlight(currentMelodyNote-5,13);
				  melodyHighlight(currentMelodyNote-8,3);
				  break;
			  case 6:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 7:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote+5,4);
				  melodyHighlight(currentMelodyNote-2,1);
				  melodyHighlight(currentMelodyNote-3,9);
				  break;
			  case 8:
				  melodyHighlight(currentMelodyNote,16);
				  melodyHighlight(currentMelodyNote+1,1);
				  break;
			  case 9:
				  melodyHighlight(currentMelodyNote+2,21);
				  melodyHighlight(currentMelodyNote+3,11);
				  melodyHighlight(currentMelodyNote+5,2);
				  melodyHighlight(currentMelodyNote+8,2);
				  melodyHighlight(currentMelodyNote-2,21);
				  melodyHighlight(currentMelodyNote-4,2);
				  melodyHighlight(currentMelodyNote-7,4);
				  break;
			  case 10:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 11:
				  melodyHighlight(currentMelodyNote+1,11);
				  melodyHighlight(currentMelodyNote+3,4);
				  melodyHighlight(currentMelodyNote-2,1);
				  melodyHighlight(currentMelodyNote-4,15);
				  break;
			  }
			  break;
      case 3:

        break;
		    //
		    //THE THREE CHORD
		    //
      case 4:
			  unhighlightMelodySuggestions();
			  switch(scaleify(currentMelodyNote)) {
			  case 0:
				  melodyHighlight(currentMelodyNote+2,21);
				  melodyHighlight(currentMelodyNote-1,1);
				  break;
			  case 1:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 2:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote+5,2);
				  melodyHighlight(currentMelodyNote-2,6);
				  melodyHighlight(currentMelodyNote-3,2);
				  melodyHighlight(currentMelodyNote-7,4);
				  break;
			  case 3:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 4:
				  melodyHighlight(currentMelodyNote+1,6);
				  melodyHighlight(currentMelodyNote+3,1);
				  melodyHighlight(currentMelodyNote+7,3);
				  melodyHighlight(currentMelodyNote-2,21);
				  melodyHighlight(currentMelodyNote-5,3);
				  melodyHighlight(currentMelodyNote-9,4);
				  break;
			  case 5:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote-1,1);
				  melodyHighlight(currentMelodyNote-3,13);
				  break;
			  case 6:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 7:
				  melodyHighlight(currentMelodyNote+2,21);
				  melodyHighlight(currentMelodyNote+4,2);
				  melodyHighlight(currentMelodyNote+7,12);
				  melodyHighlight(currentMelodyNote+9,4);
				  melodyHighlight(currentMelodyNote-2,6);
				  melodyHighlight(currentMelodyNote-3,2);
				  melodyHighlight(currentMelodyNote-5,13);
				  melodyHighlight(currentMelodyNote-8,4);
				  break;
			  case 8:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 9:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote-2,1);
				  break;
			  case 10:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 11:
				  melodyHighlight(currentMelodyNote+1,6);
				  melodyHighlight(currentMelodyNote+3,11);
				  melodyHighlight(currentMelodyNote+5,3);
				  melodyHighlight(currentMelodyNote+8,4);
				  melodyHighlight(currentMelodyNote-2,21);
				  melodyHighlight(currentMelodyNote-4,2);
				  melodyHighlight(currentMelodyNote-7,4);
				  melodyHighlight(currentMelodyNote-9,14);
				  break;
			  }
        break;
		    //
		    //THE FOUR CHORD
		    //
      case 5:
        unhighlightMelodySuggestions();
        switch(scaleify(currentMelodyNote)) {
        case 0:
          melodyHighlight(currentMelodyNote+2,21);
          melodyHighlight(currentMelodyNote+4,15);
          melodyHighlight(currentMelodyNote+5,1);
          melodyHighlight(currentMelodyNote-1,6);
          melodyHighlight(currentMelodyNote-3,1);
          melodyHighlight(currentMelodyNote-5,23);
          melodyHighlight(currentMelodyNote-7,4);
          break;
			  case 1:
				  melodyHighlight(currentMelodyNote,26);
				  break;
        case 2:
          melodyHighlight(currentMelodyNote+2,6);
          melodyHighlight(currentMelodyNote+3,1);
          melodyHighlight(currentMelodyNote-2,1);
          break;
			  case 3:
			    melodyHighlight(currentMelodyNote,16);
			    melodyHighlight(currentMelodyNote+2,1);
			    melodyHighlight(currentMelodyNote-1,21);
			    break;
        case 4:
          melodyHighlight(currentMelodyNote+1,1);
          melodyHighlight(currentMelodyNote+3,22);
          melodyHighlight(currentMelodyNote+5,3);
          melodyHighlight(currentMelodyNote-2,21);
          melodyHighlight(currentMelodyNote-4,2);
          melodyHighlight(currentMelodyNote-7,4);
          break;
        case 5:
          melodyHighlight(currentMelodyNote+2,21);
          melodyHighlight(currentMelodyNote+4,1);
          melodyHighlight(currentMelodyNote+7,4);
          melodyHighlight(currentMelodyNote-1,6);
          melodyHighlight(currentMelodyNote-3,24);
          melodyHighlight(currentMelodyNote-5,2);
          melodyHighlight(currentMelodyNote-8,4);
          break;
			  case 6:
				  melodyHighlight(currentMelodyNote,26);
			    break;
        case 7:
          melodyHighlight(currentMelodyNote+2,1);
          melodyHighlight(currentMelodyNote+5,4);
          melodyHighlight(currentMelodyNote-2,1);
          melodyHighlight(currentMelodyNote-3,9);
          break;
			  case 8:
			    melodyHighlight(currentMelodyNote,16);
			    melodyHighlight(currentMelodyNote+1,1);
			    break;
        case 9:
          melodyHighlight(currentMelodyNote+2,6);
          melodyHighlight(currentMelodyNote+3,1);
          melodyHighlight(currentMelodyNote+7,12);
          melodyHighlight(currentMelodyNote+8,4);
          melodyHighlight(currentMelodyNote-2,21);
          melodyHighlight(currentMelodyNote-4,2);
          melodyHighlight(currentMelodyNote-5,14);
          break;
			  case 10:
			    melodyHighlight(currentMelodyNote,16);
			    melodyHighlight(currentMelodyNote-1,1);
			    break;
        case 11:
          melodyHighlight(currentMelodyNote+1,1);
          melodyHighlight(currentMelodyNote-2,1);
          melodyHighlight(currentMelodyNote-4,24);
          break;
        }
        break;
		    //
		    //THE FIVE CHORD
		    //
      case 7:
			  unhighlightMelodySuggestions();
        switch(scaleify(currentMelodyNote)) {
			  case 0:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote+4,21);
				  melodyHighlight(currentMelodyNote+5,13);
				  melodyHighlight(currentMelodyNote+7,4);
				  melodyHighlight(currentMelodyNote-1,1);
				  melodyHighlight(currentMelodyNote-5,3);
				  break;
			  case 1:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 2:
				  melodyHighlight(currentMelodyNote+2,21);
				  melodyHighlight(currentMelodyNote+5,2);
				  melodyHighlight(currentMelodyNote+9,4);
				  melodyHighlight(currentMelodyNote-2,6);
				  melodyHighlight(currentMelodyNote-3,1);
				  melodyHighlight(currentMelodyNote-7,3);
				  break;
			  case 3:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 4:
				  melodyHighlight(currentMelodyNote+1,11);
				  melodyHighlight(currentMelodyNote+3,3);
				  melodyHighlight(currentMelodyNote-2,1);
				  melodyHighlight(currentMelodyNote-5,2);
				  break;
			  case 5:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote-1,21);
				  melodyHighlight(currentMelodyNote-3,1);
				  melodyHighlight(currentMelodyNote-6,4);
				  break;
			  case 6:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 7:
				  melodyHighlight(currentMelodyNote+2,21);
				  melodyHighlight(currentMelodyNote+4,1);
				  melodyHighlight(currentMelodyNote+5,8);
				  melodyHighlight(currentMelodyNote+7,3);
				  melodyHighlight(currentMelodyNote-2,11);
				  melodyHighlight(currentMelodyNote-3,24);
				  melodyHighlight(currentMelodyNote-5,2);
				  melodyHighlight(currentMelodyNote-8,4);
				  break;
			  case 8:
				  melodyHighlight(currentMelodyNote,26);
				  break;
			  case 9:
				  melodyHighlight(currentMelodyNote+2,1);
				  melodyHighlight(currentMelodyNote+3,6);
				  melodyHighlight(currentMelodyNote-2,1);
				  break;
			  case 10:
				  melodyHighlight(currentMelodyNote,16);
				  melodyHighlight(currentMelodyNote+1,1);
				  break;
			  case 11:
				  melodyHighlight(currentMelodyNote+1,6);
				  melodyHighlight(currentMelodyNote+3,1);
				  melodyHighlight(currentMelodyNote+6,14);
				  melodyHighlight(currentMelodyNote+8,4);
				  melodyHighlight(currentMelodyNote-2,21);
				  melodyHighlight(currentMelodyNote-4,1);
				  melodyHighlight(currentMelodyNote-9,4);
				  break;
        }
        break;
		    //
		    //THE SIX CHORD
		    //
      case 9:
        unhighlightMelodySuggestions();
        switch(scaleify(currentMelodyNote)) {
        case 0:
          melodyHighlight(currentMelodyNote+2,6);
          melodyHighlight(currentMelodyNote+4,1);
          melodyHighlight(currentMelodyNote+5,9);
          melodyHighlight(currentMelodyNote+7,11);
          melodyHighlight(currentMelodyNote-1,6);
          melodyHighlight(currentMelodyNote-3,1);
          melodyHighlight(currentMelodyNote-5,14);
          break;
        case 1:
          melodyHighlight(currentMelodyNote,26);
          break;
        case 2:
          melodyHighlight(currentMelodyNote+2,1);
          melodyHighlight(currentMelodyNote-2,1);
          melodyHighlight(currentMelodyNote-3,7);
          break;
        case 3:
          melodyHighlight(currentMelodyNote,16);
          melodyHighlight(currentMelodyNote+1,1);
          melodyHighlight(currentMelodyNote-1,21);
          break;
        case 4:
          melodyHighlight(currentMelodyNote+1,6);
          melodyHighlight(currentMelodyNote+3,11);
          melodyHighlight(currentMelodyNote+5,4);
          melodyHighlight(currentMelodyNote-2,21);
          melodyHighlight(currentMelodyNote-4,2);
          melodyHighlight(currentMelodyNote-5,9);
          break;
        case 5:
          melodyHighlight(currentMelodyNote+2,21);
          melodyHighlight(currentMelodyNote-1,1);
          break;
			  case 6:
				  melodyHighlight(currentMelodyNote,26);
			    break;
        case 7:
          melodyHighlight(currentMelodyNote+2,1);
          melodyHighlight(currentMelodyNote+5,2);
          melodyHighlight(currentMelodyNote-2,6);
          melodyHighlight(currentMelodyNote-3,1);
          break;
        case 8:
          melodyHighlight(currentMelodyNote,16);
          melodyHighlight(currentMelodyNote+1,1);
          melodyHighlight(currentMelodyNote-1,11);
          break;
        case 9:
          melodyHighlight(currentMelodyNote+2,6);
          melodyHighlight(currentMelodyNote+3,1);
          melodyHighlight(currentMelodyNote+7,2);
          melodyHighlight(currentMelodyNote+10,5);
          break;
			  case 10:
				  melodyHighlight(currentMelodyNote,26);
			    break;
        case 11:
          melodyHighlight(currentMelodyNote+1,1);
          melodyHighlight(currentMelodyNote+3,23);
          melodyHighlight(currentMelodyNote-2,1);
          melodyHighlight(currentMelodyNote-4,12);
          break;
        }
        break;
      }
		  break;
	  }
    updateOnScreen();
  }
}


function melodyHighlight(note, color) {
  //console.log("highlighting note number:" + note);
	if (note >= splitPoint) {
		highlight(parseInt(note), color);
	}
}

function chordHighlight(note, color) {
  if (note < splitPoint && suggestionClicked == false) {
    highlight(note, color);
  }
  else if (note < splitPoint && suggestionClicked == true && suggestionUnclicked == false) {
    console.log("playing the chord");
    var pressNote = [144, note, 100];
		event.data = pressNote;
		handleMIDIMessage(event);
    switch (containerIterator) {
    case 0:
      console.log("playing container 1");
      soundContainer1 = globalInstrument.play(note);
      break;
    case 1:
      console.log("playing container 2");
      soundContainer2 = globalInstrument.play(note);
      break;
    case 2:
      console.log("playing container 3");
      soundContainer3 = globalInstrument.play(note);
      break;
    default:
      break;
    }
    containerIterator++;
    
    //playNote();
  }
  else if (note < splitPoint && suggestionUnclicked == true) {
    console.log("suggestionUnclicked is true");
    var pressNote = [128, note, 100];
		event.data = pressNote;
		handleMIDIMessage(event);
    switch (containerIterator) {
    case 3:
      console.log("stopping container 1");
      soundContainer3.stop();
      break;
    case 2:
      console.log("stopping container 2");
      soundContainer2.stop();
      break;
    case 1:
      console.log("stopping container 3");
      soundContainer1.stop();
      suggestionUnclicked = false;
      break;
    default:
      break;
    }
    containerIterator--;
  }
}

function unhighlightMelodySuggestions() {
	//console.log('unhighlightMelodySuggestions() called');
	//if(numActiveMelodyNotes > 0){
	for (i=splitPoint; i<108; i++) {
		if (highlightedNotes[i] < 50) {
			/*
				if(highlightedNotes[i] == 0){
				// do nothing
				} else {
				highlight(i);
				}*/
			highlight(i);
		}
	}
	//}
}

function unhighlightChordSuggestions() {
	//console.log('unhighlightChordSuggestions() called');
  for (i=splitPoint; i>0; i--) {
    if (highlightedNotes[i] != 51) {
      highlight(i);
			//clearCircleColors();
    }
  }
}

function unhighlightHowToChord() {
	//console.log("unhighlightHowToChord was called");
  for (i=splitPoint; i>0; i--) {
    //if (highlightedNotes[i] != 51) {
    highlight(i);
		//clearCircleColors();
    //}
  }
}

function suggestChords() {
  if (numActiveChordNotes > 0) {
    return;
  }
  //console.log("suggestChords was called");
  if (areYouSinging == true) {
    updateInstructions("Suggesting chords from the note you're singing");
  } else {
    updateInstructions("Suggesting chords from your melody note");
  }
  if (lastActiveNote == currentMelodyNote || areYouSinging==true) {
    switch (scaleify(currentMelodyNote)) {
    case 0:
      scLogic(1,4,6);
			colorCircle(['1', '4','6']);
      break;
    case 2:
      scLogic(2,5);
			colorCircle(['2', '5']);
      break;
    case 4:
      scLogic(1,3,24,15,6);
			colorCircle(['1', '3', '24', '15', '6']);
      break;
    case 5:
      scLogic(2,4);
			colorCircle(['2','4']);
      break;
    case 7:
      scLogic(1,3,14,5);
			colorCircle(['1', '3','14', '5']);
      break;
    case 9:
      scLogic(2,4,6);
			colorCircle(['2', '4','6']);
      break;
    case 11:
      scLogic(21,3,5);
			colorCircle(['21', '3','5']);
      break;
    default:
      scLogic();
			colorCircle([]);
      updateInstructions("No chords in the scale work for that melody note");
      break;
    }
  }
}

function noteNearSplitPoint(note) {
  var dec = splitPoint;
  while (scaleify(dec) != scaleify(note)) {
    dec--;
  }
  if (dec >= splitPoint-4) {
    return dec-12;
  } else {
    //if you ever wanna change this to be nearer splitPoint, do so
    return dec;
  }
}

function bassNote(note) {
  var dec = splitPoint;
  while (scaleify(dec) != scaleify(note)) {
    dec--;
  }
  if (dec >= splitPoint-4) {
    return dec-24;
  } else {
    //if you ever wanna change this to be nearer splitPoint, do so
    return dec-24;
  }
}


/**
	 add highlighting for circles in this function
**/
function scLogic() {
  if (numActiveChordNotes == 0 && (chordType == 0 || chordType == 100)) {
    if (arguments.length == 0) {
      scBool = false;
      unhighlightChordSuggestions();
			colorCircle([]);
      //clears chord suggestions
      for (i=0; i<chordSuggestions.length; i++) {
        chordSuggestions[i]=0;
      }
    } else {
      scBool = true;
      for (i=0; i<arguments.length; i++) {
        chordSuggestions[i] = arguments[i];
        //console.log(chordSuggestions[i]);
        switch (chordSuggestions[i]) {
        case 1:
          chordHighlight(noteNearSplitPoint(0+keySigNumber),1);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(0+keySigNumber));
					break;
        case 2:
          chordHighlight(noteNearSplitPoint(2+keySigNumber),1);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(2+keySigNumber));
          break;
        case 3:
          chordHighlight(noteNearSplitPoint(4+keySigNumber),1);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(4+keySigNumber));
          break;
        case 4:
          chordHighlight(noteNearSplitPoint(5+keySigNumber),1);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(5+keySigNumber));
          break;
        case 5:
          chordHighlight(noteNearSplitPoint(7+keySigNumber),1);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(7+keySigNumber));
          break;
        case 6:
          chordHighlight(noteNearSplitPoint(9+keySigNumber),1);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(9+keySigNumber));
          break;
        case 11:
          chordHighlight(noteNearSplitPoint(0+keySigNumber),10);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(0+keySigNumber));
          break;
        case 12:
          chordHighlight(noteNearSplitPoint(2+keySigNumber),10);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(2+keySigNumber));
          break;
        case 13:
          chordHighlight(noteNearSplitPoint(4+keySigNumber),10);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(4+keySigNumber));
          break;
        case 14:
          chordHighlight(noteNearSplitPoint(5+keySigNumber),10);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(5+keySigNumber));
          break;
        case 15:
          chordHighlight(noteNearSplitPoint(7+keySigNumber),10);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(7+keySigNumber));
          break;
        case 16:
          chordHighlight(noteNearSplitPoint(9+keySigNumber),10);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(9+keySigNumber));
          break;
        case 21:
          chordHighlight(noteNearSplitPoint(0+keySigNumber),15);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(0+keySigNumber));
          break;
        case 22:
          chordHighlight(noteNearSplitPoint(2+keySigNumber),15);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(2+keySigNumber));
          break;
        case 23:
          chordHighlight(noteNearSplitPoint(4+keySigNumber),15);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(4+keySigNumber));
          break;
        case 24:
          chordHighlight(noteNearSplitPoint(5+keySigNumber),15);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(5+keySigNumber));
          break;
        case 25:
          chordHighlight(noteNearSplitPoint(7+keySigNumber),15);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(7+keySigNumber));
          break;
        case 26:
          chordHighlight(noteNearSplitPoint(9+keySigNumber),15);
          chordRootNoteSuggestions.unshift(noteNearSplitPoint(9+keySigNumber));
          break;
        }
      }
    }
  }
  updateOnScreen();
}

function scDelayHelper(an) {
  var activeNoteWasASuggestion = false;
  //initial condition, just making sure that if something involved the chord circles
  //this function shouldn't really do much in that case
  if (somethingClickedWithMouse == true || somethingPressedWithKeyboard == true) {
    if (numActiveChordNotes > 0) {
      for (i=0;i<howToPlayChordNotes.length;i++) {
        if (activeNote == howToPlayChordNotes[i]) {
          activeNoteWasASuggestion = true;
          howToPlayChordNotes.splice(i,1);
        }
      }
      if (activeNoteWasASuggestion == false) {
        for (i=0;i<howToPlayChordNotes.length;i++) {
          highlight(howToPlayChordNotes[i]);
          updateInstructions("");
        }
        howToPlayChordNotes = [];
      }
    }
    return;
  }
  //here's the main part of the function
  if (scBool == true && currentMelodyNote != null && numActiveChordNotes == 1) {
    unhighlightChordSuggestions();
    chordRootNoteSuggestions.reverse();
    for (i=chordRootNoteSuggestions.length-1; i>=0; i--) {
      if (an == chordRootNoteSuggestions[i]) {
        updateInstructions("Showing how to play your selected chord");
        switch(chordSuggestions[i]) {
        case 1:
        case 4:
        case 5:
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+4);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+7);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-5);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-8);
          chordHighlight(chordRootNoteSuggestions[i],16);
          chordHighlight(howToPlayChordNotes[1],16);
          chordHighlight(howToPlayChordNotes[2],16);
          chordHighlight(howToPlayChordNotes[3],16);
          chordHighlight(howToPlayChordNotes[4],16);
          break;
        case 2:
        case 3:
        case 6:
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+3);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+7);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-5);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-9);
          chordHighlight(chordRootNoteSuggestions[i],16);
          chordHighlight(howToPlayChordNotes[1],16);
          chordHighlight(howToPlayChordNotes[2],16);
          chordHighlight(howToPlayChordNotes[3],16);
          chordHighlight(howToPlayChordNotes[4],16);
          break;
        case 11:
        case 14:
        case 15:
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+4);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+7);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-5);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-8);
          chordHighlight(chordRootNoteSuggestions[i],16);
          chordHighlight(howToPlayChordNotes[1],16);
          chordHighlight(howToPlayChordNotes[2],16);
          chordHighlight(howToPlayChordNotes[3],16);
          chordHighlight(howToPlayChordNotes[4],16);
          break;
        case 12:
        case 13:
        case 16:
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+3);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+7);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-5);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-9);
          chordHighlight(chordRootNoteSuggestions[i],16);
          chordHighlight(howToPlayChordNotes[1],16);
          chordHighlight(howToPlayChordNotes[2],16);
          chordHighlight(howToPlayChordNotes[3],16);
          chordHighlight(howToPlayChordNotes[4],16);
          break;
        case 21:
        case 24:
        case 25:
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+4);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+7);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-5);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-8);
          chordHighlight(chordRootNoteSuggestions[i],16);
          chordHighlight(howToPlayChordNotes[1],16);
          chordHighlight(howToPlayChordNotes[2],16);
          chordHighlight(howToPlayChordNotes[3],16);
          chordHighlight(howToPlayChordNotes[4],16);
          break;
        case 22:
        case 23:
        case 26:
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+3);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]+7);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-5);
          howToPlayChordNotes.unshift(chordRootNoteSuggestions[i]-9);
          chordHighlight(chordRootNoteSuggestions[i],16);
          chordHighlight(howToPlayChordNotes[1],16);
          chordHighlight(howToPlayChordNotes[2],16);
          chordHighlight(howToPlayChordNotes[3],16);
          chordHighlight(howToPlayChordNotes[4],16);
          break;
        }
      }
    }
    chordRootNoteSuggestions = [];
    scBool = false;
  } else if (numActiveChordNotes > 0) {
    for (i=0;i<howToPlayChordNotes.length;i++) {
      if (activeNote == howToPlayChordNotes[i]) {
        activeNoteWasASuggestion = true;
        howToPlayChordNotes.splice(i,1);
      }
    }
    if (activeNoteWasASuggestion == false) {
      for (i=0;i<howToPlayChordNotes.length;i++) {
        highlight(howToPlayChordNotes[i]);
        updateInstructions("");
      }
      howToPlayChordNotes = [];
    }
  }
}

function howToPlayChord(chord) {
	//console.log("inside howtoplaychord: "+chord);
  updateInstructions("Showing how to play a " + chord + " chord");
  var color = 16;
  unhighlightChordSuggestions();
  switch (my_mode) {

  case 'Composition':
  case 'Chords':
    switch (chord) {
	  case 'C':
	    chordHighlight(noteNearSplitPoint(0),color);
	    chordHighlight(noteNearSplitPoint(4),color);
	    chordHighlight(noteNearSplitPoint(7),color);
	    break;
	  case 'Cm':
	    chordHighlight(noteNearSplitPoint(0),color);
	    chordHighlight(noteNearSplitPoint(3),color);
	    chordHighlight(noteNearSplitPoint(7),color);
	    break;
	  case 'Db':
	  case 'C#':
	    chordHighlight(noteNearSplitPoint(1),color);
	    chordHighlight(noteNearSplitPoint(5),color);
	    chordHighlight(noteNearSplitPoint(8),color);
	    break;
	  case 'Dbm':
	  case 'C#m':
	    chordHighlight(noteNearSplitPoint(1),color);
	    chordHighlight(noteNearSplitPoint(4),color);
	    chordHighlight(noteNearSplitPoint(8),color);
	    break;
	  case 'D':
	    chordHighlight(noteNearSplitPoint(2),color);
	    chordHighlight(noteNearSplitPoint(6),color);
	    chordHighlight(noteNearSplitPoint(9),color);
	    break;
	  case 'Dm':
	    chordHighlight(noteNearSplitPoint(2),color);
	    chordHighlight(noteNearSplitPoint(5),color);
	    chordHighlight(noteNearSplitPoint(9),color);
	    break;
	  case 'Eb':
	  case 'D#':
	    chordHighlight(noteNearSplitPoint(3),color);
	    chordHighlight(noteNearSplitPoint(7),color);
	    chordHighlight(noteNearSplitPoint(10),color);
	    break;
	  case 'Ebm':
	  case 'D#m':
	    chordHighlight(noteNearSplitPoint(3),color);
	    chordHighlight(noteNearSplitPoint(6),color);
	    chordHighlight(noteNearSplitPoint(10),color);
	    break;
	  case 'E':
	    chordHighlight(noteNearSplitPoint(4),color);
	    chordHighlight(noteNearSplitPoint(8),color);
	    chordHighlight(noteNearSplitPoint(11),color);
	    break;
	  case 'Em':
	    chordHighlight(noteNearSplitPoint(4),color);
	    chordHighlight(noteNearSplitPoint(7),color);
	    chordHighlight(noteNearSplitPoint(11),color);
	    break;
	  case 'F':
	    chordHighlight(noteNearSplitPoint(5),color);
	    chordHighlight(noteNearSplitPoint(9),color);
	    chordHighlight(noteNearSplitPoint(0),color);
	    break;
	  case 'Fm':
	    chordHighlight(noteNearSplitPoint(5),color);
	    chordHighlight(noteNearSplitPoint(8),color);
	    chordHighlight(noteNearSplitPoint(0),color);
	    break;
	  case 'F#':
	  case 'Gb':
	    chordHighlight(noteNearSplitPoint(6),color);
	    chordHighlight(noteNearSplitPoint(10),color);
		  chordHighlight(noteNearSplitPoint(1),color);
	    break;
	  case 'F#m':
	  case 'Gbm':
	    chordHighlight(noteNearSplitPoint(6),color);
	    chordHighlight(noteNearSplitPoint(9),color);
	    chordHighlight(noteNearSplitPoint(1),color);
	    break;
	  case 'G':
	    chordHighlight(noteNearSplitPoint(7),color);
	    chordHighlight(noteNearSplitPoint(11),color);
	    chordHighlight(noteNearSplitPoint(2),color);
	    break;
	  case 'Gm':
	    chordHighlight(noteNearSplitPoint(7),color);
	    chordHighlight(noteNearSplitPoint(10),color);
	    chordHighlight(noteNearSplitPoint(2),color);
	    break;
	  case 'Ab':
	  case 'G#':
	    chordHighlight(noteNearSplitPoint(8),color);
	    chordHighlight(noteNearSplitPoint(0),color);
	    chordHighlight(noteNearSplitPoint(3),color);
	    break;
	  case 'Abm':
	  case 'G#m':
	    chordHighlight(noteNearSplitPoint(8),color);
	    chordHighlight(noteNearSplitPoint(11),color);
	    chordHighlight(noteNearSplitPoint(3),color);
	    break;
	  case 'A':
	    chordHighlight(noteNearSplitPoint(9),color);
	    chordHighlight(noteNearSplitPoint(1),color);
	    chordHighlight(noteNearSplitPoint(4),color);
		  break;
	  case 'Am':
	    chordHighlight(noteNearSplitPoint(9),color);
	    chordHighlight(noteNearSplitPoint(0),color);
	    chordHighlight(noteNearSplitPoint(4),color);
	    break;
	  case 'Bb':
	  case 'A#':
	    chordHighlight(noteNearSplitPoint(10),color);
	    chordHighlight(noteNearSplitPoint(2),color);
	    chordHighlight(noteNearSplitPoint(5),color);
	    break;
	  case 'Bbm':
	  case 'A#m':
	    chordHighlight(noteNearSplitPoint(10),color);
	    chordHighlight(noteNearSplitPoint(1),color);
	    chordHighlight(noteNearSplitPoint(5),color);
	    break;
	  case 'B':
	    chordHighlight(noteNearSplitPoint(11),color);
	    chordHighlight(noteNearSplitPoint(3),color);
	    chordHighlight(noteNearSplitPoint(6),color);
	    break;
	  case 'Bm':
	    chordHighlight(noteNearSplitPoint(11),color);
	    chordHighlight(noteNearSplitPoint(2),color);
	    chordHighlight(noteNearSplitPoint(6),color);
	    break;
    }
    break;
  case 'FIXTHISEVENTUALLY':
    //need to add here voicings that make sense
    break;
  case 'Freestyle':

    break;
  default:

    break;
  }
	//for (i=0;i<3;i++) {
	//	howToPlayChordNotes[i] =
	//}
}

function playScale() {
  var timeBetweenNotes;
  var timeIterator = 0;
  var scaleNumbers = [0,2,4,5,7,9,11];
  var highlightedScale = new Array(9);
  var octaveHasJumped = false;

  highlight(scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2,49);
  highlightedScale[timeIterator] = scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2;
  scaleSoundContainer = globalInstrument.play(highlightedScale[timeIterator]);
  timeIterator++;
  timeBetweenNotes = setInterval(function() {
    if (timeIterator == 1) {
      //highlight(highlightedScale[0]);
    }
    scaleSoundContainer.stop();
    if (timeIterator > 0 && timeIterator < 8 && scaleify(scaleNumbers[timeIterator]) < scaleify(scaleNumbers[timeIterator-1])) {
      //highlight with octave jump
      highlight(scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2+12,49);
      highlightedScale[timeIterator] = scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2+12;
      scaleSoundContainer = globalInstrument.play(highlightedScale[timeIterator]);
      octaveHasJumped = true;
    } else {
      if (octaveHasJumped && timeIterator < 7) {
        highlight(scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2+12,49);
        highlightedScale[timeIterator] = scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2+12;
        scaleSoundContainer = globalInstrument.play(highlightedScale[timeIterator]);
      } else {
        if (timeIterator < 7) {
          highlight(scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2,49);
          highlightedScale[timeIterator] = scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2;
          scaleSoundContainer = globalInstrument.play(highlightedScale[timeIterator]);
        }
      }
      if (timeIterator == 7) {
        //highlighting the last note
        highlight(scaleify(scaleNumbers[0])+12*4+keySigNumber*2+12,49);
        highlightedScale[timeIterator] = scaleify(scaleNumbers[timeIterator])+12*4+keySigNumber*2+12;
        scaleSoundContainer = globalInstrument.play(highlightedScale[0]+12);
      }
    }
    if (timeIterator > 1 && timeIterator < 8) {
      //highlight(highlightedScale[timeIterator-1]);
    }
    timeIterator++;
    if (timeIterator > 8) {
      clearInterval(timeBetweenNotes);
      unHighlightEntireScale();
      keysWasClicked = false;
      $(document.getElementsByClassName("in_key_keys")).css("background-color", "hsl(0, 0%, 15%)");
      updateInstructions("");
    }
  },400);
}

function highlightEntireScale() {
  entireScale = true;
  updateInstructions("Showing all notes in your selected scale");
  if (numActiveMelodyNotes == 0 && numActiveChordNotes == 0) {
  //if (numActiveMelodyNotes == 0 && numActiveChordNotes > 0) {
    for (i = 0; i < 9; i++) {
      highlight(scaleify(0)+12*i+keySigNumber*2,49);
      highlight(scaleify(2)+12*i+keySigNumber*2,49);
      highlight(scaleify(4)+12*i+keySigNumber*2,49);
      highlight(scaleify(5)+12*i+keySigNumber*2,49);
      highlight(scaleify(7)+12*i+keySigNumber*2,49);
      highlight(scaleify(9)+12*i+keySigNumber*2,49);
      highlight(scaleify(11)+12*i+keySigNumber*2,49);
    }
  }
}

function highlightEntireMelodyScale() {
  console.log("highlightEntireMelodyScale was called");
  entireScale = true;
  var noteToHighlight;
  if (numActiveMelodyNotes == 0 && numActiveChordNotes > 0) {
    for (j = 0; j < 9; j++) {
      for (i=0; i<12; i++) {
        if (i != 1 && i != 3 && i != 6 && i != 8 && i != 10) {
          noteToHighlight = scaleify(i)+12*j+keySigNumber*2;
          if (noteToHighlight >= splitPoint) {
            highlight(noteToHighlight,49);
          }
        }
      }
    }
  }
}

function highlightEntireMelodyScaleOneColor() {
  console.log("highlightEntireMelodyScale was called");
  entireScale = true;
  var noteToHighlight;
  if (numActiveMelodyNotes == 0 && numActiveChordNotes > 0) {
    for (j = 0; j < 9; j++) {
      for (i=0; i<12; i++) {
        if (i != 1 && i != 3 && i != 6 && i != 8 && i != 10) {
          noteToHighlight = scaleify(i)+12*j+keySigNumber*2;
          if (noteToHighlight >= splitPoint) {
            highlight(noteToHighlight,49); 
          }
        }
      }
    }
  }
}

function unHighlightEntireScale() {
  //clearInterval(scaleTimer);
  console.log("unHighlightEntireScale was called");
  entireScale = false;
  if (numActiveMelodyNotes == 0 && numActiveChordNotes == 0) {
    for (i = 0; i < 9; i++) {
      highlight(scaleify(0)+12*i+keySigNumber*2);
      highlight(scaleify(2)+12*i+keySigNumber*2);
      highlight(scaleify(4)+12*i+keySigNumber*2);
      highlight(scaleify(5)+12*i+keySigNumber*2);
      highlight(scaleify(7)+12*i+keySigNumber*2);
      highlight(scaleify(9)+12*i+keySigNumber*2);
      highlight(scaleify(11)+12*i+keySigNumber*2);
    }
  }
}


function getSingingNoteAndSuggestChords() {
  /*
    if (singStack[0] != singStack[1]) {
    //singStack.unshift(note-1);
    console.log("singStack[0] = " + nameNote(singStack[1]));
    if (20 < singStack[0] < 60) {
    highlight(singStack[0], 1);
    highlight(singStack[1]);
    }
    }
  */
  console.log("getSingingNoteAndSuggestChords was called ");
  if (singInput != notesSungStack[0] && singInput != null) {
    //notesSungStack[0] = singStack[0];
    notesSungStack[1] = notesSungStack[0];
    notesSungStack[0] = singInput;
    highlight(notesSungStack[0], 51);
    highlight(notesSungStack[1]);
  } else {
    highlight(notesSungStack[0], 51);
    highlight(notesSungStack[1]);
  }
  /*
    var i = 1;
    while (singStack[i] == notesSungStack[0]) {
    i++;
    }
    if (singStack[i] != notesSungStack[1]) {
    notesSungStack[1] = singStack[i];
    }
  */
}


function nearestAbsoluteNote(note, th) {

  return(0);
}
