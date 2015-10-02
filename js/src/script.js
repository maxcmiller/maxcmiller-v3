var scroll
var $hero, $heroContent, $skills, $skillsList
var direction = {
	x: 'x',
	y: 'y'
}

$(document).ready(function() {
	$hero = $('.hero')
	$heroContent = $('.hero__content')
	$skills = $('.skills')
	$skillsList = $('.skills__list')

	$(window).scroll(function() {
		scroll = $(this).scrollTop()
		window.requestAnimationFrame(scrollHandler)
	})

	/*
		Following code thanks Chris Coyier from CSS-Tricks.com
		*/
	$('a[href*=#]:not([href=#])').click(function() {
	  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	    var target = $(this.hash);
	    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	    if (target.length) {
	      $('html,body').animate({
	        scrollTop: target.offset().top
	      }, 1000);
	      return false;
	    }
	  }
	});
})

function scrollHandler() {
	// Hero animation
	heroHeight = $hero.height()
	if (scroll < heroHeight && scroll > 0) {
		applyTranslate($heroContent, scroll / 3, direction.y)
	}
	applyFade($heroContent, scroll / heroHeight)

	// Stars animation
	if (window.innerHeight + scroll >= $skills.offset().top + $skills.height()) {
		$skillsList.find('li').each(function(i) {
			var $item = $(this)
			setTimeout(function() {
				$item.addClass('fadeInLeft')
				$item.removeClass('hidden')
			}, 100 * i)
		})
	}
}

function applyTranslate($element, factor, direction) {
	$element.css({
		'-webkit-transform': 'translate' + direction.toUpperCase() + '(' + factor + 'px)',
		'transform': 'translate' + direction.toUpperCase() + '(' + factor + 'px)',
	})
}

function applyFade($element, factor) {
	$element.css({
		'opacity': 1 - factor
	})
}
