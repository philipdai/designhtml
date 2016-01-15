(function($) {
	"use strict";

	/**
	 * This custom extension is designed to override specific settings
	 * and behavior in the bootstrap-multiselect plugin to:
	 * 
	 * 1) Refresh the multiselect when the value of the native select
	 *    element is change programmatically
	 * 
	 * 2) Auto-scroll to the first selected option when the drop down
	 *    displays.
	 * 
	 * 3) Set the focus to the Multiselect button when the drop-down is closed.
	 * 
	 * 4) Set the focus to the corresponding anchor element when a checkbox is toggled.
	 * 
	 * @author Vince Lozada
	 */

	// This plug-in customization will only execute if jQuery is loaded.
	if ($ === undefined) {
		return;
	}
	
	// Save the original plug-in prototype for later invocation.
	var $fnMultiselect = $.fn.multiselect; 
	$.fn.multiselect = function(option, parameter, extraOptions) {
		
		// Add a onDropDownShown handler to auto-scroll the first selected
		// checkbox into view when it displays.
		if (typeof option === "object") {
			option = $.extend(true, option, {
				buttonClass: 'btn-multiselect',
				buttonContainer: '<div class="btn-group btn-group-multiselect" />'
			});
		}
		
		// 'this' refers to jQuery's collection of elements from the selector
		return this.each(function(){
			
			// Invoke the original plug-in constructor. 
			// 'this' refers to the DOM element that matched the jQuery selector
			var $element = $fnMultiselect.apply($(this), [option, parameter, extraOptions]);
			
			// Get a reference to the plugin...
			var $multiselect = $element.data('multiselect');
			
			// Add event handlers to the $container element itself so that we don't override the event handlers that 
			// the client is providing in the options...
			
			 // Maps to onDropdownShow...
//			$multiselect.$container.on('show.bs.dropdown', function(){
//				
//			});
			
			// Maps to onDropdownHide...
			$multiselect.$container.on('hide.bs.dropdown', function(){
				// Set the focus onto the multiselect button...
				$multiselect.$container.find('.btn-multiselect').focus();
			});
			
			// Maps to onDropdownShown...
			$multiselect.$container.on('shown.bs.dropdown', function(){
				// Find the first selected checkbox and auto-scroll to it so that it's at the top of the list...
				var selectedIndex = $multiselect.$select.get(0).selectedIndex;
				if (selectedIndex > 0) {
					$multiselect.$ul.scrollTop($multiselect.$ul[ 0 ].childNodes[ selectedIndex ].offsetTop);
				}
			});
			
			// Maps to onDropdownHidden...
//			$multiselect.$container.on('hidden.bs.dropdown', function(){
//				
//			});

			//Attach change function for checkboxes in multiselect
			$multiselect.$ul.find('input[type="checkbox"]').change(function(event){
				//When checkbox is changed, set focus back to corresponding anchor...
				$(this).closest('a').focus();
			});
			
			if (!$element.data('watch')) {
				// Setup an interval timer to watch for the input value changing
				// programmatically (thus not firing the 'change' event) every 
				// 500 milliseconds, so when it detects that the value has 
				// changed, it will synchronize the selections accordingly.
				$element.data('watch-value', $element.val());
				$element.data('watch', setInterval(function(){
					var value = $element.val();
					if (value !== $element.data('watch-value')){
						if (value !== undefined) {
							$element.multiselect('select', value);
							$element.multiselect('refresh');
						}
					}
				}, 500));
			}
			
		}); // return
		
	}; // $.fn.multiselect

})(jQuery);