document.addEventListener("DOMContentLoaded", (event) => {
	const slides = document.querySelectorAll('.slide');
	const nextSlide = document.querySelector('#next');
	const previousSlide = document.querySelector('#prev');

	let speed = 500;
	let autoSwitch = true;
	let autoSwitchSpeed = 400;

	slides[0].classList.add('active');

	slides.style = 'display:none';

	document.querySelector('.active').style.display = 'block';

	nextSlide.addEventListener('click', goToNextSlide());

	// previousSlide.addEventListener('click', previousSlide());
	
	if(autoSwitch == true)
	{
		setInterval (nextSlide, autoSwitchSpeed);
	}

	function goToNextSlide()
	{
		currentActiveSlide = document.querySelector('.active');
		currentActiveSlide.classList.remove('active')

		let oldActiveElement = document.querySelector('.oldActive');

		if(oldActiveElement.is(':last-chicld')){
			slides[0].classList.add('active');
		}
	}
	

});




// //JQuery
// $(document).ready(function()
// {
// 	//Set Options

// 	var speed = 500; 			//fade speed
// 	var autoSwitch = true;		//auto slider options
// 	var autoSwitchSpeed = 4000; //Auto slider speed

// 	//Add initial active class
// 	$('.slide').first().addClass('active');


// 	//Hide all slides
// 	$('.slide').hide();


// 	//Show first slide
// 	$('.active').show();

// 	//Next handler
// 	$('#next').on('click', nextSlide);

// 		$('#prev').on('click', prevSlide);

// 	//Auto slider	
// 	if(autoSwitch == true)
// 	{
// 		setInterval (nextSlide, autoSwitchSpeed);
// 	}


// 	//Switch to the next slide
// 	function nextSlide()
// 	{
// 		$('.active').removeClass('active').addClass('oldActive');
// 		if($('.oldActive').is(':last-child'))
// 		{
// 			$('.slide').first().addClass('active');
// 		}
// 		else
// 		{
// 			$('.oldActive').next().addClass('active');
// 		}
// 		$('.oldActive').removeClass('oldActive');
// 		$('.slide').fadeOut(speed);
// 		$('.active').fadeIn(speed);
// 	}

// 	//Switch to prev slide
// 	function prevSlide()
// 	{
// 		$('.active').removeClass('active').addClass('oldActive');
// 		if($('.oldActive').is(':first-child'))
// 		{
// 			$('.slide').last().addClass('active');
// 		}
// 		else
// 		{
// 			$('.oldActive').prev().addClass('active');
// 		}
// 		$('.oldActive').removeClass('oldActive');
// 		$('.slide').fadeOut(speed);
// 		$('.active').fadeIn(speed);
// 	}
// });
