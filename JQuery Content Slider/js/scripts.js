//JQuery
$(document).ready(function()
{
	$('.myLink').on('mouseenter', function(){
			$('h1').addClass('red');
			$('h1').slideUp(500);
	});
		$('.myLink').on('mouseleave', function(){
			$('h1').removeClass('red');
			$('h1').slideDown(500);
	});

});
