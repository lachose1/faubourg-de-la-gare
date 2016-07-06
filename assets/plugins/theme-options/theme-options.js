/*
 *
 *		THEME-OPTIONS.JS
 *
 */

$(document).ready(function() {
    
	var theme_options_content = ' \
		<h4>Change Theme Options</h4> \
		<a href="#"></a> \
		<br> \
		<h5>Change Color</h5> \
		<div class="colors clearfix"> \
			<a id="default" href="#" data-style="default"></a> \
			<a id="red" href="#" data-style="red"></a> \
			<a id="blue" href="#" data-style="blue"></a> \
			<a id="purple" href="#" data-style="purple"></a> \
			<a id="green" href="#" data-style="green"></a> \
		</div><!-- colors --> \
	\ ';
	
	$("#theme-options").prepend(theme_options_content);
	
	$("#theme-options > a").on("click", function(e) {
        
		e.preventDefault();
		$("#theme-options").toggleClass("open");
		
    });
	
	
	var link = $('link[data-style="styles"]');
	var boiler_colors = $.cookie('boiler_colors');
		
	if (!($.cookie('boiler_colors'))) {
		
		$.cookie('boiler_colors', 'default', 365);
		boiler_colors = $.cookie('boiler_colors');
		$('#theme-options .colors a[data-style="'+boiler_colors+'"]');
		
	} else {
		
		link.attr('href','assets/css/alternative-styles/' + boiler_colors + '.css');
		$('#theme-options .colors a[data-style="'+boiler_colors+'"]');
		
	};


	// CHANGE COLOR //
	$('#theme-options .colors a').on('click',function(e) {
		
		var $this = $(this),
			boiler_colors = $this.data('style');
			
		e.preventDefault();
		
		link.attr('href', 'assets/css/alternative-styles/' + boiler_colors + '.css');
		$.cookie('boiler_colors', boiler_colors, 365);
				
	});

});    	