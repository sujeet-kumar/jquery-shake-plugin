/**
 * jQuery shake plugin
 * @author Sujeet <sujeetkv90@gmail.com>
 * @link https://github.com/sujeet-kumar/jquery-shake-plugin
 */

(function ($) {
    $.fn.shake = function (options) {
        var settings = {
            count: 3, /* number of shakes */
            distance: 20, /* relative distance of shake */
            duration: 800, /* animation duration */
            vertical: false, /* for vertical shake */
            complete: null /* callback function when shakes complete */
        };
        
        if (options) {
            $.extend(settings, options);
        }
        
        var intShakes = (settings.count < 2) ? 2 : settings.count;
        var intDistance = settings.distance;
        var intDuration = settings.duration;
        
        var props = [];
        
        var posBackup = function (el, i) {
            var _position = $(el).css('position');
            if (typeof _position == 'undefined') {
                _position = '';
            }
            
            var _left = $(el).css('left');
            if (typeof _left == 'undefined') {
                _left = '';
            }
            
            var _top = $(el).css('top');
            if (typeof _top == 'undefined') {
                _top = '';
            }
            
            props[i] = {'position': _position, 'left': _left, 'top': _top};
        }
        
        var posRestore = function (el, i) {
            $(el).css(props[i]);
        }
        
        var direction = settings.vertical ? 'top' : 'left';
        
        var animation1 = {}; animation1[direction] = (intDistance * -1);
        var animation2 = {}; animation2[direction] = intDistance;
        var animation3 = {}; animation3[direction] = 0;
        
        return this.each(function (i) {
            var el = this;
            
            posBackup(el, i);
            
            $(el).css('position', 'relative');
            
            for (var t = 1; t < intShakes; t++) {
                $(el).animate(animation1, ((intDuration / intShakes) / 4))
                     .animate(animation2, ((intDuration / intShakes) / 2))
                     .animate(animation3, ((intDuration / intShakes) / 4));
            }
            
            $(el).animate(animation1, ((intDuration / intShakes) / 4))
                 .animate(animation2, ((intDuration / intShakes) / 2))
                 .animate(animation3, ((intDuration / intShakes) / 4), function () {
                     posRestore(el, i);
                     if ($.isFunction(settings.complete)) {
                         settings.complete.call(el);
                     }
                 });
        });
    };
})(jQuery);
