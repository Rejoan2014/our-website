(function ($) {
  "use strict";
  
  var windowOn = $(window);

  $(document).ready(function () {

  /*-----------------------------------
    Preloader   
  -----------------------------------*/

    $(document).ready(function () {
      var preloader = $("#preloader");
      if (preloader.length) {
          setTimeout(function () {
              preloader.css("display", "none");
          }, 500);
      }
    });


      //>> Mobile Menu Js Start <<//
      $('#mobile-menu').meanmenu({
          meanMenuContainer: '.mobile-menu',
          meanScreenWidth: "1199",
          meanExpand: ['<i class="far fa-plus"></i>'],
      });
        

      //>> Sidebar Toggle Js Start <<//
      $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
          $(".offcanvas__info").removeClass("info-open");
          $(".offcanvas__overlay").removeClass("overlay-open");
      });
      $(".sidebar__toggle").on("click", function() {
          $(".offcanvas__info").addClass("info-open");
          $(".offcanvas__overlay").addClass("overlay-open");
      });


      //>> Body Overlay Js Start <<//
      $(".body-overlay").on("click", function() {
          $(".offcanvas__area").removeClass("offcanvas-opened");
          $(".df-search-area").removeClass("opened");;
          $(".body-overlay").removeClass("opened");
      });


      //>> Sticky Menu <<//
      windowOn.on('scroll', function () {
          var scroll = windowOn.scrollTop();
          if (scroll < 300) {
          $("#header-sticky").removeClass("sticky");
          } else {
          $("#header-sticky").addClass("sticky");
          }
      });


        //>> offcanvas bar <<//
      $(".tp-offcanvas-toogle").on('click', function(){
          $(".tp-offcanvas").addClass("tp-offcanvas-open");
          $(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
      });
      $(".tp-offcanvas-close-toggle,.tp-offcanvas-overlay").on('click', function(){
          $(".tp-offcanvas").removeClass("tp-offcanvas-open");
          $(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
      });


    /*---------- Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {

      $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
      });
      var sideMenuChild = $sideMenu + ' > div';
      $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
      });

      $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    };


    popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
    popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');


    /*-----------------------------------
           Wow Animation 
        -----------------------------------*/
    new WOW().init();


    /*-----------------------------------
           Set Background Image & Mask   
        -----------------------------------*/
    if ($("[data-bg-src]").length > 0) {
      $("[data-bg-src]").each(function () {
        var src = $(this).attr("data-bg-src");
        $(this).css("background-image", "url(" + src + ")");
        $(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }

    if ($("[data-mask-src]").length > 0) {
      $("[data-mask-src]").each(function () {
        var mask = $(this).attr("data-mask-src");
        $(this).css({
          "mask-image": "url(" + mask + ")",
          "-webkit-mask-image": "url(" + mask + ")",
        });
        $(this).addClass("bg-mask");
        $(this).removeAttr("data-mask-src");
      });
    }


    /*-----------------------------------
          Global Slider
        -----------------------------------*/
    function applyAnimationProperties() {
      $("[data-ani]").each(function () {
        var animationClass = $(this).data("ani");
        $(this).addClass(animationClass);
      });

      $("[data-ani-delay]").each(function () {
        var delay = $(this).data("ani-delay");
        $(this).css("animation-delay", delay);
      });
    }

    // Call the animation properties function
    applyAnimationProperties();

    // Function to initialize Swiper
    function initializeSwiper(sliderContainer) {
      var sliderOptions = sliderContainer.data("slider-options");

      var previousArrow = sliderContainer.find(".slider-prev");
      var nextArrow = sliderContainer.find(".slider-next");
      var paginationElement = sliderContainer.find(".slider-pagination");
      var numberedPagination = sliderContainer.find(
        ".slider-pagination.pagi-number"
      );

      var paginationStyle = sliderOptions["paginationType"] || "bullets";
      var autoplaySettings = sliderOptions["autoplay"] || {
        delay: 6000,
        disableOnInteraction: false,
      };

      var defaultSwiperConfig = {
        slidesPerView: 1,
        spaceBetween: sliderOptions["spaceBetween"] || 24,
        loop: sliderOptions.hasOwnProperty("loop") ? sliderOptions["loop"] !== false : true,

        speed: sliderOptions["speed"] || 1000,
        initialSlide: sliderOptions["initialSlide"] || 0,
        centeredSlides: !!sliderOptions["centeredSlides"],
        effect: sliderOptions["effect"] || "slide",
        fadeEffect: {
          crossFade: true,
        },
        autoplay: autoplaySettings,
        navigation: {
          nextEl: nextArrow.length ? nextArrow.get(0) : null,
          prevEl: previousArrow.length ? previousArrow.get(0) : null,
        },
        pagination: {
          el: paginationElement.length ? paginationElement.get(0) : null,
          type: paginationStyle,
          clickable: true,
          renderBullet: function (index, className) {
            var bulletNumber = index + 1;
            var formattedNumber =
              bulletNumber < 10 ? "0" + bulletNumber : bulletNumber;
            if (numberedPagination.length) {
              return (
                '<span class="' +
                className +
                ' number">' +
                formattedNumber +
                "</span>"
              );
            } else {
              return (
                '<span class="' +
                className +
                '" aria-label="Go to Slide ' +
                formattedNumber +
                '"></span>'
              );
            }
          },
        },
        on: {
          slideChange: function () {
            setTimeout(
              function () {
                this.params.mousewheel.releaseOnEdges = false;
              }.bind(this),
              500
            );
          },
          reachEnd: function () {
            setTimeout(
              function () {
                this.params.mousewheel.releaseOnEdges = true;
              }.bind(this),
              750
            );
          },
        },
      };

      var finalConfig = $.extend({}, defaultSwiperConfig, sliderOptions);

      // Initialize the Swiper instance
      return new Swiper(sliderContainer.get(0), finalConfig);
    }

    // Initialize Swipers on page load
    var swiperInstances = [];
    $(".global-slider").each(function () {
      var sliderContainer = $(this);
      var swiperInstance = initializeSwiper(sliderContainer);
      swiperInstances.push(swiperInstance);
    });

    // Bootstrap tab show event
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      var targetTab = $(e.target).attr("href");
      $(targetTab)
        .find(".global-slider")
        .each(function () {
          var sliderContainer = $(this);
          if (!sliderContainer[0].swiper) {
            initializeSwiper(sliderContainer);
          } else {
            sliderContainer[0].swiper.update();
          }
        });
    });

    // Add click event handlers for external slider arrows based on data attributes
    $("[data-slider-prev], [data-slider-next]").on("click", function () {
      var targetSliderSelector =
        $(this).data("slider-prev") || $(this).data("slider-next");
      var targetSlider = $(targetSliderSelector);

      if (targetSlider.length) {
        var swiper = targetSlider[0].swiper;

        if (swiper) {
          if ($(this).data("slider-prev")) {
            swiper.slidePrev();
          } else {
            swiper.slideNext();
          }
        }
      }
    });



    /*-----------------------------------
           Back to top    
        -----------------------------------*/
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 20) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $(document).on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });



    /*-----------------------------------
            MagnificPopup  view    
    -----------------------------------*/
    $(".popup-video").magnificPopup({
      type: "iframe",
      removalDelay: 260,
      mainClass: "mfp-zoom-in",
    });

    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });



    /*-----------------------------------
             NiceSelect     
    -----------------------------------*/
    if ($(".single-select").length) {
      $(".single-select").niceSelect();
    }

    /*---------- Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
      $($searchOpen).on("click", function (e) {
        e.preventDefault();
        $($searchBox).addClass($toggleCls);
      });
      $($searchBox).on("click", function (e) {
        e.stopPropagation();
        $($searchBox).removeClass($toggleCls);
      });
      $($searchBox)
        .find("form")
        .on("click", function (e) {
          e.stopPropagation();
          $($searchBox).addClass($toggleCls);
        });
      $($searchCls).on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($searchBox).removeClass($toggleCls);
      });
    }
    popupSarchBox(".popup-search-box", ".searchBoxToggler", ".searchClose", "show");

    /*---------- Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
      // Sidebar Popup
      $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
      });
      var sideMenuChild = $sideMenu + ' > div';
      $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
      });
      $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    };
    popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
    popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');


    /*-----------------------------------
           Mouse Cursor    
    -----------------------------------*/
    function mousecursor() {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover");
            t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "a, .cursor-pointer", function () {
            ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
                t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
    $(function () {
      mousecursor();
    });


    /*-----------------------------------
        Progress Bar   
    -----------------------------------*/
    $('.progress-bar').each(function () {
      var $this = $(this);
      var progressWidth = $this.attr('style').match(/width:\s*(\d+)%/)[1] + '%';

      $this.waypoint(function () {
        $this.css({
          '--progress-width': progressWidth,
          'animation': 'animate-positive 1.8s forwards',
          'opacity': '1'
        });
      }, { offset: '75%' });
    });



    /*-----------------------------------
          Text Splitting
    -----------------------------------*/
    Splitting();


    /*-----------------------------------
        Img TO Svg Convert
    -----------------------------------*/

    // Convert All Image to SVG
    $("img.svg").each(function () {
      var $img = $(this),
        imgID = $img.attr("id"),
        imgClass = $img.attr("class"),
        imgURL = $img.attr("src");

      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find("svg");
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass);
          }
          $svg = $svg.removeAttr("xmlns:a");
          $img.replaceWith($svg);
        },
        "xml"
      );
    });

    /*-----------------------------------
      Counterup 
    -----------------------------------*/
    if ($.fn.counterUp && $('.counter-number').length) {
      $('.counter-number').counterUp({
          delay: 10,
          time: 1000,
      });
    }

    /*-----------------------------------
      Date picker
    -----------------------------------*/
    $(function() {
      $("#date").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true
      });
    });

    /*-----------------------------------
      Project two hover effect
    -----------------------------------*/
    $(document).ready(function () {
      $('.project2-card').on('mouseenter', function () {
        $('.project2-card').removeClass('active'); 
        $(this).addClass('active'); 
      });
    });


    
    /*-----------------------------------
      Tab section
    -----------------------------------*/
    const $buttons = $(".about1-content-btn__one");
    const $contents = $(".about1-content-info");

    $buttons.on("click", function () {
        const target = $(this).data("tab");

        // Toggle active styles
        $buttons.removeClass("active-btn-style");
        $(this).addClass("active-btn-style");

        // Toggle content
        $contents.addClass("d-none");
        $("#" + target).removeClass("d-none");
    });

    // Show tab2 by default
    $buttons.removeClass("active-btn-style");
    $buttons.filter('[data-tab="tab2"]').addClass("active-btn-style");
    $contents.addClass("d-none");
    $("#tab2").removeClass("d-none");


     //nice select
      $('select').niceSelect();
    /*-----------------------------------
      Floating Button Section
    -----------------------------------*/
    $(document).ready(function () {
        const $blurOverlay = $('.blur-overlay');
        const $navBtns = $('.project-nav__btn');
        const $serviceMain = $('.service-main');
        const $serviceAlt = $('.service-alt');

        let isHovering = false;

        function showBlur() {
            $blurOverlay.addClass('active');
        }

        function hideBlurAndServices() {
            $blurOverlay.removeClass('active');
            $serviceMain.removeClass('visible');
            $serviceAlt.removeClass('visible');
        }

        function showService(type) {
            showBlur();
            if (type === 'main') {
                $serviceMain.addClass('visible');
                $serviceAlt.removeClass('visible');
            } else if (type === 'alt') {
                $serviceAlt.addClass('visible');
                $serviceMain.removeClass('visible');
            }
        }

        $navBtns.each(function () {
            const type = $(this).data('service');

            $(this).on('mouseenter', function () {
                isHovering = true;
                if (type === 'main' || type === 'alt') {
                    showService(type);
                } else {
                    hideBlurAndServices();
                }
            });

            $(this).on('mouseleave', function () {
                isHovering = false;
                setTimeout(function () {
                    if (!isHovering) hideBlurAndServices();
                }, 200);
            });
        });

        $serviceMain.add($serviceAlt).on('mouseenter', function () {
            isHovering = true;
            showBlur();
        });

        $serviceMain.add($serviceAlt).on('mouseleave', function () {
            isHovering = false;
            setTimeout(function () {
                if (!isHovering) hideBlurAndServices();
            }, 200);
        });
    });

    // Hover effect service card
    $('.service1-content').each(function(index) {
        $(this).on('mouseenter', function() {
            if (index > 0) {
                $('.service1-content').eq(index - 1).addClass('no-bottom-border');
            }
        });

        $(this).on('mouseleave', function() {
            if (index > 0) {
                $('.service1-content').eq(index - 1).removeClass('no-bottom-border');
            }
        });
    });

    // Hover effect showing image service card
    $('.service1-content').hover(function () {
        var newThumb = $(this).data('thumb');
        $('.service1__thumb img').attr('src', newThumb);
    }, function () {
        $('.service1__thumb img').attr('src', 'images/service/service-thumb1_1.png');
    });


    /*-----------------------------------
      Testimonial Slider Section
    -----------------------------------*/
    const swiper = new Swiper('.testimonial-slider', {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
        },
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            0:     { slidesPerView: 1 },
            576:   { slidesPerView: 1 },
            768:   { slidesPerView: 2 },
            992:   { slidesPerView: 2 },
            1200:  { slidesPerView: 3 },
            1400:  { slidesPerView: 3 },
        },
        on: {
            slideChangeTransitionStart: function () {
                $('.testimonial1-card-content__thumb').removeClass('show-thumb');
                $('.testimonial1-card-content__desc').css('display', 'block');
                $('.testimonial1-card-content').removeClass('active-card');

                const $activeSlide = $('.swiper-slide-active');
                const $card = $activeSlide.find('.testimonial1-card-content');
                const $thumb = $activeSlide.find('.testimonial1-card-content__thumb');
                const $desc = $activeSlide.find('.testimonial1-card-content__desc');

                if ($card.length) $card.addClass('active-card');
                if ($thumb.length) $thumb.addClass('show-thumb');
                if ($desc.length) $desc.css('display', 'none');
            }
        }
    });

    $(window).on('load', function () {
        swiper.emit('slideChangeTransitionStart');
    });



  }); // End Document Ready Function




})(jQuery); // End jQuery

 