/*******************************************************************************

	highlight-chords.js

	* contains the code for displaying chord suggestions

  *******************************************************************************/

// the hover function for highlighting chord suggestions

var suggestionClicked = false;
var suggestionUnclicked = false;
var title;
var lastTitle;
var somethingClickedWithMouse = false;
var bassNoteContainer = new Array(108);

$(document.getElementsByClassName("chord_hov")).hover(function() {
  if (keysWasClicked == false) {
    if (suggestionClicked == false && notesPressedWithKeyboard == 0) {
      $(this).css("background-color", getColor(16));
      title = $(this).text().substring(1);
      console.log(title);
      howToPlayChord(title);
    } else {
      title = $(this).text().substring(1);
    }
  } else {
    updateInstructions("Please wait for scale to finish playing!");
  }
}, function(){
  if (suggestionClicked == false && keysWasClicked == false) {
    unhighlightHowToChord();
    updateInstructions("");
    $(this).css("background-color", "hsl(0, 0%, 15%)");
  } else {
    if (keysWasClicked == true) {
      updateInstructions("");
    }
  }
})
  .mousedown(function(){
    if (keysWasClicked == false && somethingPressedWithKeyboard == false && notesPressedWithKeyboard == 0) {
      if (suggestionClicked == false) {
        console.log("suggestion was clicked");
        somethingClickedWithMouse = true;
        lastTitle = title;
        suggestionClicked = true;
        unhighlightHowToChord();
        howToPlayChord(title);
        bassNoteContainer[bassNote(nameChordNoteNumber(title))-1] = globalInstrument.play(bassNote(nameChordNoteNumber(title)));
        updateInstructions("Playing the " + title + " chord you clicked");
      } else {
        if (lastTitle == title && $(this).text().substring(1) == lastTitle) {
          console.log("suggestion was unclicked");
          somethingClickedWithMouse = false;
          suggestionUnclicked = true;
          howToPlayChord(title);
          suggestionClicked = false;
          //suggestionUnclicked = false;
          bassNoteContainer[bassNote(nameChordNoteNumber(title))-1].stop();
          updateInstructions("Stopped playing the chord you clicked");
          delayedHideInstructions();
        } else {
          //do nothing
          suggestionUnclicked = true;
          somethingClickedWithMouse = true;
          howToPlayChord(lastTitle);
          bassNoteContainer[bassNote(nameChordNoteNumber(lastTitle))-1].stop();
          suggestionUnclicked = false;
          howToPlayChord(title);
          bassNoteContainer[bassNote(nameChordNoteNumber(title))-1] = globalInstrument.play(bassNote(nameChordNoteNumber(title)));
          suggestionClicked = true;
          lastTitle=title;
          updateInstructions("Switching to playing the  " + title + " chord");
          //howToPlayChord(title);
        }
      }
    }
  });

// the hover function for highlighting all in-key keys

var keysWasClicked = false;
$(document.getElementsByClassName("in_key_keys")).hover(function(){
  $(this).css("background-color", getColor(49));
  if (keysWasClicked == false && suggestionClicked == false) {
    highlightEntireScale();
    updateInstructions("Showing all notes in your selected scale. Click to play a scale sample");
    keysWasClicked = false;
  }
}, function(){
  if (keysWasClicked == false) {
    unHighlightEntireScale();
    updateInstructions("");
    $(this).css("background-color", "hsl(0, 0%, 15%)");
  }
})
  .mousedown(function() {
    if (keysWasClicked == false && suggestionClicked == false) {
      $(this).css("background-color", getColor(49));
      unHighlightEntireScale();
      playScale();
      keysWasClicked = true;
      updateInstructions("Playing a scale in your selected key");
    } else if (suggestionClicked == true) {
      updateInstructions("You must unclick your currently played chord first!");
    } else if (keysWasClicked == true) {
      updateInstructions("Wait for the scale to finish playing!");
    }
  });

var moveSplitPointClicked = false;
$(document.getElementById("SplitPointButton")).hover(function(){
  if(moveSplitPointClicked == false){
    $(this).css("background-color", "#7BCC71");
  }
},function(){
  if(moveSplitPointClicked == false){
    $(this).css("background-color", "hsl(0, 0%, 15%)");
  }
}).click(function(){
  if(moveSplitPointClicked == false && suggestionClicked == false){
    //$(this).addClass("greenPulse");
    moveSplitPointClicked = true;
    updateInstructions("Play a note to move the Split Point.");
    changeSplitPoint();
  }
  else if(suggestionClicked == true){
    updateInstructions("You must unclick your currently played chord first!");
  }
  else if(moveSplitPointClicked == true){
    //$(this).removeClass("greenPulse");
    //$(this).css("background-color","hsl(0, 0%, 15%)");
    //updateInstructions("Move Split Point canceled.")
    updateInstructions("Press a note to finish changing the Split Point.");
  }
});


// the base chords for each key
var chords_A = ['A', 'Bm', 'C#m', 'D', 'E', 'F#m'];
var chords_AS = ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm'];
var chords_B = ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m'];
var chords_C = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
var chords_CS = ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm'];
var chords_D = ['D', 'Em', 'F#m', 'G', 'A', 'Bm'];
var chords_DS = ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm'];
var chords_E = ['E', 'F#m', 'G#m', 'A', 'B', 'C#m'];
var chords_F = ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm'];
var chords_FS = ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m'];
var chords_G = ['G', 'Am', 'Bm', 'C', 'D', 'Em'];
var chords_GS = ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm'];

var currentChords = [];

// initializes the paramaters based on key of select menu
function getChordsArray(key){
  console.log("in get chords array " + key);
  updateInstructions("Changed key signature to " + key + " ");
  delayedHideInstructions();
	switch(key){
  	case 'A (F#m)':
  		keySig ='A';
  		keySigNumber = 9;
  		return chords_A;
  		break;
  	case 'Bb (Gm)':
  		keySig ='Bb';
  		keySigNumber = 10;
  		return chords_AS;
  		break;
  	case 'B (G#m)':
  		keySig ='B';
  		keySigNumber = 11;
  		return chords_B;
  		break;
  	case 'C (Am)':
  		keySig ='C';
  		keySigNumber = 0;
  		return chords_C;
  		break;
  	case 'Db (Bbm)':
  		keySig ='Db';
  		keySigNumber = 1;
  		return chords_CS;
  		break;
  	case 'D (Bm)':
  		keySig ='D';
  		keySigNumber = 2;
  		return chords_D;
  		break;
  	case 'Eb (Cm)':
  		keySig ='Eb';
  		keySigNumber = 3;
  		return chords_DS;
  		break;
  	case 'E (C#m)':
  		keySig ='E';
  		keySigNumber = 4;
  		return chords_E;
  		break;
  	case 'F (Dm)':
  		keySig ='F';
  		keySigNumber = 5;
  		return chords_F;
  		break;
  	case 'F# (D#m)':
  		keySig ='Gb';
  		keySigNumber = 6;
  		return chords_FS;
  		break;
  	case 'G (Em)':
  		keySig ='G';
  		keySigNumber = 7;
  		return chords_G;
  		break;
  	case 'Ab (Fm)':
  		keySig ='Ab';
  		keySigNumber = 8;
  		return chords_GS;
  		break;
  	default : return -1;
	}
}

// sets the text of the circle (e.x. "C" or "Db")
function setCircleText(key){
  console.log("set circle text " + key);
  var chords = getChordsArray(key);
  console.log(chords);
  for(var i = 1; i < 7; i++){
    var myid = "chord_"+i;
    var chordCircleLI = document.getElementById(myid);
    //chordCircleLI.innerHTML = chords[i-1];
    //var spanTag = document.createElement('span');
    //spanTag.setAttribute('class',"keyboard-shortcut unselectable");
    //spanTag.innerHTML = i;
    var spanTag = "<div><span class=\"keyboard-shortcut-numbers unselectable\">" + i + "</span></div>";
    //chordCircleLI.appendChild(spanTag);
    chordCircleLI.innerHTML = spanTag;
    chordCircleLI.innerHTML += chords[i-1];
  }
  currentChords = chords;
}

// clears all the circle colors
function clearCircleColors(){
  // first clear all the suggestions
  for(var i = 1; i < 7; i++){
    document.getElementById("chord_"+i).style.backgroundColor = '#333';
  }
  if (numActiveChordNotes == 0 && numActiveMelodyNotes == 0)
    unHighlightEntireScale();
}

// colors the circles based on array of ids
function colorCircle(myids){
  if (myids != null) {
    highlightEntireMelodyScale();
  }
  clearCircleColors();
  // now color with appropriate color
	for(var i = 0; i < myids.length; i++){
    if(myids[i]<7){
      document.getElementById("chord_"+myids[i]).style.backgroundColor = getColor(61);
    } else if(myids[i] < 17) {
      myids[i] = myids[i] - 10;
      document.getElementById("chord_"+myids[i]).style.backgroundColor = getColor(66);
    } else if(myids[i] < 27){
      myids[i] = myids[i] - 20;
      document.getElementById("chord_"+myids[i]).style.backgroundColor = getColor(71);
    } else if(myids[i] < 37){
      myids[i] = myids[i] - 30;
      document.getElementById("chord_"+myids[i]).style.backgroundColor = getColor(76);
    }
    else {
      document.getElementById("chord_"+myids[i]).style.backgroundColor = getColor(61);
    }
	}
}

// gets the key from menu on top of screen
function getKeyFromMenu(){
  var myKey = document.getElementById('selectedKey').innerHTML;
  console.log("getting my key... "+myKey);
}

getKeyFromMenu();
