(function($) {
	"use strict";

	/**
	 * This custom extension is designed to override specific settings
	 * and behavior in the bootstrap-datetimepicker to avoid issues with
	 * the input not receiving focus, and the input value being update
	 * programmatically, thereby causing the calendar pop-up to be out of
	 * sync.
	 */

	// This plug-in customization will only execute if jQuery, datetimepicker and moment are loaded.
	if ($ === undefined || $.fn.datetimepicker === undefined || moment === undefined) {
		return;
	}
	
	// Save the original plug-in prototype for later invocation.
	var $fnDatetimepicker = $.fn.datetimepicker; 
	$.fn.datetimepicker = function(options) {
		
		// Override specific defaults in order to make it easier to initialize
		// since we care more about the calendar than the time.
		if (typeof options === "object") {
			options = $.extend(true, $fnDatetimepicker.defaults, {
				pickTime : false, 	// disables the time picker
				useCurrent : false, // when false, picker will not set the value of the input to the current date upon opening the calendar
				useStrict : true 	// use "strict" when validating dates
			}, options);
		}
		
		// 'this' refers to jQuery's collection of elements from the selector
		return this.each(function(){
			
			// Invoke the original plug-in constructor. 
			// 'this' refers to the DOM element that matched the jQuery selector
			var $element = $fnDatetimepicker.apply($(this), [ options ]);
			
			// Get a reference to the input and plugin...
			var $input = $element.children('input');
			var $button = $element.find('button');
			var $dateTimePicker = $element.data('DateTimePicker');
			
			// Attach event handlers to manage the focus of the input...
			$element.data('setInputFocusOnChange', false);
			$element.on('dp.change', function() {
				if ($element.data('setInputFocusOnChange')) {
					$element.data('setInputFocusOnChange', false);
					$input.focus();
					$input.change();
				}
			}).on('dp.show', function() {
				$element.data('setInputFocusOnChange', true);
				$input.blur();
			});

			// Bind to the mouse enter event in order to synchronize the calendar pop-up accordingly.
			$button.on('click', function() {
				var dpValue = $dateTimePicker.getDate().format($dateTimePicker.format);
				var inputValue = $input.val();
				if (dpValue !== inputValue) {
					var isValid = moment(inputValue, $dateTimePicker.format, true).isValid();
					if (isValid) {
						$dateTimePicker.setDate(new Date(inputValue)); // this will cause a 'dp.change' event
					}
				}
			});
			
		}); // return
		
	}; // $.fn.datetimepicker

})(jQuery);