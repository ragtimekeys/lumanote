var scroll_bit = false;

$(document).ready(function(){

});
function create_viz_div(){
	console.log('create_viz_div()');
	var viz_note = $('#viz-note-base');
	$('span.white-key').map(function(){
		var id = $(this).attr('id').replace('key_', '');
		var left_pos = $(this).offset().left;
		var new_note = viz_note.clone().attr('id', 'viz-note-'+id);
		new_note.addClass('for-white-keys');
		$('#visual-play').append(new_note);
		var w = $('span.white-key').css('width');
		new_note.css({'left': left_pos, 'display': 'block', 'width': w})
	});
	$('span.black-key').map(function(){
		var id = $(this).attr('id').replace('key_', '');
		var left_pos = $(this).offset().left;
		var new_note = viz_note.clone().attr('id', 'viz-note-'+id);
		new_note.addClass('for-black-keys');

		$('#visual-play').append(new_note);
		new_note.css({'left': left_pos-7, 'display': 'block'})
		var w = $('span.black-key').css('width');
		new_note.css({'left': left_pos, 'display': 'block', 'width': w})
	});
}
function update_viz_div(){
  console.log("update_viz_div()");
	$('.viz-note.for-white-keys').map(function(){
		var id = '#key_' + $(this).attr('id').replace('viz-note-', '');
		var new_width = parseInt($(this).css('width'));
		var new_pos = parseInt($(id).offset().left) - parseInt($('#my-piano ul').offset().left) + 2;
		//console.log(parseInt($(id).offset().left), parseInt($('#my-piano ul').offset().left), new_pos)
		$(this).css({'width': new_width, 'left': new_pos})
	});
	// var inc = 1;
	$('.viz-note.for-black-keys').map(function(){
		var id = '#key_' + $(this).attr('id').replace('viz-note-', '');
		var new_width = parseInt($(this).css('width'));
		var new_pos = parseInt($(id).parent().offset().left) - parseInt($('#my-piano ul').offset().left) + $(id).position().left + 4;
		// //console.log(parseInt($(id).offset().left), parseInt($('#my-piano ul').offset().left), new_pos)
		$(this).css({'width': new_width, 'left': new_pos})
		// inc +=1;
	});
}
function visual_play(key){
  console.log("visual_play()");
	//console.log("visual_play:"+key);
	// var id = '#viz-note-'+key.attr('id').replace('key-', '');
	var id = '#viz-note-'+key;
	var div = '<div class="viz-note-inside"></div>'
	var w = $('#key_'+key).css('width');
	$(id).append(div);
	var bc = null;
	if (key < splitPoint){
		bc = 50;
	}
	else{
		bc = 51
	}
	$(id).find('.viz-note-inside').clearQueue().finish().animate({
		'width': w,
		'background-color': getMyKeyColor(key)
	}, 200);
}
function remove_visual_play(key){
  console.log("remove_visual_play()");
	// var id = '#viz-note-'+key.attr('id').replace('key-', '');
	var id = '#viz-note-'+key;

	$(id).find('.viz-note-inside').clearQueue().finish().animate({'width': 0}, 100);

	$(id).find('.viz-note-inside').remove();
}
