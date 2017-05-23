var page = 0;
$("#main").ready(function(){
  if (localStorage.getItem("instrument") != null) {
     Soundfont.instrument(sfAudioContext, localStorage.getItem("instrument").replace(/ /g, "_").toLowerCase()).then(function (piano) {
       globalInstrument = piano;
     });
  } else {
      Soundfont.instrument(sfAudioContext, "acoustic_grand_piano").then(function (piano) {
        globalInstrument = piano;
    });
  }
  var id = document.getElementById("main").getAttribute("pag");
  console.log(id);
  if(id == 3) page = 3;
  else page = 0;
});
var loaderUp = function(){
  $(".lm-loader p, .lm-loader div").animate({opacity: 0}, 700, "swing");
  $(".lm-loader").delay(500).animate({top: "-100%"}, 1000, "swing");
  $(".midi-device-setup p, .midi-device-setup div, .midi-device-setup ul").delay(700).animate({opacity:1}, 1000, "swing");
  $(".midi-device-setup").delay(500).animate({top: "0%"}, 1000, "swing");
  page++;
}
var midiUp = function(){
  $(".midi-device-setup p, .midi-device-setup div, .midi-device-setup ul").animate({opacity: 0}, 700, "swing");
  $(".midi-device-setup").delay(500).animate({top: "-100%"}, 1000, "swing");
  $(".qwerty-usage p, .qwerty-usage div").delay(700).animate({opacity:1}, 1000, "swing");
  $(".qwerty-usage").delay(500).animate({top: "0%"}, 1000, "swing");
  page++;
}
var qwertyUsage = function(){
  $(".qwerty-usage p, .qwerty-usage div").animate({opacity: 0}, 700, "swing");
  $(".qwerty-usage").delay(500).animate({top: "-100%", opacity: 0}, 1000, "swing");
  page++;
}

$(document).ready(function(){
  $('#start-button').click(function(){
    $(".lm-loader p, .lm-loader div").animate({opacity: 0}, 700, "swing");
    $(".lm-loader").delay(500).animate({top: "-100%"}, 1000, "swing");
    $(".midi-device-setup p, .midi-device-setup div, .midi-device-setup form").delay(700).animate({opacity:1}, 1000, "swing");
    $(".midi-device-setup").delay(500).animate({top: "0%"}, 1000, "swing");
    setTimeout( function() {
      $('#ivideo').attr('src', '');
    }, 1500);
    //console.log("clicked");
    //$(".lm-loader").delay(1000).addClass('hidden');
    page++;

    /*
    console.log("playing empty buffer");
    //audioContext = new AudioContext();
    // create empty buffer
    var fakeBuffer = audioContext.createBuffer(1, 1, 22050);
    var fakeSource = audioContext.createBufferSource();
    fakeSource.buffer = fakeBuffer;
    // connect to output (your speakers)
    fakeSource.connect(audioContext.destination);
    // play the file
    fakeSource.start(0);
    */
    /*
    if (localStorage.getItem("instrument") != null) {
      Soundfont.instrument(sfAudioContext, localStorage.getItem("instrument").replace(/ /g, "_").toLowerCase()).then(function (piano) {
        globalInstrument = piano;
      });
    } else {
      Soundfont.instrument(sfAudioContext, "acoustic_grand_piano").then(function (piano) {
        globalInstrument = piano;
      });
    }
    */
    /*
    setTimeout(function() {
		  if((fakeSource.playbackState === fakeSource.PLAYING_STATE || fakeSource.playbackState === fakeSource.FINISHED_STATE)) {
			  console.log("you're unlocked and able to play synthesized sounds");
		  }
	  }, 300);
    */

  });
  $("#midi-start-button").click(function(){
    //$(".midi-device-setup p, .midi-device-setup div, .midi-device-setup form").animate({opacity: 0}, 700, "swing");
    //$(".midi-device-setup").delay(500).animate({top: "-100%", opacity: 0}, 1000, "swing");
    //console.log("midi-device button clicked");
    //page++;
    midiUp();
  });
  $("#qwerty-button").click(function(){
    qwertyUsage();
  });
  $(document).keypress(function(e) {
    if (e.which == 32 && page == 0) {
      loaderUp();
    }
    else if(e.which == 32 && page == 1){
      midiUp();
    }
    else if(e.which == 32 && page == 2){
      qwertyUsage();
    }
  });
});
