/*******************************************************************************

	oscillator.js
	* contains the code related to creating sound with oscillators

*******************************************************************************/

var context = new AudioContext(), oscillators = {};
var ac = new AudioContext();


// convert a mdid note to a frequency
function midiNoteToFrequency (note) {
	return Math.pow(2, ((note - 69) / 12)) * 440;
}

// start the oscillator for specified frequency
function playNote (frequency) {
	oscillators[frequency] = context.createOscillator();
	oscillators[frequency].frequency.value = frequency;
	oscillators[frequency].connect(context.destination);
	oscillators[frequency].start(context.currentTime);
}

// stop the oscillator for the specified frequency
function stopNote (frequency) {
	oscillators[frequency].stop(context.currentTime);
	oscillators[frequency].disconnect();
}

var autoFilter = new Tone.AutoFilter("4n");
var autoFilter2 = new Tone.AutoFilter("4n");

autoFilter2.filter.type = "highpass";
autoFilter2.filter.frequency = "20";

var pressed_notes_array = [];

//var synth = new Tone.DuoSynth().toMaster();
var polysynth = new Tone.PolySynth(12, Tone.MonoSynth).toMaster();

/*
var synth = new Tone.Synth({
"oscillator" : {
"type" : "sine"
},
"envelope" : {
"attack" : 0.01,
"decay" : 0.2,
"sustain" : 0.5,
"release" : 0.6,
}
}).toMaster();

var synth2 = new Tone.Synth({
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.01,
"decay" : 0.2,
"sustain" : 0.5,
"release" : 0.6,
}
}).toMaster();

synth.oscillator.connect(autoFilter).start();
synth.oscillator.connect(autoFilter2).start();

synth2.ocillator.connect(autoFilter).start();
synth2.ocillator.connect(autoFilter2).start();
*/
