function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

var clearLED = 0;
window.setInterval(myTimer, 200); // milli

function compareHighlightedArr(){
  for (var i = 0; i < highlightedNotes.length; i++) {
    if(highlightedNotes[i] !== previouslyHighlightedNotes[i]) {
      if(highlightedNotes[i] == 0){                            // Released note
        socket.emit("serialHighlight", "Released Note", i);
      }
      else if(previouslyHighlightedNotes[i] == 50 || previouslyHighlightedNotes[i] == 51){ // If pressed note: so as to not overwrite the previously pressed note and held note with a suggestion
        // do nothing
      }
      else{                                                   // Highlight
        var arrayOfStrings = getColor(highlightedNotes[i]).split('(');
        arrayOfStrings = arrayOfStrings[1].split(')');
        arrayOfStrings = arrayOfStrings[0].split(',');
        arrayOfStrings[1] = arrayOfStrings[1].slice(1, -1);
        arrayOfStrings[2] = arrayOfStrings[2].slice(1, -1);
        // console.log(arrayOfStrings);
        // console.log(arrayOfStrings[0]/360);
        // console.log(arrayOfStrings[1]/100);
        // console.log(arrayOfStrings[2]/100);
        arrayOfStrings = hslToRgb(parseInt(arrayOfStrings[0])/360,parseInt(arrayOfStrings[1])/100,parseInt(arrayOfStrings[2])/100);
        // console.log('!!!!!! ');
        // console.log(arrayOfStrings);
        socket.emit('Highlight', i, arrayOfStrings);
      }
      previouslyHighlightedNotes[i] = highlightedNotes[i];
    }
  }
}

function myTimer() {
  // console.log("numActiveChordNotes" + numActiveChordNotes + "numActiveMelodyNotes" + numActiveMelodyNotes);
  if ((clearLED % 5) == 0 && numActiveChordNotes == 0 && numActiveMelodyNotes == 0) {
    socket.emit('clearAllKeys');
  }
  compareHighlightedArr();
  ++clearLED;
  	// highlightedNotesString = "";
  	// for (i=0; i<highlightedNotes.length; i++) {
  	// 	if (highlightedNotes[i] == 0) {
  	// 		highlightedNotesString += "-";
  	// 	} else {
  	// 		highlightedNotesString += "__" + nameNote(i) + ": " + highlightedNotes[i] + "__";
  	// 	}
  	// 	highlightedNotesString += " ";
  	// }
    // console.log("highlightedNotesString: " + highlightedNotesString);
}
