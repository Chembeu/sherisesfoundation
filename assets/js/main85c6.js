/*Charitify Theme Scripts */

(function($){
    "use strict";
             
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });
             
    // $(window).on('load', function() {
		if($('.time-countdown').length){  
			$('.time-countdown').each(function() {
			var $this = $(this), finalDate = $(this).data('countdown');
			$this.countdown(finalDate, function(event) {
				var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
			});
		 });
		}
    // });

/*=========================================================================
    	Sticky Header
=========================================================================*/ 
    $(function() {
        var header = jQuery("#header"),
            height = header.height(),
            yOffset = 0,
            triggerPoint = 100; 
			/* jQuery('.header-height').css('height', height+'px'); */
		jQuery(window).on( 'scroll', function() {
            yOffset = $(window).scrollTop();

            if (yOffset >= triggerPoint) {
            	header.removeClass("animated cssanimation fadeIn");
                header.addClass("navbar-fixed-top  cssanimation animated fadeInTop");
            } else {
                header.removeClass("navbar-fixed-top cssanimation  animated fadeInTop");
                header.addClass("animated cssanimation fadeIn");
            }

        });
    });

/*=========================================================================
    Nivo slider 
=========================================================================*/
    $('#main-slider').nivoSlider({
        effect: 'random',
        animSpeed: 300,
        pauseTime: 18000,
        directionNav: true,
        manualAdvance: false,
        controlNavThumbs: false,
        pauseOnHover: true,
        controlNav: true,
        prevText: "<i class='ti-arrow-left'></i>",
        nextText: "<i class='ti-arrow-right'></i>"
    });

/*=========================================================================
    Mobile Menu
=========================================================================*/  
    /* $(function(){
        $('#mainmenu').slicknav({
            prependTo: '.site-branding',
            label: '',
            allowParentLinks: true
        }); 
    }); */
             
/*=========================================================================
	Counter Up Active
=========================================================================*/
	var counterSelector = $('.counter');
	counterSelector.counterUp({
		delay: 10,
		time: 1000
	});       
             
/*=========================================================================
    Isotope Active
=========================================================================*/
	$('.gallery-items').imagesLoaded( function() {

		 // Add isotope click function
		$('.gallery-filter li').on( 'click', function(){
	        $(".gallery-filter li").removeClass("active");
	        $(this).addClass("active");
	 
	        var selector = $(this).attr('data-filter');
	        $(".gallery-items").isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false,
	            }
	        });
	        return false;
	    });

	    $(".gallery-items").isotope({
	        itemSelector: '.single-item',
	        layoutMode: 'masonry',
	    });
	});

/*=========================================================================
    Initialize smoothscroll plugin
=========================================================================*/
	smoothScroll.init({
		offset: 60
	});  
		
/*=========================================================================
        Active venobox
=========================================================================*/
	$('.img-popup').venobox({
		numeratio: true,
		infinigall: true
	}); 

/*=========================================================================
	WOW Active
=========================================================================*/ 
    new WOW().init();             
             
/*=========================================================================
  Scroll To Top
=========================================================================*/     
    $(window).on( 'scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });
             
})(jQuery);
