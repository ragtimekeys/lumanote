$(document).ready(function(){


  function titleCase(str) {
    if (str != null) {
      var splitStr = str.toLowerCase().split('_');
      for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      // Directly return the joined string
      return splitStr.join(' ');
    }
  }


  $("#main-contents").click( function() {
    if (menu_item_opened != null) closeDropdown(menu_item_opened);
  });
	var menu_open = 0;
	var menu_item_opened;
	var icon = "<i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>";

  //var device_dropdown = document.getElementById('devices-dropdown');
  //document.getElementById('dev').innerHTML = 'Choose a Midi Device...' + icon;

	$('.menu-left li').map(function(){

		var dropdown = $(this).find('.dropdown');
		var scaleTab = $(this).children('#mode');
		var keyTab = $(this).children('#key');
		var genreTab = $(this).children('#singNote');
		var instrumentsTab = $(this).children('#sounds');
		var levelTab = $(this).children('#level-list');
		// For instruments
		if (instrumentsTab.length > 0) {
			var previousInstrument = titleCase(localStorage.getItem("instrument"));
			if (previousInstrument != null) {
				previousInstrument = previousInstrument.split('_').join(' ');
				$(this).find('.menu-select').html(previousInstrument + icon);
			}
			else {
				var title = dropdown.find('li:first-of-type').html();
				$(this).find('.menu-select').html(title + icon);
			}
		}
		// For Key
		else if (keyTab.length > 0) {
			var previousKey = localStorage.getItem("key-sig");
			if (previousKey != null) {
				$(this).find('.menu-select').html(previousKey + icon);
				console.log("found " + previousKey);
				setCircleText(previousKey);
			}
			else {
				var title = dropdown.find('li:first-of-type').html();
				$(this).find('.menu-select').html(title + icon);
				console.log("localStorage notfound giving whats in dropdown " + title);
				setCircleText(title);
			}
		}
		// For scale
		else if (scaleTab.length > 0) {
			var previousScale = localStorage.getItem("scale-mode");
			if (previousScale != null) {
				$(this).find('.menu-select').html(previousScale + icon);
        console.log("yo we got here yo");
			}
			else {
				var title = dropdown.find('li:first-of-type').html();
				$(this).find('.menu-select').html(title + icon);
        console.log("we got to this point in the code");
			}
		}
		// For genre
		else if (genreTab.length > 0) {
			var previousGenre = localStorage.getItem("genre");
			if (previousGenre != null) {
				$(this).find('.menu-select').html(previousGenre + icon);
			}
			else {
				var title = dropdown.find('li:first-of-type').html();
				$(this).find('.menu-select').html(title + icon);
			}
		}
		// For level
		else if (levelTab.length > 0) {
			var previousLevel = localStorage.getItem("level");
			if (previousLevel != null) {
				$(this).find('.menu-select').html(previousLevel + icon);
				colorScheme = previousLevel;
			}
			else {
				var title = dropdown.find('li:first-of-type').html();
				$(this).find('.menu-select').html(title + icon);
			}
		}
		else {
			var title = dropdown.find('li:first-of-type').html();
			$(this).find('.menu-select').html(title + icon);
		}
	});

	// function handlerIn(){
	// 	var current_menu = $(this).parent();
	// 	// console.log(current_menu);
	// 	var dropdown = current_menu.find('ul');
	// 	// console.log(dropdown);
	// 	openDropdown(dropdown);
	// }
	// function handlerOut(){
	// 	var current_menu = $(this).parent();
	// 	console.log(current_menu);
	// 	var dropdown = current_menu.find('ul');
	// 	console.log(dropdown);
	// 	if (dropdown.is(':hover')) {
	// 		console.log('out ul in li hover');
	// 	}
	// 	else if (dropdown.parent(':hover')) {
	// 		console.log('parent hover');
	// 	}
	// 	else
	// 		closeDropdown(dropdown);
	// }
	// function handlerInList(){
	//
	// }
	// function handlerOutList(){
	// 	var li = $(this);
	// 	var ul = $(this).parent();
	// 	var menu_li = ul.parent();
	// 	// console.log(li);
	// 	// console.log(ul);
	// 	if (ul.is(':hover')) {
	// 		console.log('out li hover');
	// 	}
	// 	else if (menu_li.is(':hover')) {
	//
	// 	}
	// 	else
	// 		closeDropdown(ul);
	// }
	//
	// function handlerInMenu(){
	// 	var current_menu = $(this);
	// 	// console.log(current_menu);
	// 	var dropdown = current_menu.children('ul');
	// 	// console.log(dropdown);
	// 	openDropdown(dropdown);
	// }
	// function handlerOutMenu(){
	// 	console.log("OUT Menu");
	// 	var current_menu = $(this);
	// 	// console.log(current_menu);
	// 	var dropdown = current_menu.children('ul');
	// 	// console.log(dropdown);
	// 	if (dropdown.is(':hover')) {
	// 		console.log('out ul in li hover');
	// 	}
	// 	else
	// 		closeDropdown(dropdown);
	// }

	// $('#menu-top .transition-3s').hover(handlerInMenu,handlerOutMenu);
	// $('.menu-select').hover(handlerIn,handlerOut);
	// $('#menu-top ul li ul li').hover(handlerInList,handlerOutList);
	// $('#menu-top li ul li').hover(handlerInList,handlerOutList);
/*
  $('.dev-drop').click(function(){
    var current_menu = $(this).parent();
    var dropdown = current_menu.find('ul');
    if(menu_open>0 && dropdown[0] != menu_item_opened[0]){
      closeDropdown(menu_item_opened);
    }
    if (dropdown.hasClass('active')){
      closeDropdown(dropdown);
      --menu_open;
    }
    else{
      openDropdown(dropdown);
      menu_item_opened = dropdown;
      ++menu_open;
    }
  });
*/
	$('.menu-select').click(function(){
		var current_menu = $(this).parent();
		console.log(current_menu);
		var dropdown = current_menu.find('ul');
		console.log(dropdown);
		console.log(menu_item_opened);
		console.log(dropdown[0]);
		// console.log(menu_item_opened[0]);
		if(menu_open>0 && dropdown[0] != menu_item_opened[0]){
			closeDropdown(menu_item_opened);
		}
		if (dropdown.hasClass('active')){
			closeDropdown(dropdown);
			--menu_open;
		}
		else{
			openDropdown(dropdown);
			menu_item_opened = dropdown;
			++menu_open;
		}
	});


	/*
	  $('.menu-select ul').hover(function(){
		var current_menu = $(this).parent();
		var dropdown = current_menu.find('ul');
		if (dropdown.hasClass('active')){
		closeDropdown(dropdown);
		}
		else{
		openDropdown(dropdown);
		}
	  })*/
	function openDropdown(dropdown){
		dropdown.parent().find('i').removeClass('fa-caret-down');
		dropdown.parent().find('i').addClass('fa-caret-up');
		dropdown.addClass('active');
		dropdown.slideDown(300);
	}
	function closeDropdown(dropdown){
		dropdown.parent().find('i').removeClass('fa-caret-up');
		dropdown.parent().find('i').addClass('fa-caret-down');
		dropdown.removeClass('active');
		dropdown.slideUp(300);
	}
	// setCircleText("C");

	function whatMenu(t){
		// for key menu
		if(t == 'C (Am)' ||
			 t == 'Db (Bbm)' ||
			 t == 'D (Bm)' ||
			 t == 'Eb (Cm)' ||
			 t == 'E (C#m)' ||
			 t == 'F (Dm)' ||
			 t == 'F# (D#m)' ||
			 t == 'G (Em)' ||
			 t == 'Ab (Fm)' ||
			 t == 'A (F#m)' ||
			 t == 'Bb (Gm)' ||
			 t == 'B (G#m)'){
		 	setCircleText(t);
		}
		// for level menu
		else if(t == "Beginner" || t == "Advanced" || t == "Expert" || t == "Sunset" || t == "Rain Forest" || t == "Ocean"){
			colorScheme = t;
			localStorage.setItem("level", colorScheme);
      updateInstructions("New theme '" + t + "' was selected");
		}
		else if(t == "Composition" || t == "Chords" || t == "Freestyle"){
			updateInstructions("Mode changed to "+t);
      delayedHideInstructions();
			my_mode = t;
      setMode(t);
		}
    
    else if (t == "Acoustic Grand Piano"
             || t == "Choir Aahs"
             || t == "Harpsichord"
             || t == "Synth Drum"
             || t == "Accordion"
             || t == "Tuba"
             || t == "Tinkle Bell"
             || t == "String Ensemble 1"
             || t == "Music Box"
             || t == "Acoustic Guitar Nylon"
             || t == "Cello"
             || t == "Trumpet"
             || t == "English Horn") {
      updateInstructions("Instrument changed to " + t);
      delayedHideInstructions();
      console.log("Instrument changed to " + t);
      console.log("Instrument changed to " + t.replace(/ /g, "_").toLowerCase());

      var convertedString = t.toLowerCase().replace(/ /g, "_");
      
      Soundfont.instrument(sfAudioContext, convertedString).then(function (piano) {
        globalInstrument = piano;
      });
      if (currentMode != "Freestyle") {
        var tempMode = currentMode;
        setMode("Freestyle");
        updateInstructions("Loading...");
        setTimeout(function() {
          setMode(tempMode);
          updateInstructions("Instrument changed to " + t);
        },300);
      }
    }
	}

	// used for key click menu
	$('.dropdown li').click(function(){
		//alert($('.dropdown li').attr('id'));
		var title = $(this).html();
		whatMenu(title);

		$(this).parent().parent().find('.menu-select').html(title + icon);
		closeDropdown($(this).parent());
	});
/*
  // used for key click menu
  $('.dd').on('click', 'li', function(){
    var device = $(this).html();
    
    $(this).parent().parent().find('.dev-drop').html(device + icon);
    closeDropdown($(this).parent());
  });
  */
  $('#midipanic').click(function(){
    //polysynth.releaseAll("4n");
    //polysynth.triggerRelease(pressed_notes_array, "4n")
    pressed_notes_array = [];
    polysynth.dispose();
    polysynth = new Tone.PolySynth(12, Tone.MonoSynth).toMaster();

    //polysynth.triggerRelease(pressed_notes_array);
    console.log(".........................................................");
    for (i=0;i<keys.length;i++) {
      if (keys[i] != 128) {
        event.data = [128,i,100];
        handleMIDIMessage(event);
      }
    }
    updateInstructions("Activating MIDI Panic");
    delayedHideInstructions();
  });

	/*
		var synth_instruments = [];
		var string_instruments = [];
		var percussion_instruments = [];
		var wind_instruments = [];
		var miscellaneous_instruments = [];
		$.getJSON( '../instruments.json', function( data ) {
		for (i = 0; i < data.length; i++) {
		if (data[i].includes("synth")){
		synth_instruments.push(data[i]);
		}
		else if( data[i].includes("guitar") || data[i].includes("banjo") || data[i].includes("cello") ||
		data[i].includes("bass") || data[i].includes("dulcimer") || data[i].includes("fiddle") ||
		data[i].includes("koto") || data[i].includes("harp") || data[i].includes("strings") ||
		data[i].includes("shamisen") || data[i].includes("sitar") || data[i].includes("string") ||
		data[i].includes("violin") || data[i].includes("viola") ){
		string_instruments.push(data[i]);
		}
		else if(data[i].includes("piano") || data[i].includes("celesta") || data[i].includes("accordion") ||
		data[i].includes("agogo") || data[i].includes("drum") || data[i].includes("glockenspiel") ||
		data[i].includes("harpsichord") || data[i].includes("kalimba") || data[i].includes("marimba") ||
		data[i].includes("tom") || data[i].includes("cymbal") || data[i].includes("drums") ||
		data[i]. includes("timpani") || data[i].includes("bells") || data[i].includes("bell") ||
		data[i].includes("vibraphone") || data[i].includes("woodblock") || data[i].includes("xylophone")){
		percussion_instruments.push(data[i]);
		}
		else if(data[i].includes("sax") || data[i].includes("bagpipe") || data[i].includes("bassoon") ||
		data[i].includes("brass") || data[i].includes("bassoon") || data[i].includes("organ") ||
		data[i].includes("clarinet") || data[i].includes("clavinet") || data[i].includes("horn") ||
		data[i].includes("flute") || data[i].includes("harmonica") || data[i].includes("trumpet") ||
		data[i].includes("oboe") || data[i].includes("ocarina") || data[i].includes("piccolo") ||
		data[i].includes("shakuhachi") || data[i].includes("shanai") || data[i].includes("trombone") ||
		data[i].includes("tuba")){
		wind_instruments.push(data[i]);
		}
		else{
		miscellaneous_instruments.push(data[i]);
		}
		}
		});
		$('#popular').click(function(){
		$('.window-contents').css("display", "none");


		$('#window-contents-popular').show();
		$('#window-contents-popular').css("display", "block")
		$('#window-contents-popular').css("pointer-events", "cursor")

		$('#miscellaneous').css("color", "white")
		$('#winds').css("color", "white")
		$('#percussion').css("color", "white")
		$('#strings').css("color", "white")
		$('#synths').css("color", "white")
		$('#popular').css("color", "#EA7C6B")
		});
		$('#synths').click(function(){
		$('.window-contents').css("display", "none");


		$('#window-contents-synths').show();
		$('#window-contents-synths').css("display", "block")
		$('#window-contents-synths').css("pointer-events", "cursor")

		$('#miscellaneous').css("color", "white")
		$('#winds').css("color", "white")
		$('#percussion').css("color", "white")
		$('#strings').css("color", "white")
		$('#popular').css("color", "white")
		$('#synths').css("color", "#EA7C6B")
		});
		$('#strings').click(function(){
		$('.window-contents').css("display", "none");


		$('#window-contents-strings').show();
		$('#window-contents-strings').css("display", "block")
		$('#window-contents-strings').css("pointer-events", "cursor")

		$('#miscellaneous').css("color", "white")
		$('#winds').css("color", "white")
		$('#percussion').css("color", "white")
		$('#synths').css("color", "white")
		$('#popular').css("color", "white")
		$('#strings').css("color", "#EA7C6B")
		});
		$('#percussion').click(function(){
		$('.window-contents').css("display", "none");


		$('#window-contents-percussion').show();
		$('#window-contents-percussion').css("display", "block")
		$('#window-contents-percussion').css("pointer-events", "cursor")

		$('#miscellaneous').css("color", "white")
		$('#winds').css("color", "white")
		$('#synths').css("color", "white")
		$('#strings').css("color", "white")
		$('#popular').css("color", "white")
		$('#percussion').css("color", "#EA7C6B")
		});
		$('#winds').click(function(){
		$('.window-contents').css("display", "none");
		$('#window-contents-winds').show();
		$('#window-contents-winds').css("display", "block")
		$('#window-contents-winds').css("pointer-events", "cursor")

		$('#miscellaneous').css("color", "white")
		$('#synths').css("color", "white")
		$('#strings').css("color", "white")
		$('#percussion').css("color", "white")
		$('#popular').css("color", "white")
		$('#winds').css("color", "#EA7C6B")
		});
		$('#miscellaneous').click(function(){
		$('.window-contents').css("display", "none");


		$('#window-contents-miscellaneous').show();
		$('#window-contents-miscellaneous').css("display", "block")
		$('#window-contents-miscellaneous').css("pointer-events", "cursor")

		$('#synths').css("color", "white")
		$('#strings').css("color", "white")
		$('#percussion').css("color", "white")
		$('#winds').css("color", "white")
		$('#popular').css("color", "white")
		$('#miscellaneous').css("color", "#EA7C6B")
		});
		$('#menu-settings .x-button').click(function(){
		$('#menu-settings').slideUp(200);
		$('#menu-top a').removeClass('active');
		})
	*/
});
