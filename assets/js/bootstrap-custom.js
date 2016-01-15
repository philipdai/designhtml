$(function () {
	
	 /* Resize Debouncer
		 	(Delays resize event until resize has stopped rather than continous events 
		 	being fired while browser is resized 
	------------------------------------------------*/
	(function ($, sr) {
		// debouncing function from John Hann
		// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
		var debounce = function (func, threshold, execAsap) {
				var timeout;

				return function debounced() {
					var obj = this,
						args = arguments;

					function delayed() {
						if (!execAsap)
							func.apply(obj, args);
						timeout = null;
					}

					if (timeout)
						clearTimeout(timeout);
					else if (execAsap)
						func.apply(obj, args);

					timeout = setTimeout(delayed, threshold || 100);
				};
			};
			// smartresize 
		jQuery.fn[sr] = function (fn) {
			return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
		};

	})(jQuery, 'smartresize');

	
	/* Scrolling Modal Script
	------------------------------------------------*/
	function scrollingModal(modalObj) {
		var headerHeight = $(modalObj).find('.modal-header').outerHeight();
		var footerHeight = $(modalObj).find('.modal-footer').outerHeight();
		var modalMargin = parseInt($(modalObj).find('.modal-dialog').css("margin-top")) + parseInt($(modalObj).find('.modal-dialog').css("margin-bottom"));
		var windowHeight = $(window).height();
		var modalOffset = modalMargin + headerHeight + footerHeight;
		var modalmaxHeight = windowHeight - modalOffset;

		$(modalObj).find('.modal-body').css("max-height", +modalmaxHeight + "px");
	}

	$('.modal-scroll').on('shown.bs.modal', function (e) {
		scrollingModal($(this));
	});
	
	
	
	/* Fixed Nav Body Offset
		 Determines height of navbar-fixed-top and adds padding to body to offset
	------------------------------------------------*/
	function fixedNavOffset(){
		var fixedNavHeight = $('.navbar-fixed-top').outerHeight();
		var fixedNavOffset = fixedNavHeight + 15;
		$('body').css('padding-top', fixedNavOffset + "px");
	}
	fixedNavOffset();
	
	
	/* Window resize scripts
	------------------------------------------------*/
	$(window).smartresize(function () {
		$('.modal-scroll:visible').each(function () {
			scrollingModal($(this));
		});
		
		//Determines height of navbar-fixed-top and adds padding to body to offset
		fixedNavOffset();
	});
	
	
	

	
//	/* Caret Icons for collapse elements
//	------------------------------------------------*/	
//	//Add Caret Icons to Collapse Links
//	$('a[data-toggle="collapse"]:not(.collapsed)').prepend('<span class="icon icon-caret-down"></span>');
//	$('a[data-toggle="collapse"].collapsed').prepend('<span class="icon icon-caret-right"></span>');
//	
//	//caret-down icon when content is shown
//	$('.collapse').on('show.bs.collapse', function () {
//		$(this).prev().find('.icon').removeClass("icon-caret-right").addClass("icon-caret-down");
//	});
//	
//	//caret-righ icon when content is hidden
//	$('.collapse').on('hide.bs.collapse', function () {
//		$(this).prev().find('.icon').removeClass("icon-caret-down").addClass("icon-caret-right");
//	});
		
	
	
});//Closes Doc Ready Function

