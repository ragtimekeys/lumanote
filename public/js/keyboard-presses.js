var keyboardSounds = new Array(108);
var titleKb;
var lastTitleKb;
//this "something" refers to chord circles
var somethingPressedWithKeyboard = false;

var notesPressedWithKeyboard = 0;
//the size of this array is 300 because idk how many ascii things there are
//also because this is sparta
var keepKeysFromRepeating = new Array(300);
for (i=0; i<300; i++) {
  keepKeysFromRepeating[i] = 0;
}

function playScaleKeyboardPress(){
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
 
}
function midiPanicKeyboardPress(){
  //polysynth.releaseAll("4n");
  //polysynth.triggerRelease(pressed_notes_array, "4n")
  pressed_notes_array = [];
  polysynth.dispose();
  polysynth = new Tone.PolySynth(12, Tone.MonoSynth).toMaster();

  //polysynth.triggerRelease(pressed_notes_array);
  //console.log(".........................................................");
  for (i=0;i<keys.length;i++) {
    if (keys[i] != 128) {
      event.data = [128,i,100];
      handleMIDIMessage(event);
    }
  }
  updateInstructions("Activating MIDI Panic");
  delayedHideInstructions(); 
}
function changeSplitPoint(){
  change_split = true;
  $(document.getElementById("SplitPointButton")).addClass("greenPulse");
  updateInstructions("Changing split point active. Press another note on the keyboard to set the new split point");
  socket.emit('changeSplit');
}
function lessPiano(){
  // $('.viz-note').not('#viz-note-base').remove();
  // console.log("in less piano");
  var keys = $('.key');
  // console.log(piano_width)
  if (piano_width <= 30) {
    // console.log("limit");
    return;
  }
  // console.log(keys.length);
  piano_width -= 2;
  keys.each(function(){
    $(this).css('width', piano_width)
  });
  update_viz_div();
}
function morePiano(){
  // $('.viz-note').not('#viz-note-base').remove();
  // console.log("in more piano");
  var keys = $('.key');
  var viz_notes = $('.viz-note');
  // console.log(piano_width)
  if (piano_width >= 100) {
    // console.log("limit");
    return;
  }
  // console.log(keys.length);
  piano_width += 2;
  keys.each(function(){
    $(this).css('width', piano_width);
  });
  update_viz_div();
}

// function morePiano(){
// 	console.log("in more piano");
// 	var keys = document.getElementsByClassName("key");
// 	if (piano_width >= 100) {
// 		console.log("limit");
// 		return;
// 	}
// 	console.log(keys.length);
// 	piano_width += 2;
// 	for (var i = 0; i < keys.length; i++) {
//       keys[i].style.width=(piano_width+"px");
// 	}
 // }
 document.onkeypress = function(e) {
  if(page<2) return;
  e = e || window.event;
  // console.log(e);
   var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
   console.log("keyPress");
  if (charCode) {
      switch(String.fromCharCode(charCode)){
        //case "1": highlight(69, 1); break;
        //case "2": highlight(69, 6); break;
        //case "3": highlight(69, 11); break;
        case "|": changeSplitPoint(); break;
        case "/": changeSplitPoint(); break;
        case ".": midiPanicKeyboardPress(); break;
        case "c": playScaleKeyboardPress(); break;
        case "-": lessPiano(); updateInstructions("Zooming out from the piano"); delayedHideInstructions(); break;
        case "+": morePiano(); updateInstructions("Zooming in on the piano"); delayedHideInstructions(); break;
        case "S":
          displaySing();
          var icon = "<i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>";
          $(this).find('#menu_sing').html("On"+icon);
          break;
        case "D":
          hideSing();
          var icon = "<i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>";
          $(this).find('#menu_sing').html("Off"+icon);
          break;
      }
  }
 };

document.onkeydown = function(e) {
  if(page<2) return;
  
  e = e || window.event;
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  var chordLowerBound = 49;
  var chordUpperBound = 54;
  if (charCode >= chordLowerBound && charCode <= chordUpperBound) {
    var chordNumberPressed = charCode - 48;
    console.log("chordNumberPressed: " + chordNumberPressed);
    console.log("nameChordNoteName(chordNumberPressed):" + nameChordNoteName(chordNumberPressed));
    if ((notesPressedWithKeyboard > 0 || keyPressedWithMouse == true) && activeNote < splitPoint && keepKeysFromRepeating[charCode] == 0) {
      updateInstructions("Oops! Try playing a note with the keyboard above the split point when trying to play a chord");
      return;
    }
  }
  if (chordNumberPressed && keepKeysFromRepeating[charCode] == 0 && somethingClickedWithMouse == false && keysWasClicked == false) {
    keepKeysFromRepeating[charCode] = 1;
    somethingPressedWithKeyboard = true;
    if (keysWasClicked == false) {
      if (suggestionClicked == false) {

        titleKb = nameChordNoteName(chordNumberPressed);
        //console.log("suggestion was clicked");
        lastTitleKb = titleKb;
        suggestionClicked = true;
        unhighlightHowToChord();
        howToPlayChord(titleKb);
        bassNoteContainer[bassNote(nameChordNoteNumber(titleKb))-1] = globalInstrument.play(bassNote(nameChordNoteNumber(titleKb)));
        //console.log("bassNote(nameChordNoteNumber(titleKb))-1" + bassNote(nameChordNoteNumber(titleKb))-1);
        updateInstructions("Playing a " + titleKb + " chord");
        activeNote = currentMelodyNote;
      } else {
        titleKb = nameChordNoteName(chordNumberPressed);
        suggestionUnclicked = true;
        howToPlayChord(lastTitleKb);
        bassNoteContainer[bassNote(nameChordNoteNumber(lastTitleKb))-1].stop();
        //console.log("bassNote(nameChordNoteNumber(titleKb))-1" + bassNote(nameChordNoteNumber(titleKb))-1);
        suggestionUnclicked = false;
        howToPlayChord(titleKb);
        bassNoteContainer[bassNote(nameChordNoteNumber(titleKb))-1] = globalInstrument.play(bassNote(nameChordNoteNumber(titleKb)));
        //console.log("bassNote(nameChordNoteNumber(titleKb))-1" + bassNote(nameChordNoteNumber(titleKb))-1);
        suggestionClicked = true;
        lastTitleKb=titleKb;
        updateInstructions("Switching to the  " + titleKb + " chord");
        activeNote = currentMelodyNote;
        //howToPlayChord(title);
      }
    }
  }
};

document.onkeyup = function(e) {
  if(page<2) return;
  e = e || window.event;
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  var chordLowerBound = 49;
  var chordUpperBound = 54;
  if (charCode >= chordLowerBound && charCode <= chordUpperBound) {
    var chordNumberReleased = charCode - 48;
    console.log("chordNumberReleased: " + chordNumberReleased);
  }
  keepKeysFromRepeating[charCode] = 0;
  if (chordNumberReleased) {
    if (lastTitleKb == titleKb &&  nameChordNoteName(chordNumberReleased) == lastTitleKb && somethingClickedWithMouse == false && keysWasClicked == false) {
      //console.log("suggestion was unclicked");
      somethingPressedWithKeyboard = false;
      suggestionUnclicked = true;
      howToPlayChord(titleKb);
      suggestionClicked = false;
      //suggestionUnclicked = false;
      bassNoteContainer[bassNote(nameChordNoteNumber(titleKb))-1].stop();
      //console.log("bassNote(nameChordNoteNumber(title))-1" + bassNote(nameChordNoteNumber(titleKb))-1);

      updateInstructions("Stopped playing the chord");
      delayedHideInstructions();
      activeNote = currentMelodyNote;
    }
  }
};

// create a keyboard
var keyboard = new AudioKeys({
   polyphony: 12,
   rows: 1,
   priority: 'last'
});

keyboard.set('polyphony', 12);
keyboard.set('velocityControls', false);
keyboard.down( function(noteObject) {
  if(page<2) return;
  pressed_notes_array.push(getNoteLetter(noteObject.note));
  // do things with the note object
  notesPressedWithKeyboard++;
  console.log(noteObject.note);
  if (noteObject.note < splitPoint && (somethingClickedWithMouse == true || somethingPressedWithKeyboard == true)) {
    updateInstructions("Oops! Try playing above the split point on the computer keyboard when you have a chord playing. "
                       + "The note you just pressed is " + (splitPoint-noteObject.note) + " notes below the split point.");
    return;
  }
  //var highlightkey = document.getElementById("key_" + noteObject.note);
  $("#key_" + noteObject.note).addClass("active");
  var event = {data: []};
  event.data = [144, noteObject.note, noteObject.velocity];
  handleMIDIMessage(event);
  //synth.triggerAttack(getNoteLetter(noteObject.note), noteObject.velocity/127);
  //synth.triggerAttack(getNoteLetter(noteObject.note));
  //polysynth.triggerAttack(pressed_notes_array, undefined, noteObject.velocity/127);
  keyboardSounds[event.data[1]-1] = globalInstrument.play(event.data[1], globalInstrument.currentTime, {gain: event.data[2]/127});

});

keyboard.up( function(noteObject) {
  if(page<2) return;
  // do things with the note object
  notesPressedWithKeyboard--;
  console.log(noteObject.note);
  if (noteObject.note < splitPoint && (somethingClickedWithMouse == true || somethingPressedWithKeyboard == true)) {
    updateInstructions("");
    return;
  }
  $("#key_" + noteObject.note).removeClass("active");
  var event = {data: []};
  event.data = [128, noteObject.note, noteObject.velocity];
  handleMIDIMessage(event);
  //synth.triggerRelease();
  //polysynth.triggerRelease(getNoteLetter(noteObject.note));
  for (var i=0; i<=pressed_notes_array.length-1; i++) {
    if (pressed_notes_array[i] === getNoteLetter(noteObject.note)) {
        pressed_notes_array.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
    }
  }
  keyboardSounds[event.data[1]-1].stop();
});


