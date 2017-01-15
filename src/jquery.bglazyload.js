/*
 * Lazy Load Background Image - Simple jQuery plugin for lazy loading background images
 *
 * Author: Vineet Garg(vineetgarg90@gmail.com)
 *
 * Version: 1.1.0 (update NCOU)
 *
 */

(function($) {
   $.fn.bglazyload = function() {
      var elem = this;

      var lazyload = function(elem) {
         var viewport_height = $(window).height();
         var scrollTop = $(document).scrollTop();

         if (elem.filter(":not('.loaded')").length) {
            elem.filter(":not('.loaded')").each(function() {

               // Do something to each element here.
               var offset_top = $(this).offset().top;
               var elem_height = $(this).height();

               if (offset_top + elem_height / 3 < viewport_height + scrollTop) {
                  var bg_img = $(this).data('bgimg');

                  $(this).css({
                     'background-image': "url(" + bg_img + ")"
                  });
                  $(this).addClass('loaded');
               }
            });
         }
      }

      //call on initialise
      lazyload(elem);

      //call after window scrolls or resize
      $(window).on('scroll resize', _throttle(function() {
         lazyload(elem)
      }, 300));

      function _throttle(action, delay) {
         var handle = null,
            lastRun = 0

         return function() {
            if (handle) return
            var time = Date.now() - lastRun,
               context = this,
               args = arguments,
               callback = function() {
                  lastRun = Date.now()
                  handle = false
                  action.apply(context, args)
               }

            if (time > delay) {
               callback()
            } else {
               handle = setTimeout(callback, delay)
            }
         }
      }

   };
}(jQuery));
