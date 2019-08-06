(function ($) {

    AOS.init();
    
    $(document).ready(function () {

        var ourteam = $('#our-team-slider');
        var ourproject = $('#projects-slider');
        ourteam.owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            dots: true,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                },
            }
        });

        $('#slider-button').click(function(e) {
          e.preventDefault();
          ourteam.trigger('next.owl.carousel');
      });

        ourproject.owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            dots: true,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                },
            }
        });

        $('#project-nxt-slide').click(function(e) {
          e.preventDefault();
          ourproject.trigger('next.owl.carousel');
      });

        $('#project-prev-slide').click(function(e) {
          e.preventDefault();
          ourproject.trigger('prev.owl.carousel');
      });
    });

    var clOffCanvas = function () {

        var menuTrigger = $('.header-menu-toggle'),
        nav = $('.header-nav'),
        closeButton = nav.find('.header-nav__close'),
        siteBody = $('body'),
        mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function (e) {
            if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };

    /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        clOffCanvas();
    })();

    var a = 0;
    $(window).scroll(function() {

      var oTop = $('#counter').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function() {
          var $this = $(this),
          countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
        }).animate({
          countNum: countTo
      },

      {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
        },
        complete: function() {
            $this.text(this.countNum);
                //alert('finished');
            }

        });
    });
        a = 1;
    }

});

    $(document).ready(function(){

    	$('ul.tabs li').click(function(){
    		var tab_id = $(this).attr('data-tab');

    		$('ul.tabs li').removeClass('current');
    		$('.tab-content').removeClass('current');

    		$(this).addClass('current');
    		$("#"+tab_id).addClass('current');
    	})

  //E-mail Ajax Send START
  $("#callback-form").submit(function() { 
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }) .done(function() {
      $('.modal-body-form').delay(200).slideUp('slow');
      $('.modal-succes-form').delay(500).slideDown('slow');
      setTimeout(function() {
        $('.modal-succes-form p').css('opacity', '1');
      }, 1000)
      

      setTimeout(function() {
        $('.modal-succes-form p').delay(400).css('opacity', '0');
        $('.modal-succes-form').delay(700).slideUp('slow');
        $('.modal-body-form').delay(800).slideDown('slow');
      }, 2500)
    });
    return false;
  });
  //E-mail Ajax Send END

    });

    $(function() {
        $('.services-button-popup-link').magnificPopup({
            type: 'inline',
            delegate: 'a',
            mainClass: 'mfp-fade',
            callbacks: {
                open : function () {
                    $('.mfp-content').addClass('mfp-content-custom');
                },
            }
        });
    });

})(jQuery);
