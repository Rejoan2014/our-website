(function ($) {
    "use strict";
    var windowOn = $(window);

    gsap.registerPlugin(ScrollTrigger);

    // Hover btn bounce
    var hoverBtns = gsap.utils.toArray(".tw-hover-btn-wrapper");

    const hoverBtnItem = gsap.utils.toArray(".tw-hover-btn-item");
    hoverBtns.forEach((btn, i) => {
        $(btn).mousemove(function(e) {
            callParallax(e);
        });

        function callParallax(e) {
            parallaxIt(e, hoverBtnItem[i], 80);
        }

        function parallaxIt(e, target, movement) {
            var $this = $(btn);
            var relX = e.pageX - $this.offset().left;
            var relY = e.pageY - $this.offset().top;

            gsap.to(target, 0.6, {
                x: ((relX - $this.width() / 2) / $this.width()) * movement,
                y: ((relY - $this.height() / 2) / $this.height()) * movement,
                ease: Power2.easeOut,
            });
        }
        $(btn).mouseleave(function(e) {
            gsap.to(hoverBtnItem[i], 0.6, {
                x: 0,
                y: 0,
                ease: Power2.easeOut,
            });
        });
    });
 

    
})(jQuery);