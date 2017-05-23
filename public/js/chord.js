/*******************************************************************************

	chord.js
	* contains the code related to processing chords

  *******************************************************************************/

var splitPoint;

$(document).ready(function(){
  if (localStorage.getItem("split-point") == null || localStorage.getItem("split-point") == 107) {
    splitPoint = 69; //Key that separates chords from melodies
    socket.emit('serialHighlight', "Split Point Note", parseInt(splitPoint));
  }
  else {
    splitPoint = localStorage.getItem("split-point");
    socket.emit('serialHighlight', "Split Point Note", parseInt(splitPoint));
  }
});

//contains all previously played chords
//midi.js has the same thing for melodies
var chordStack = [];
var chordTypeStack = [];

var chordType = 100;
var chordTypes = ["no chord","major", "minor", "diminished", "sus4"];

var chordRootNote;

var sortedChordNotes = [];


//chord notes *should* already be sorted, but this is fool-proof
function gatherAndSortChordNotes() {
  function sortNumber(a,b) {
    return a - b;
  }
  for (j = 0; j<numActiveChordNotes; j) {
    for (i = 0; i<splitPoint; i++) {
      if (keys[i] != 128) {
        sortedChordNotes[j] = i;
        j++;
      }
    }
  }
  sortedChordNotes.sort(sortNumber);
}

//chord naming
function interpretChord(activeNote, wasNotePressed) {
  var str;
  //one note chords rely heavily on the current scale to intelligently
  //pick a chord that makes sense
  setTimeout(oneNoteChord, 300);
  if (numActiveChordNotes == 0) {
    chordType = 0;
    chordRootNote = null;
    //logText("chord released");
  }
  function oneNoteChord() {
    if (numActiveChordNotes == 1 && wasNotePressed==true) {
      chordRootNote = scaleify(activeNote+keySigNumber);
      // get the string of the chord
      var str = nameNote(activeNote);
      console.log("one note " + str);
      str = str.substring(0, str.length - 1);
      switch (scaleify(activeNote)) {
        case 0:
          ////console.log(str + " major chord 0, determined by 1 note");
          colorCircle(["31"]);
          chordType = 1;
          break;
        case 1:
          ////console.log(str + " diminished chord 1, determined by 1 note");
          //colorCircle(["32"]);
          chordType = 3;
          break;
        case 2:
          ////console.log(str + " minor chord 2, determined by 1 note");
          colorCircle(["32"]);
          chordType = 2;
          break;
        case 3:
          ////console.log(str + " major chord 3, determined by 1 note");
          //colorCircle(["33"]);
          chordType = 1;
          break;
        case 4:
          ////console.log(str + " minor chord 4, determined by 1 note");
          colorCircle(["33"]);
          chordType = 2;
          break;
        case 5:
          ////console.log(str + " major chord 5, determined by 1 note");
          colorCircle(["34"]);
          chordType = 1;
          break;
        case 6:
          //console.log(str + " minor chord 6, determined by 1 note");
          //colorCircle(["34"]);
          chordType = 2;
          break;
        case 7:
          //console.log(str + " major chord 7, determined by 1 note");
          colorCircle(["35"]);
          chordType = 1;
          break;
        case 8:
          //console.log(str + " major chord 8, determined by 1 note");
          //colorCircle(["35"]);
          chordType = 1;
          break;
        case 9:
          logText(str + " minor chord 9, determined by 1 note");
          colorCircle(["36"]);
          chordType = 2;
          break;
        case 10:
          //console.log(str + " major chord 10, determined by 1 note");
          //colorCircle(["36"]);
          chordType = 1;
          break;
        case 11:
          //console.log(str + " diminished chord 11, determined by 1 note");
          //colorCircle(["36"]);
          chordType = 3;
          break;
      }
      chordStack.unshift(scaleify(chordRootNote));
      chordTypeStack.unshift(chordType);
      updateOnScreen();
      //logText(chordStack[0] + " " + chordTypeStack[0]);
      //logText(chordStack[1] + " " + chordTypeStack[1]);
      //logText(chordStack[2] + " " + chordTypeStack[2]);
    }
    highlightNotes(activeNote,wasNotePressed);
  }
  if (numActiveChordNotes == 2) {
    gatherAndSortChordNotes();
    chordType = 100;
    if (sortedChordNotes[1] - sortedChordNotes[0] == 7 || sortedChordNotes[1] - sortedChordNotes[0] == 12) {
      chordRootNote = sortedChordNotes[0];
      //console.log("2 notes chords commence");
      switch (scaleify(chordRootNote)) {
      case 0:
        chordType = 1;
        colorCircle(['31']);
        break;
      case 1:
        chordType = 1;
        break;
      case 2:
        chordType = 2;
        colorCircle(['32']);
        break;
      case 3:
        chordType = 1;
        break;
      case 4:
        chordType = 2;
        colorCircle(['33']);
        break;
      case 5:
        chordType = 1;
        colorCircle(['34']);
        break;
      case 6:
        chordType = 2;
        break;
      case 7:
        chordType = 1;
        colorCircle(['35']);
        break;
      case 8:
        chordType = 1;
        break;
      case 9:
        chordType = 2;
        colorCircle(['36']);
        break;
      case 10:
        chordType = 1;
        break;
      case 11:
        chordType = 1;
        break;
      }
      chordRootNote = sortedChordNotes[0];
    }
    if (chordType != 100) {
      chordStack.unshift(scaleify(chordRootNote));
      chordTypeStack.unshift(chordType);
      str = nameNote(activeNote);
      str = str.substring(0, str.length - 1);
      //console.log(str + " " + chordTypes[chordType] + " chord, determined by 2 notes");
    }
  }
  if (numActiveChordNotes == 3) {
    gatherAndSortChordNotes();
    chordType = 100;  //does this just incase the computer doesn't recognize the chord
    //major chord root position
    if (sortedChordNotes[1] - sortedChordNotes[0] == 4 && sortedChordNotes[2] - sortedChordNotes[1] == 3) {
      chordType = 1;
      chordRootNote = sortedChordNotes[0];
    }
    //major chord 1st inversion
    if (sortedChordNotes[1] - sortedChordNotes[0] == 3 && sortedChordNotes[2] - sortedChordNotes[1] == 5) {
      chordType = 1;
      chordRootNote = sortedChordNotes[2];
    }
    //major chord 2nd inversion
    if (sortedChordNotes[1] - sortedChordNotes[0] == 5 && sortedChordNotes[2] - sortedChordNotes[1] == 4) {
      chordType = 1;
      chordRootNote = sortedChordNotes[1];
    }
    //minor chord root position
    if (sortedChordNotes[1] - sortedChordNotes[0] == 3 && sortedChordNotes[2] - sortedChordNotes[1] == 4) {
      chordType = 2;
      chordRootNote = sortedChordNotes[0];
    }
    //minor chord 1st inversion
    if (sortedChordNotes[1] - sortedChordNotes[0] == 4 && sortedChordNotes[2] - sortedChordNotes[1] == 5) {
      chordType = 2;
      chordRootNote = sortedChordNotes[2];
    }
    //minor chord 2nd inversion
    if (sortedChordNotes[1] - sortedChordNotes[0] == 5 && sortedChordNotes[2] - sortedChordNotes[1] == 3) {
      chordType = 2;
      chordRootNote = sortedChordNotes[1];
    }
    if (sortedChordNotes[1] - sortedChordNotes[0] == 7 && sortedChordNotes[2] - sortedChordNotes[1] == 5) {
      chordRootNote = sortedChordNotes[0];
      switch (scaleify(chordRootNote)) {
      case 0:
        chordType = 1;
        break;
      case 1:
        chordType = 1;
        break;
      case 2:
        chordType = 2;
        break;
      case 3:
        chordType = 1;
        break;
      case 4:
        chordType = 2;
        break;
      case 5:
        chordType = 1;
        break;
      case 6:
        chordType = 2;
        break;
      case 7:
        chordType = 1;
        break;
      case 8:
        chordType = 1;
        break;
      case 9:
        chordType = 2;
        break;
      case 10:
        chordType = 1;
        break;
      case 11:
        chordType = 1;
        break;
      }
      chordRootNote = sortedChordNotes[0];
    }
    //once it finds a chord that makes sense
    if (chordType != 100) {
      chordStack.unshift(scaleify(chordRootNote));
      chordTypeStack.unshift(chordType);
      str = nameNote(sortedChordNotes[0]);
      str = str.substring(0, str.length - 1);
      //console.log(str + " " + chordTypes[chordType] + " chord, determined by 3 notes");

      // color the cirlce for the determined chord
      switch(scaleify(chordRootNote)) {
        case 0: colorCircle(['31']); break;
        case 1: colorCircle([]); break;
        case 2: colorCircle(['32']); break;
        case 3: colorCircle([]); break;
        case 4: colorCircle(['33']); break;
        case 5: colorCircle(['34']); break;
        case 6: colorCircle([]); break;
        case 7: colorCircle(['35']); break;
        case 8: colorCircle([]); break;
        case 9: colorCircle(['36']); break;
        case 10: colorCircle([]); break;
        case 11: colorCircle([]); break;
      }
      //logText(chordStack[0] + " " + chordTypeStack[0]);
      //logText(chordStack[1] + " " + chordTypeStack[1]);
      //logText(chordStack[2] + " " + chordTypeStack[2]);
    }
  }
}
