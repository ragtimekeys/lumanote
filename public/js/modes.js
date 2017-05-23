var currentMode = "Composition";

function setMode(mode) {
  currentMode = mode;
  /*
  switch(mode) {
  case "Composition":
    currentMode = 0;
    break;
  case "Chords":
    currentMode = 1;
    break;
  case "Freestyle":
    currentMode = 2;
    break;
  default:
    break;
  }
  */
  console.log("the new mode is set to " + mode);
  my_mode = mode;
  var mychords = document.getElementById('mychords');
  var allkeys = document.getElementById('inKeyKeys');
  var menuitemmode = document.getElementById('menuitem-mode');
  var menuitemkey = document.getElementById('menuitem-key');
  var menuitemsing = document.getElementById('menuitem-sing');
  var menuitemsounds = document.getElementById('menuitem-sounds');
  var menuitemtheme = document.getElementById('menuitem-theme');
  switch (mode) {
  case "Composition":
    clearCircleColors();
    splitPoint = localStorage.getItem("split-point");
    updateSplitPoint(localStorage.getItem("split-point"));
    mychords.style.visibility = 'visible';
    allkeys.style.visibility = 'visible';

    menuitemmode.style.visibility = 'visible';
    menuitemkey.style.visibility = 'visible';
    menuitemsing.style.visibility = 'visible';
    menuitemsounds.style.visibility = 'visible';
    menuitemtheme.style.visibility = 'visible';
    break;
  case "Chords":
    clearCircleColors();
    updateSplitPoint(107);
    splitPoint = 107;
    mychords.style.visibility = 'visible';
    allkeys.style.visibility = 'visible';

    menuitemmode.style.visibility = 'visible';
    menuitemkey.style.visibility = 'visible';
    menuitemsing.style.visibility = 'collapse';
    menuitemsounds.style.visibility = 'visible';
    menuitemtheme.style.visibility = 'visible';
    break;
  case "Freestyle":
    updateSplitPoint(107);
    splitPoint = 107;
    mychords.style.visibility = 'hidden';
    allkeys.style.visibility = 'hidden';

    menuitemmode.style.visibility = 'visible';
    menuitemkey.style.visibility = 'collapse';
    menuitemsing.style.visibility = 'collapse';
    menuitemsounds.style.visibility = 'visible';
    menuitemtheme.style.visibility = 'visible';
    break;

  case "Acoustic Grand Piano":
  case "Choir Aahs":
  case "Harpsichord":
  case "Synth Drum":
  case "Accordion":
  case "Tuba":
  case "Tinkle Bell":
  case "String Ensemble 1":
  case "Music Box":
  case "Acoustic Guitar Nylon":
  case "Cello":
  case "Trumpet":
  case "English Horn":

    /*
      if (currentMode == "Composition" || "Chords") {
      setMode("Freestyle");
      updateInstructions("Loading...");
      setTimeout(function() {
        setMode(currentMode);
        updateInstructions("Instrument changed to " + mode);
      },300);
    }
    */

    break;
  }
}
