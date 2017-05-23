/*******************************************************************************

	highlight-themes.js

	* contains the lighting themes

*******************************************************************************/


/**
 * COLORING SCHEME FOR BEGINNER USERS
 */

 function getColorBeginner(c){
  switch(c){
 	 // blue
 	 // 206 - 228
 	 case 1: return 'hsl(206, 96%, 82%)'; break; // Bright Blue
 	 case 2: return 'hsl(206, 96%, 85%)'; break;
 	 case 3: return 'hsl(206, 96%, 90%)'; break;
 	 case 4: return 'hsl(206, 96%, 92%)'; break;
 	 case 5: return 'hsl(206, 96%, 94%)'; break; // Light Blue
 	 // yellow colors
 	 case 6: return 'hsl(228, 96%, 82%)'; break; 	// Bright Blue
 	 case 7: return 'hsl(228, 96%, 85%)'; break;
 	 case 8: return 'hsl(228, 96%, 90%)'; break;
 	 case 9: return 'hsl(228, 96%, 92%)'; break;
 	 case 10: return 'hsl(228, 96%, 94%)'; break;	// Light Blue
 	 // blue colors
 	 case 11: return 'hsl(228, 96%, 82%)'; break; // Bright Blue
 	 case 12: return 'hsl(228, 96%, 85%)'; break;
 	 case 13: return 'hsl(228, 96%, 90%)'; break;
 	 case 14: return 'hsl(228, 96%, 92%)'; break;
 	 case 15: return 'hsl(228, 96%, 94%)'; break; // Light Blue
 	 // orange
 	 case 16: return 'hsl(28, 96%, 60%)'; break; // Bright Orange
 	 case 17: return 'hsl(28, 96%, 61%)'; break;
 	 case 18: return 'hsl(28, 96%, 62%)'; break;
 	 case 19: return 'hsl(28, 96%, 63%)'; break;
 	 case 20: return 'hsl(28, 96%, 64%)'; break; // Light Orange
 	 // green
 	 case 21: return 'hsl(228, 96%, 82%)'; break; 	// Bright Blue
 	 case 22: return 'hsl(228, 96%, 85%)'; break;
 	 case 23: return 'hsl(228, 96%, 90%)'; break;
 	 case 24: return 'hsl(228, 96%, 92%)'; break;
 	 case 25: return 'hsl(228, 96%, 94%)'; break; 	// Light Blues
 	 // red colors
 	 case 26: return 'hsl(0, 96%, 60%)'; break; // Bright Red
 	 case 27: return 'hsl(0, 96%, 61%)'; break;
 	 case 28: return 'hsl(0, 96%, 62%)'; break;
 	 case 29: return 'hsl(0, 96%, 63%)'; break;
 	 case 30: return 'hsl(0, 96%, 64%)'; break; // Light Red
 	 // pressed chord keys
   case 49: return 'hsl(206, 96%, 85%)'; break; // light color for showing key
 	 case 50: return 'hsl(28, 96%, 50%)'; break;	// color current chord notes
 	 case 51: return 'hsl(206, 96%, 50%)'; break;	// color current melody notes

 	 // dark colors
 	 case 61: return 'hsl(206, 96%, 50%)'; break; 	// Dark Blue
 	 case 66: return 'hsl(206, 96%, 50%)'; break; 	// Dark Blue
 	 case 71: return 'hsl(206, 96%, 50%)'; break; 	// Dark Blue
 	 case 76: return 'hsl(28, 96%, 50%)'; break; 	// Dark Orange
 	 case 81: return 'hsl(206, 96%, 50%)'; break; 	// Dark Blue
 	 case 86: return 'hsl(0, 100%, 50%)'; break; 		// Dark Red
 	 // default - color not in range
 	 default: return -1; break;
  }
 }

 /**
  * COLORING ADVANCED FOR BEGINNER USERS
  */
 function getColorAdvanced(c){
 	switch(c){
 		// blue
 		// 206 - 228
 		case 1: return 'hsl(228, 96%, 82%)'; break; // Bright Blue
 		case 2: return 'hsl(228, 96%, 85%)'; break;
 		case 3: return 'hsl(228, 96%, 90%)'; break;
 		case 4: return 'hsl(228, 96%, 92%)'; break;
 		case 5: return 'hsl(228, 96%, 94%)'; break; // Light Blue
 		// yellow colors
 		case 6: return 'hsl(108, 73%, 82%)'; break; 	// Bright Green
 		case 7: return 'hsl(108, 73%, 85%)'; break;
 		case 8: return 'hsl(108, 73%, 90%)'; break;
 		case 9: return 'hsl(108, 73%, 92%)'; break;
 		case 10: return 'hsl(108, 73%, 94%)'; break;	// Light Green
 		// blue colors
 		case 11: return 'hsl(108, 73%, 82%)'; break; // Bright Green
 		case 12: return 'hsl(108, 73%, 85%)'; break;
 		case 13: return 'hsl(108, 73%, 90%)'; break;
 		case 14: return 'hsl(108, 73%, 92%)'; break;
 		case 15: return 'hsl(108, 73%, 94%)'; break; // Light Green
 		// orange
 		case 16: return 'hsl(28, 100%, 60%)'; break; // Bright Orange
 		case 17: return 'hsl(28, 100%, 65%)'; break;
 		case 18: return 'hsl(28, 100%, 70%)'; break;
 		case 19: return 'hsl(28, 100%, 75%)'; break;
 		case 20: return 'hsl(28, 100%, 78%)'; break; // Light Orange
 		// green
 		case 21: return 'hsl(228, 96%, 82%)'; break; 	// Bright Blue
 		case 22: return 'hsl(228, 96%, 85%)'; break;
 		case 23: return 'hsl(228, 96%, 90%)'; break;
 	  case 24: return 'hsl(228, 96%, 92%)'; break;
 		case 25: return 'hsl(228, 96%, 94%)'; break; 	// Light Blues
 		// red colors
 		case 26: return 'hsl(0, 96%, 60%)'; break; // Bright Red
 		case 27: return 'hsl(0, 96%, 61%)'; break;
 		case 28: return 'hsl(0, 96%, 62%)'; break;
 		case 29: return 'hsl(0, 96%, 63%)'; break;
 		case 30: return 'hsl(0, 96%, 64%)'; break; // Light Red
 		// pressed chord keys
    case 49: return 'hsl(275, 96%, 85%)'; break; // light color for showing key
 		case 50: return 'hsl(28, 96%, 50%)'; break;	// color current chord notes
 		case 51: return 'hsl(275, 96%, 39%)'; break;	// color current melody notes

 		// dark colors
 		case 61: return 'hsl(228, 96%, 50%)'; break; 	// Dark Blue
 		case 66: return 'hsl(108, 75%, 50%)'; break; 	// Dark Green
 		case 71: return 'hsl(108, 75%, 50%)'; break; 	// Dark Green
 		case 76: return 'hsl(28, 88%, 50%)'; break; 	// Dark Orange
 		case 81: return 'hsl(228, 96%, 50%)'; break; 	// Dark Blue
 		case 86: return 'hsl(0, 100%, 50%)'; break; 		// Dark Red
 		// default - color not in range
 		default: return -1; break;
 	}
 }

 /**
  * COLORING SCHEME FOR EXPERT USERS
  */

function getColorExpert(c){
	switch(c){
		// blue
		// 206 - 228
		case 1: return 'hsl(228, 96%, 82%)'; break; // Bright Blue
		case 2: return 'hsl(228, 96%, 85%)'; break;
		case 3: return 'hsl(228, 96%, 90%)'; break;
		case 4: return 'hsl(228, 96%, 92%)'; break;
		case 5: return 'hsl(228, 96%, 94%)'; break; // Light Blue
		// yellow colors
		case 6: return 'hsl(55, 76%, 87%)'; break; 	// Bright Yellow
		case 7: return 'hsl(55, 76%, 90%)'; break;
		case 8: return 'hsl(55, 76%, 92%)'; break;
		case 9: return 'hsl(55, 76%, 94%)'; break;
		case 10: return 'hsl(55, 76%, 96%)'; break;	// Light Yellow
		// blue colors
		case 11: return 'hsl(188, 75%, 82%)'; break; // Bright Blue
		case 12: return 'hsl(188, 75%, 85%)'; break;
		case 13: return 'hsl(188, 75%, 90%)'; break;
		case 14: return 'hsl(188, 75%, 92%)'; break;
		case 15: return 'hsl(188, 75%, 94%)'; break; // Light Blue
		// orange
		case 16: return 'hsl(28, 100%, 60%)'; break; // Bright Orange
		case 17: return 'hsl(28, 100%, 65%)'; break;
		case 18: return 'hsl(28, 100%, 70%)'; break;
		case 19: return 'hsl(28, 100%, 75%)'; break;
		case 20: return 'hsl(28, 100%, 78%)'; break; // Light Orange
		// green
		case 21: return 'hsl(108, 73%, 82%)'; break; 	// Bright Green
		case 22: return 'hsl(108, 73%, 85%)'; break;
		case 23: return 'hsl(108, 73%, 90%)'; break;
	  case 24: return 'hsl(108, 73%, 92%)'; break;
		case 25: return 'hsl(108, 73%, 94%)'; break; 	// Light Green
		// red colors
		case 26: return 'hsl(0, 96%, 60%)'; break; // Bright Red
		case 27: return 'hsl(0, 96%, 61%)'; break;
		case 28: return 'hsl(0, 96%, 62%)'; break;
		case 29: return 'hsl(0, 96%, 63%)'; break;
		case 30: return 'hsl(0, 96%, 64%)'; break; // Light Red
		// pressed chord keys
    case 49: return 'hsl(275, 96%, 85%)'; break; // light color for showing key
		case 50: return 'hsl(28, 96%, 50%)'; break;	// color current chord notes
		case 51: return 'hsl(275, 96%, 39%)'; break;	// color current melody notes

		// dark colors
		case 61: return 'hsl(228, 96%, 50%)'; break; 	// Dark Blue
		case 66: return 'hsl(55, 96%, 50%)'; break; 	// Bright Yellow
		case 71: return 'hsl(188, 100%, 40%)'; break; 	// Dark Blue
		case 76: return 'hsl(28, 88%, 40%)'; break; 	// Dark Orange
		case 81: return 'hsl(108, 75%, 40%)'; break; 	// Dark Green
		case 86: return 'hsl(0, 100%, 40%)'; break; 		// Dark Red
		// default - color not in range
		default: return -1; break;
	}
}

/**
 * COLORING SCHEME FOR SUNSET
 */

function getColorSunset(c){
 switch(c){
	 // 1 - blue
	 case 1: return 'hsl(246, 80%, 40%)'; break;
	 case 2: return 'hsl(246, 80%, 40%)'; break;
	 case 3: return 'hsl(246, 80%, 40%)'; break;
	 case 4: return 'hsl(246, 80%, 40%)'; break;
	 case 5: return 'hsl(246, 80%, 40%)'; break;
	 // 3
	 case 6: return 'hsl(291, 43%, 35%)'; break;
	 case 7: return 'hsl(291, 43%, 35%)'; break;
	 case 8: return 'hsl(291, 43%, 35%)'; break;
	 case 9: return 'hsl(291, 43%, 35%)'; break;
	 case 10: return 'hsl(291, 43%, 35%)'; break;
	 // 4
	 case 11: return 'hsl(348, 30%, 43%)'; break;
	 case 12: return 'hsl(348, 30%, 43%)'; break;
	 case 13: return 'hsl(348, 30%, 43%)'; break;
	 case 14: return 'hsl(348, 30%, 43%)'; break;
	 case 15: return 'hsl(348, 30%, 43%)'; break;
	 // 5
	 case 16: return 'hsl(30, 81%, 48%)'; break;
	 case 17: return 'hsl(30, 81%, 48%)'; break;
	 case 18: return 'hsl(30, 81%, 48%)'; break;
	 case 19: return 'hsl(30, 81%, 48%)'; break;
	 case 20: return 'hsl(30, 81%, 48%)'; break;
	 // 2
	 case 21: return 'hsl(258, 57%, 37%)'; break;
	 case 22: return 'hsl(258, 57%, 37%)'; break;
	 case 23: return 'hsl(258, 57%, 37%)'; break;
	 case 24: return 'hsl(258, 57%, 37%)'; break;
	 case 25: return 'hsl(258, 57%, 37%)'; break;
	 // red colors
	 case 26: return 'hsl(0, 96%, 60%)'; break;
	 case 27: return 'hsl(0, 96%, 61%)'; break;
	 case 28: return 'hsl(0, 96%, 62%)'; break;
	 case 29: return 'hsl(0, 96%, 63%)'; break;
	 case 30: return 'hsl(0, 96%, 64%)'; break;
	 // pressed chord keys
   case 49: return 'hsl(246, 96%, 85%)'; break; // light color for showing key
	 case 50: return 'hsl(30, 81%, 48%)'; break;	// orange
	 case 51: return 'hsl(246, 80%, 40%)'; break;	// blue

	 // dark colors
	 case 61: return 'hsl(246, 80%, 40%)'; break;    // 1 - Blue
	 case 66: return 'hsl(291, 43%, 35%)'; break;   // 3 - Pinkish
	 case 71: return 'hsl(348, 30%, 43%)'; break; 	// 4 - Ugly
	 case 76: return 'hsl(30, 81%, 48%)'; break; 	  // 5 - Orange
	 case 81: return 'hsl(256, 57%, 37%)'; break;   // 2 - Purple
	 case 86: return 'hsl(0, 96%, 50%)'; break;    // Dark Red
	 // default - color not in range
	 default: return -1; break;
 }
}


/**
 * COLORING SCHEME FOR RAIN FOREST
 */
function getColorRainForest(c){
 switch(c){
	 // 1
	 case 1: return 'hsl(222, 96%, 56%)'; break; // Dark Blue
	 case 2: return 'hsl(222, 96%, 56%)'; break;
	 case 3: return 'hsl(222, 96%, 56%)'; break;
	 case 4: return 'hsl(222, 96%, 56%)'; break;
	 case 5: return 'hsl(222, 96%, 56%)'; break;
	 // 3
	 case 6: return 'hsl(190, 57%, 56%)'; break; 	// Baby Blue
	 case 7: return 'hsl(190, 57%, 56%)'; break;
	 case 8: return 'hsl(190, 57%, 56%)'; break;
	 case 9: return 'hsl(190, 57%, 56%)'; break;
	 case 10: return 'hsl(190, 57%, 56%)'; break;
	 // 4
	 case 11: return 'hsl(155, 55%, 65%)'; break; // Aqua
	 case 12: return 'hsl(155, 55%, 65%)'; break;
	 case 13: return 'hsl(155, 55%, 65%)'; break;
	 case 14: return 'hsl(155, 55%, 65%)'; break;
	 case 15: return 'hsl(155, 55%, 65%)'; break;
	 // 5
	 case 16: return 'hsl(122, 73%, 74%)'; break; // Green Blue
	 case 17: return 'hsl(122, 73%, 74%)'; break;
	 case 18: return 'hsl(122, 73%, 74%)'; break;
	 case 19: return 'hsl(122, 73%, 74%)'; break;
	 case 20: return 'hsl(122, 73%, 74%)'; break;
	 // 2
	 case 21: return 'hsl(202, 78%, 63%)'; break; // Light Blue
	 case 22: return 'hsl(202, 78%, 63%)'; break;
	 case 23: return 'hsl(202, 78%, 63%)'; break;
	 case 24: return 'hsl(202, 78%, 63%)'; break;
	 case 25: return 'hsl(202, 78%, 63%)'; break;
	 // red colors
	 case 26: return 'hsl(0, 96%, 60%)'; break; // Bright Red
	 case 27: return 'hsl(0, 96%, 61%)'; break;
	 case 28: return 'hsl(0, 96%, 62%)'; break;
	 case 29: return 'hsl(0, 96%, 63%)'; break;
	 case 30: return 'hsl(0, 96%, 64%)'; break;
	 // pressed chord keys
   case 49: return 'hsl(228, 96%, 85%)'; break; // light color for showing key
	 case 50: return 'hsl(122, 73%, 74%)'; break;	// Green Blue
	 case 51: return 'hsl(228, 96%, 40%)'; break;	// Dark Blue

	 // dark colors
	 case 61: return 'hsl(222, 96%, 56%)'; break; 	// 1 - Dark Blue
	 case 66: return 'hsl(190, 57%, 56%)'; break; 	// 3 - Baby Blue
	 case 71: return 'hsl(155, 55%, 65%)'; break; 	// 4 - Aqua
	 case 76: return 'hsl(122, 73%, 74%)'; break; 	// 5 - Green Blue
	 case 81: return 'hsl(202, 78%, 63%)'; break; 	// 2 - Light Blue
	 case 86: return 'hsl(0, 96%, 50%)'; break; 		// Dark Red
	 // default - color not in range
	 default: return -1; break;
 }
}


/**
 * COLORING SCHEME FOR OCEAN
 */
function getColorOcean(c){
 switch(c){
	 // 1 - blue
	 case 1: return 'hsl(219, 96%, 40%)'; break;
	 case 2: return 'hsl(219, 96%, 40%)'; break;
	 case 3: return 'hsl(219, 96%, 40%)'; break;
	 case 4: return 'hsl(219, 96%, 40%)'; break;
	 case 5: return 'hsl(219, 96%, 40%)'; break;
	 // 3 - blue
	 case 6: return 'hsl(194, 74%, 47%)'; break;
	 case 7: return 'hsl(194, 74%, 47%)'; break;
	 case 8: return 'hsl(194, 74%, 47%)'; break;
	 case 9: return 'hsl(194, 74%, 47%)'; break;
	 case 10: return 'hsl(194, 74%, 47%)'; break;
	 // 4 - blue
	 case 11: return 'hsl(184, 72%, 62%)'; break;
	 case 12: return 'hsl(184, 72%, 62%)'; break;
	 case 13: return 'hsl(184, 72%, 62%)'; break;
	 case 14: return 'hsl(184, 72%, 62%)'; break;
	 case 15: return 'hsl(184, 72%, 62%)'; break;
	 // 5 - blue
	 case 16: return 'hsl(166, 89%, 76%)'; break;
	 case 17: return 'hsl(166, 89%, 76%)'; break;
	 case 18: return 'hsl(166, 89%, 76%)'; break;
	 case 19: return 'hsl(166, 89%, 76%)'; break;
	 case 20: return 'hsl(166, 89%, 76%)'; break;
	 // 2 - blue
	 case 21: return 'hsl(208, 91%, 40%)'; break;
	 case 22: return 'hsl(208, 91%, 40%)'; break;
	 case 23: return 'hsl(208, 91%, 40%)'; break;
	 case 24: return 'hsl(208, 91%, 40%)'; break;
	 case 25: return 'hsl(208, 91%, 40%)'; break;
	 // red colors
	 case 26: return 'hsl(0, 96%, 60%)'; break;
	 case 27: return 'hsl(0, 96%, 61%)'; break;
	 case 28: return 'hsl(0, 96%, 62%)'; break;
	 case 29: return 'hsl(0, 96%, 63%)'; break;
	 case 30: return 'hsl(0, 96%, 64%)'; break;
	 // pressed chord keys
   case 49: return 'hsl(206, 96%, 85%)'; break; // light color for showing key
	 case 50: return 'hsl(206, 96%, 50%)'; break;	// color current chord notes
	 case 51: return 'hsl(206, 96%, 50%)'; break;	// color current melody notes


	 // dark colors
	 case 61: return 'hsl(219, 96%, 40%)'; break; 	// 1 Blue
	 case 66: return 'hsl(194, 74%, 47%)'; break; 	// 3 Blue
	 case 71: return 'hsl(184, 72%, 62%)'; break; 	// 4 Blue
	 case 76: return 'hsl(166, 89%, 76%)'; break; 	// 5 blue
	 case 81: return 'hsl(208, 91%, 40%)'; break; 	// 2 Blue
	 case 86: return 'hsl(0, 96%, 50%)'; break; 		// Dark Red
	 // default - color not in range
	 default: return -1; break;
 }
}
