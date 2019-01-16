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
	contentTabs = [$('#metalithic_v1'), $('#metalithic_v2')];
	showButtons = [$('#show_metalithic_v1'), $('#show_metalithic_v2')];

	/*
	 * Code for the button group that toggles different versions of the
	 * Metalithic portfolio item.
	 */

	function handleShowButtonClick(clickedButtonId) {
	  // If the current content tab is already displayed, don't do anything
	  if (clickedButtonId == selectedButton) return;

	  // First, hide all the content tabs
	  for (var i = 0; i < contentTabs.length; i++) {
	    contentTabs[i].hide();
	  }
	  // Then show the tab whose button was clicked
	  contentTabs[clickedButtonId].show();

	  // Toggle both buttons as active/inactive
	  showButtons[clickedButtonId].toggleClass('button--primary');
	  showButtons[selectedButton].toggleClass('button--primary');

	  // Finally, set the currently selected button to the one just clicked
	  selectedButton = clickedButtonId;
	}

	function createCallback(clickedButtonId) {
	  return function() {
	    handleShowButtonClick(clickedButtonId);
	  }
	}

	// Create a click handler for all the button group buttons
	for (var i = 0; i < showButtons.length; i++) {
	  showButtons[i].click(createCallback(i));
	}

	// By default:
	$('#metalithic_v1').hide(); // hide the first content tab; and
	var selectedButton = 1;     // select the second content tab

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
