/*******************************************************************************

	scroll-piano.js

	* contains the code for scrolling the piano
	* also handles the adjustment of key width

*******************************************************************************/


function isWhiteKey(k){
	var key = k%12
	if (key == 0 || key == 2 || key == 4 || key == 5 || key == 7 || key == 9 || key == 11) {
		return true;
	}
}

function addKeyWidth(k, fkey_width){
	var key = k%12;
	if(key == 0){
		return fkey_width;
	}
	else if(key == 5){
		return addKeyWidth(key-1, fkey_width) + fkey_width;
	}
	else if(!isWhiteKey(key)){
		return addKeyWidth(key-1, fkey_width) + fkey_width/2;
	}
	else {
		return addKeyWidth(key-2, fkey_width) + fkey_width;
	}
}

var kw = $("#my-piano ul li").width();
var keyboard_length = $("#my-piano").width();
var keyboard_upper_bound = $("#my-piano").width() - 3*kw;
var keyboard_lower_bound = 0 + 3*kw;
var ignore_chord_notes = false;
var ignore_melody_notes = false;

// scrolls the keyboard horizontally where keys are being played
function scrollKeyboard(keyid){

	//need to know the width of the key and scroll position in order to adjust scrolling
	var key_width = $("#my-piano ul li").width();
	var octave_width = 7*key_width;
	var oct_num = Math.floor(keyid/12);
	var key_position = (oct_num * octave_width);
	key_position += addKeyWidth(keyid, key_width);
	var curr_position = $("#my-piano").scrollLeft();

	// ignore chord notes but not melody notes
	// scrolling will keep pressed notes in the center
	if(!ignore_melody_notes && ignore_chord_notes) {
		if (keyid < splitPoint) {
			return;
		}
		else{
      if (entireScale == true) {
        return;
      }
			keyboard_upper_bound = (curr_position + keyboard_length/2 + octave_width);
			keyboard_lower_bound = (curr_position + keyboard_length/2 - octave_width);
			if(key_position > keyboard_upper_bound){
				var difference = key_position - keyboard_upper_bound;
				var move = curr_position + difference;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				// keyboard_lower = move + 3*key_width;
				$("#my-piano").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
			if(key_position < keyboard_lower_bound){
				var difference = keyboard_lower_bound - key_position;
				var move = curr_position - difference;
				// keyboard_lower = move + 3*key_width;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				$("#my-piano").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
	  }
	}
	else if(ignore_melody_notes && !ignore_chord_notes) {
		if (keyid > splitPoint) {
			return;
		}
		else{
			keyboard_upper_bound = (curr_position + keyboard_length/2 + octave_width);
			keyboard_lower_bound = (curr_position + keyboard_length/2 - octave_width);
			if(key_position > keyboard_upper_bound){
				var difference = key_position - keyboard_upper_bound;
				var move = curr_position + difference;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				// keyboard_lower = move + 3*key_width;
				$("#my-piano").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
			if(key_position < keyboard_lower_bound){
				var difference = keyboard_lower_bound - key_position;
				var move = curr_position - difference;
				// keyboard_lower = move + 3*key_width;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				$("#my-piano").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
		}
	}
	else{
		keyboard_upper_bound = curr_position + keyboard_length - 6*key_width;
		keyboard_lower_bound = curr_position + 3*key_width;
		if(key_position > keyboard_upper_bound){
			var difference = key_position - keyboard_upper_bound;
			var move = curr_position + difference;
			// keyboard_upper_bound = (move+keyboard_length) - 3*key_width;
			// keyboard_lower_bound = move + 3*key_width;
			$("#my-piano").animate({scrollLeft: move}, {queue: false, duration: 500} );
		}
		if(key_position < keyboard_lower_bound){
			var difference = keyboard_lower_bound - key_position;
			var move = curr_position - difference;
			// keyboard_lower_bound = move + 3*key_width;
			// keyboard_upper_bound = (move+keyboard_length) - 3*key_width;
			$("#my-piano").animate({scrollLeft: move}, {queue: false, duration: 500} );
		}
	}
}






/*

function addKeyWidth(k, fkey_width){
	var key = k%12;
	if(key == 0){
		return fkey_width;
	}
	else if(key == 5){
		return addKeyWidth(key-1, fkey_width) + fkey_width;
	}
	else if(!isWhiteKey(key)){
		return addKeyWidth(key-1, fkey_width) + fkey_width/2;
	}
	else {
		return addKeyWidth(key-2, fkey_width) + fkey_width;
	}
}

var kw = $("#my-piano ul li").width();
var keyboard_length = $("#my-piano ul").width();
var keyboard_upper_bound = $("#my-piano ul").width() - 3*kw;
var keyboard_lower_bound = 0 + 3*kw;
var ignore_chord_notes = false;
var ignore_melody_notes = false;
// scrolls the keyboard horizontally where keys are being played
function scrollKeyboard(keyid){

	//need to know the width of the key and scroll position in order to adjust scrolling
	var key_width = $("#my-piano ul li").width();
	var octave_width = 7*key_width;
	var oct_num = Math.floor(keyid/12);
	var key_position = (oct_num * octave_width);
	key_position += addKeyWidth(keyid, key_width);
	var curr_position = $("#my-piano ul").scrollLeft();
	//alert(keyid);
	// ignore chord notes but not melody notes
	// scrolling will keep pressed notes in the center
	if(!ignore_melody_notes && ignore_chord_notes) {
		if (keyid < splitPoint) {
			return;
		}
		else{
			keyboard_upper_bound = (curr_position + keyboard_length/2 + octave_width);
			keyboard_lower_bound = (curr_position + keyboard_length/2 - octave_width);
			if(key_position > keyboard_upper_bound){
				var difference = key_position - keyboard_upper_bound;
				var move = curr_position + difference;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				// keyboard_lower = move + 3*key_width;
				$("#my-piano ul").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
			if(key_position < keyboard_lower_bound){
				var difference = keyboard_lower_bound - key_position;
				var move = curr_position - difference;
				// keyboard_lower = move + 3*key_width;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				$("#my-piano ul").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
	  }
	}
	else if(ignore_melody_notes && !ignore_chord_notes) {
		if (keyid > splitPoint) {
			return;
		}
		else{
			keyboard_upper_bound = (curr_position + keyboard_length/2 + octave_width);
			keyboard_lower_bound = (curr_position + keyboard_length/2 - octave_width);
			if(key_position > keyboard_upper_bound){
				var difference = key_position - keyboard_upper_bound;
				var move = curr_position + difference + 6*key_width;
        console.log("moving the pinaonnooo up");
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				// keyboard_lower = move + 3*key_width;
				$("#my-piano ul").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
			if(key_position < keyboard_lower_bound){
				var difference = keyboard_lower_bound - key_position;
				var move = curr_position - difference - 6*key_width;
        console.log("moving the pinaonnooo down");
				// keyboard_lower = move + 3*key_width;
				// keyboard_upper = (move+keyboard_length) - 3*key_width;
				$("#my-piano ul").animate({scrollLeft: move}, {queue: false, duration: 500} );
			}
		}
	}
	else{
		keyboard_upper_bound = curr_position + keyboard_length - 3*key_width;
		keyboard_lower_bound = curr_position + 3*key_width;
		if(key_position > keyboard_upper_bound){
			var difference = key_position - keyboard_upper_bound;
			var move = curr_position + difference;
			// keyboard_upper_bound = (move+keyboard_length) - 3*key_width;
			// keyboard_lower_bound = move + 3*key_width;
			$("#my-piano ul").animate({scrollLeft: move}, {queue: false, duration: 500} );
		}
		if(key_position < keyboard_lower_bound){
			var difference = keyboard_lower_bound - key_position;
			var move = curr_position - difference;
			// keyboard_lower_bound = move + 3*key_width;
			// keyboard_upper_bound = (move+keyboard_length) - 3*key_width;
			$("#my-piano ul").animate({scrollLeft: move}, {queue: false, duration: 500} );
		}
	}
}
*/
