/*******************************************************************************

		piano.js
		* contains the code for creating the piano with a list of keys

    *******************************************************************************/

var soundContainer;

var soundContainer1;
var soundContainer2;
var soundContainer3;
var containerIterator = 0;

var scaleSoundContainer;

var keyboardSoundContainer;

var keyPressedWithMouse = false;

function getNoteLetter(id){
  var notemod = id%12;
  var note_letter;
  switch(notemod){
  case 0:
    note_letter = "C" + id/12;
    break;
  case 1:
    note_letter = "C#" + (id-1)/12;
    break;
  case 2:
    note_letter = "D" + (id-2)/12;
    break;
  case 3:
    note_letter = "Eb" + (id-3)/12;
    break;
  case 4:
    note_letter = "E" + (id-4)/12;
    break;
  case 5:
    note_letter = "F" + (id-5)/12;
    break;
  case 6:
    note_letter = "F#" + (id-6)/12;
    break;
  case 7:
    note_letter = "G" + (id-7)/12;
    break;
  case 8:
    note_letter = "Ab" + (id-8)/12;
    break;
  case 9:
    note_letter = "A" + (id-9)/12;
    break;
  case 10:
    note_letter = "Bb" + (id-10)/12;
    break;
  case 11:
    note_letter = "B" + (id-11)/12;
    break;
  default:
    note_letter = "err";
  }
  return note_letter;
}


// default piano width
var piano_width = 42;
var scaleTimer;
var my_mode = "Composition";
$(document).ready(function(){

	// returns a span for a white key with id and note
	function getWhiteKey(id){
		return '<span class="white-key" id="key_'+id+'" draggable="false"></span>';
	}

	// returns a span for a black key with id and note
	function getBlackKey(id){
		return '<span class="black-key" id="key_'+id+'" draggable="false"></span>';
	}

	// returns a list of keys for an octave of the piano starting at C-1 = key_0
	function createPianoOctaveList(x){
		var x = x * 12;	// starting octave key id
		var str = '<li class="key" draggable="false">' +
			getWhiteKey(x) +
			'<div id="c-octave" class="unselectable" draggable="false" >'+"C"+((x/12)-1)+'</div>'+
			getBlackKey(x+1) +
			'</li>' +
			'<li class="key" draggable="false" >' +
			getWhiteKey(x+2) +
			getBlackKey(x+3) +
			'</li>' +
			'<li class="key" draggable="false">' +
			getWhiteKey(x+4) +
			'</li>' +
			'<li class="key" draggable="false">' +
			getWhiteKey(x+5) +
			getBlackKey(x+6) +
			'</li>' +
			'<li class="key" draggable="false" >' +
			getWhiteKey(x+7) +
			getBlackKey(x+8) +
			'</li>' +
			'<li class="key" draggable="false" >' +
			getWhiteKey(x+9) +
			getBlackKey(x+10) +
			'</li>' +
			'<li class="key" draggable="false" >' +
			getWhiteKey(x+11) +
			'</li>';
		return str;
	}

	// creates the piano for some number of octaves
	function createPiano(oct){
		viz_array = Array.apply(null, new Array(oct*12)).map(Number.prototype.valueOf,0);
		// console.log(viz_array);
		var piano = $('#my-piano ul');
		var keys = '';
		// create group of keys for 9 octaves
		for(var i = 0; i < oct; i++){
			keys += createPianoOctaveList(i);
		}
		piano.html(keys);
	}

	// builds the piano on select change
	function onChangeNumOctave(){
		console.log("inside on num change");
		var myselect = document.getElementById("num-oct");
		var myOption = myselect.options[myselect.selectedIndex].value;
		console.log("myoption: "+myOption);
		switch(myOption) {
		case "1": createPiano(1); break;
		case "2": createPiano(2); break;
		case "3": createPiano(3); break;
		case "4": createPiano(4); break;
		case "5": createPiano(5); break;
		case "6": createPiano(6); break;
		case "7": createPiano(7); break;
		case "8": createPiano(8); break;
		case "9": createPiano(9); break;
		default: break;
		}
	}

	// create a default piano with 9 ocates
	createPiano(9);
	create_viz_div();
	$('#num-oct').change(function(){
		onChangeNumOctave();
	});

	/* for weird hover bug */
	var e = jQuery.Event("click");

	// press
	var note = [144, 1, 100];
	e.data = note;
	handleMIDIMessage(e);

	// release
	var note = [128, 1, 100];
	e.data = note;
	handleMIDIMessage(e);

	//console.log('my split point: '+splitPoint+' with added: '+(splitPoint+10));
	//var myPoint = splitPoint+10;
	scrollKeyboard(80);

  $('.piano_top').mouseover(function () {
    if (keyPressedWithMouse == true) {
      keyPressedWithMouse = false;
    }
  });

  $('.my_piano').mouseleave(function () {
    if (keyPressedWithMouse == true) {
      keyPressedWithMouse = false;
    }
  });


	$('.key span').mouseup(function (event){
    if (keyPressedWithMouse == false) {
      return;
    }
    console.log("mouseup on keys");
    if ($(this).hasClass('active')) {
      var parsedNote = parseInt($(this).attr('id').replace('key_', ''));
      console.log("IN IF STMT");
      keyPressedWithMouse = false;
      $(this).removeClass('active');
      //remove_visual_play($(this).attr('id').replace('key_', ''));
      // release key
	    var note = [128, parsedNote, 100];
	    event.data = note;


      /*
        polysynth.triggerRelease(getNoteLetter(note[1]));
        for (var i=0; i<=pressed_notes_array.length-1; i++) {
        if (pressed_notes_array[i] === getNoteLetter(note[1])) {
        pressed_notes_array.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
        }
        }

        //setTimeout(function() {stopNote(midiNoteToFrequency(event.data[1]));},200);
        //setTimeout(function() {synth.triggerRelease();},200);
        setTimeout(function() {polysynth.triggerRelease(getNoteLetter(note[1]));},200);
      */
      //globalInstrument.play(parsedNote).stop(audioContext.currentTime + 0.5);
      soundContainer.stop();
      console.log("parsedNote: " + parsedNote);
      //synth.triggerRelease();
      //synth2.triggerRelease();
      //synth.triggerRelease();
	    setTimeout(function() {event.receivedTime = 5; handleMIDIMessage(event);},500);
    }
	})
	  .mousedown(function(event){
      var parsedNote = parseInt($(this).attr('id').replace('key_', ''));

      if (parsedNote < splitPoint && (somethingClickedWithMouse == true || somethingPressedWithKeyboard == true)) {
        updateInstructions("Oops! Try clicking a note to the right of the split point when you're playing a chord");
        return;
      }

        keyPressedWithMouse = true;
        console.log("mousedown on keys");
	      $(this).addClass('active');
	      //visual_play($(this).attr('id').replace('key_', ''));
	      //press key
	      var note = [144, parsedNote, 100];
	      event.data = note;
	      handleMIDIMessage(event);

        console.log("parsedNote: " + parsedNote);
        soundContainer = globalInstrument.play(parsedNote);
        /*
          pressed_notes_array.push(getNoteLetter(note[1]));
          //playNote(midiNoteToFrequency(event.data[1]));
          //synth.triggerAttack(getNoteLetter(note[1]));
          polysynth.triggerAttack(pressed_notes_array, undefined, 0.5);
          //synth2.triggerAttack(getNoteLetter(note[1]));
          console.log("mousedown note: " + getNoteLetter(note[1]));
        */

	    })
    .mouseleave(function (event){
      if ($(this).hasClass('active')) {
        var parsedNote = parseInt($(this).attr('id').replace('key_', ''));
        console.log("mouseleave on keys");
	      $(this).removeClass('active');
	      //remove_visual_play($(this).attr('id').replace('key_', ''));
	      // release key
	      var note = [128, parsedNote, 100];
	      event.data = note;
        //globalInstrument.play(parsedNote).stop(audioContext.currentTime + 0.5);
        soundContainer.stop();
        /*
          polysynth.triggerRelease(getNoteLetter(note[1]));
          for (var i=0; i<=pressed_notes_array.length-1; i++) {
          if (pressed_notes_array[i] === getNoteLetter(note[1])) {
          pressed_notes_array.splice(i, 1);
          // break;       //<-- Uncomment  if only the first term has to be removed
          }
          }
        */

        console.log("parsedNote: " + parsedNote);
        //stopNote(midiNoteToFrequency(event.data[1]));
        //synth.triggerRelease();
        //synth2.triggerRelease();
        console.log("mouse_leave note: " + note);
        setTimeout(function() {event.receivedTime = 5; handleMIDIMessage(event);},50);
      }
	  })
    .mouseenter(function(event){

      if (parsedNote < splitPoint && (somethingClickedWithMouse == true || somethingPressedWithKeyboard == true)) {
        updateInstructions("Oops! Try clicking a note to the right of the split point when you're playing a chord");
        return;
      }

      if ($(this).hasClass('active') == false && keyPressedWithMouse == true) {
        var parsedNote = parseInt($(this).attr('id').replace('key_', ''));
        console.log("mouseenter on keys");
	      $(this).addClass('active');
	      //visual_play($(this).attr('id').replace('key_', ''));
	      //press key
	      var note = [144, parsedNote, 100];
	      event.data = note;
        event.receivedTime = 5;
	      handleMIDIMessage(event);
        soundContainer = globalInstrument.play(parsedNote);
        console.log("parsedNote: " + parsedNote);
        /*
        //playNote(midiNoteToFrequency(event.data[1]));
        //synth.triggerAttack(getNoteLetter(note[1]));
        pressed_notes_array.push(getNoteLetter(note[1]));
        polysynth.triggerAttack(pressed_notes_array, undefined, 0.5);
        //synth2.triggerAttack(getNoteLetter(notep[1]));
        console.log("mouse enter note: " + note);
        */
      }
	  });
  // show split point
	// document.getElementById("#key_" + splitPoint.after('<div id="c-octave">' + "SP" + splitPoint + '</div>');
	var node = document.getElementById("key_" + splitPoint),
	ele = document.createElement("div");
	ele.id = "split-point";
  ele.className = "unselectable";
	ele.innerHTML = "SP";
	if (node.classList.contains("black-key")) {
		// console.log("HERE black-key");
		ele.style.right = "0%";
	}
	else {
		// console.log("HERE white-key");
		ele.right = "";
	}
	node.parentNode.insertBefore(ele, node.nextSibling);

	var viz_split = document.getElementById("viz-note-" + splitPoint);
	viz_split.style.borderLeft = "3px solid green";
  /*scaleTimer = window.setInterval(function(){
    highlightEntireScale();
    console.log("highlightEntireScale was called from interval");
    }, 5000);
  */
});

var viz_array = [];
var mousedownID = -1;

//zomm in, zomm out button presses
$(document.getElementById("zoomInButton")).click(function(){
  morePiano();
});
$(document.getElementById("zoomOutButton")).click(function(){
  lessPiano();
});
