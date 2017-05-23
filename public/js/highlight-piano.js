/*******************************************************************************

	highlight-piano.js

	* contains the code for lighting the keys on the screen
	* other files may call the highlight() function defined in this file
	* highlight(key_id, color) - set the key with id to color
	* highlight(key_id) - set the key with id to original color
	* highlight() - sets all the keys to their original color
	* they may also use highlightWrongKey(key_id)
	* highlightWrongKey(key_id) - sets the border of a key to red

  *******************************************************************************/

// keep a list of all black key ids
var black_keys = createBlackKeysArray();
var numHighlightedMelodyNotes = 0;
var colorScheme = "Beginner";

// create an array of black key ids
function createBlackKeysArray(){
	var bk = [1, 3, 6, 8, 10];
	var my_black_keys = [];
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < bk.length; j++){
			my_black_keys.push((i*12)+bk[j]);
		}
	}
	return my_black_keys;
}

// returns true if key is black
function isBlackKey(k){
	if($.inArray(k, black_keys) != -1){
		return true;
	}
	return false;
}

// returns true if key is white
function isWhiteKey(k){
	var key = k%12;
	if (key == 0 || key == 2 || key == 4 || key == 5 || key == 7 || key == 9 || key == 11) {
		return true;
	}
}

// gets the color scheme from variable
function getColorScheme(c){
	switch(colorScheme){
	case 'Beginner': return getColorBeginner(c); break;
	case 'Advanced': return getColorAdvanced(c); break;
	case 'Expert': return getColorExpert(c); break;
	case 'Sunset': return getColorSunset(c); break;
	case 'Rain Forest': return getColorRainForest(c); break;
	case 'Ocean': return getColorOcean(c); break;
	default: return -1;
	}
}

// gets color from scheme
function getColor(c){
	return getColorScheme(c);
}

// handles highlighting keys
function highlight(keyid = false, color = false, pulse = false) {
  // clear all the keys if just highlight()

  if (keyid != false && color != false) {
	  //console.log("note in consideration: " + keyid);
  }
  if (keyid > 107) {
	  //console.log("Are you singing??? : " +areYouSinging);
	  return;
  }
	if(keyid == false && color == false){
		numHighlightedMelodyNotes=0;
		clearAllKeys();
	}
	else if(keyid != false && color == false) {
		// if there are no melody notes being played
		if(numActiveMelodyNotes == 0){
			// wait some time to clear notes
			if(wasNotePressed == false){
				clearNotes(keyid);
			}
		} else { // else clear key immediately
			clearNotes(keyid);
		}
	}
	else if(keyid != false && color != false) {
		// highlight(key, color) - sets key to defined color
		highlightedNotes[keyid] = color;
		if(color > 49){
			setKeyColor(keyid, getColor(color));
		}
		setKeyShadow(keyid, color);
	}
}

// used to clear the notes
function clearNotes(keyid){
	highlightedNotes[keyid] = 0;
	clearKeyBorder(keyid);
	clearKeyColor(keyid);
}

// sets all the keys on the piano to their default color
function clearAllKeys(){
	for(var i = 0; i < 108; i++){
		highlightedNotes[i] = 0;
		clearKeyColor(i);
	}
}

// clears a key to its default color
function clearKeyColor(key) {
	if(!isBlackKey(key)){ // white key
		setKeyColor(key, "#ffffff");
	} else {	// black key
		setKeyColor(key, "#000");
	}
}

// returns the current color of a pressed key
function highlightKeyColor(keyid){

  // if key is not highlighted then highlight key purple
  if(highlightedNotes[keyid] == 0){
		//alert("keyid: "+keyid+" splitPoint: "+splitPoint);
		if(keyid < splitPoint){
			//alert("inside");
    	highlight(keyid, 50);
		} else {
			highlight(keyid, 51);
		}
  }
  // else check current color of key and make darker
  else {
    // dark blue - 61
    if(highlightedNotes[keyid] < 6){
      highlight(keyid, 61);
    }
    // dark yellow - 66
    else if(highlightedNotes[keyid] < 11){
      highlight(keyid, 66);
    }
    // dark blue - 71
    else if(highlightedNotes[keyid] < 16){
      highlight(keyid, 71);
    }
    // dark orange - 76
    else if(highlightedNotes[keyid] < 21){
      highlight(keyid, 76);
    }
    // dark green - 81
    else if(highlightedNotes[keyid] < 26){
      highlight(keyid, 81);
    }
  }
}


function getMyKeyColor(keyid){
	// if key is not highlighted then highlight key purple
	if(highlightedNotes[keyid] == 0){
		if(keyid < splitPoint){
			return getColor(50);
		} else {
			return getColor(51);
		}
	}
	// else check current color of key and make darker
	else {
		// dark blue - 61
		if(highlightedNotes[keyid] < 6){
			return getColor(61);
		}
		// dark yellow - 66
		else if(highlightedNotes[keyid] < 11){
			return getColor(66);
		}
		// dark blue - 71
		else if(highlightedNotes[keyid] < 16){
			return getColor(71);
		}
		// dark orange - 76
		else if(highlightedNotes[keyid] < 21){
			return getColor(76);
		}
		// dark green - 81
		else if(highlightedNotes[keyid] < 26){
			return getColor(81);
		}
	}
}

// set the box shadow to specified color
function setKeyShadow(keyid, color){
	var scolor = '';
	if(color < 6){	// blue
		scolor = getColor(61);
	} else if(color < 11){ // yellow
		scolor = getColor(66);
	} else if(color < 16){ // blue
		scolor = getColor(71);
	} else if(color < 21){ // orange
		scolor = getColor(76);
	} else if(color < 26){ // green
		scolor = getColor(81);
	} else if (color < 31){ // red
		scolor = getColor(86);
	} else if (color < 50){ // for light color
		scolor = getColor(49);
	}
	else { // blue
		// for the dark colors
		scolor = "#000";
	}
	setKeyBorder(keyid, scolor);
}

// sets the boxshadow of a key
function setKeyBorder(keyid, color){
	if(color == "#000" && document.getElementById("key_"+keyid) != null) {
		document.getElementById("key_"+keyid).style.boxShadow = 'inset 0 1px 0px '+color+', inset 0 -1px 0px '+color+', inset 1px 0px 0px '+color+', inset -1px 0px 0px '+color+', 0 4px 3px rgba(0, 0, 0, 0.7), inset 0 -1px 0px '+color+', inset 1px 0px 0px '+color+', inset 0px 0px 28px '+color+', -3px 4px 6px rgba(0, 0, 0, 0.5';
	} else  {
		// see ledgend to the right																// border-top								// border-bottom						// border-left							// border-right								// shaddow under key					// not sure										// not sure									// shaddow around entire key		// outter shaddow of key

    //if you take out the suggestionClicked == false condition the program will error
    if (areYouSinging == false && suggestionClicked == false) {
      //console.log("areYouSinging is false");
      document.getElementById("key_"+keyid).style.boxShadow = 'inset 0 1px 0px '+color+', inset 0 -1px 0px '+color+', inset 1px 0px 0px '+color+', inset -1px 0px 0px '+color+', 0 4px 3px rgba(0, 0, 0, 0.7), inset 0 -1px 0px '+color+', inset 1px 0px 0px '+color+', inset 0px 0px 50px 4px '+color+', -3px 4px 6px rgba(0, 0, 0, 0.5';
    } else {
      if (document.getElementById("key_"+keyid) != null) {
        document.getElementById("key_"+keyid).style.boxShadow = 'inset 0 1px 0px '+color+', inset 0 -1px 0px '+color+', inset 1px 0px 0px '+color+', inset -1px 0px 0px '+color+', 0 4px 3px rgba(0, 0, 0, 0.7), inset 0 -1px 0px '+color+', inset 1px 0px 0px '+color+', inset 0px 0px 50px 4px '+color+', -3px 4px 6px rgba(0, 0, 0, 0.5';
      }
    }
  }
}

// sets a keys color by id (ex: C3)
function setKeyColor(keyid, color){
  if (areYouSinging == false) {
    document.getElementById("key_"+keyid).style.backgroundColor = color;
  } else {
    if (document.getElementById("key_"+keyid) != null) {
	    document.getElementById("key_"+keyid).style.backgroundColor = color;
    }
  }
	//console.log("my color: "+color+" and my time: "+time);
	//$('#key_'+keyid).animate({backgroundColor: color}, time);
}

// clears the border of a white key
function clearKeyBorder(keyid){
	if(isBlackKey(keyid)){
		setKeyBorder(keyid, "#000000");
	} else {
		setKeyBorder(keyid, "#ffffff");
	}
}
