(function($){
    $.stickytable = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("stickytable", base);
        
        base.init = function(){
            
            base.options = $.extend({},$.stickytable.defaultOptions, options);
            
        };
        
        // Run initializer
        base.init();
    };
    
    $.stickytable.defaultOptions = {
 
    };

    $.stickytable.elements = {};

    $.stickytable.guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    }

    $.stickytable.check_loc = function(tbl){
	var sTop = tbl.p.scrollTop();
	var min = tbl.startY;
	var max = tbl.startY+tbl.t.outerHeight();
	if(sTop > min && sTop < max){
		if(tbl.c.css('display')=='none') tbl.c.css('display', 'inline-table');
	}else{
		tbl.c.css('display', 'none');
	}

    }
    
    $.fn.stickytable = function(options){
	var self; // the table itself
	var tbl;
        return this.each(function(){
		(new $.stickytable(this, options));
		// store references
		self = $(this);
		var parent = self.parent();
		var wrap = document.createElement('div');
		wrap.className='stky-wrapper';
		$(wrap).css('position','relative');
		parent.scrollTop(0);
		var guid = $.stickytable.guid();

		// create wrap
		// sometimes they all live in the same element so... lets check for that before wrapping the parent over and over
		if(!parent.hasClass('stky-ct-el')){
		       	parent.wrap(wrap);
			parent.addClass('stky-ct-el');
		}

		// transform the parent
		//if(parent.css('position') !=='relative' && parent.css('position') !=='absolute') parent.css('position','relative');
		//if(parent.parent().css('position') !=='relative' && parent.parent().css('position') !=='absolute') parent.parent().css('position','relative');
		// create our clone.
		var clone = self.clone();
		// get rid of useless nodes
		clone.children('tbody').remove();
		clone.css({
			display:'none',
			position:'absolute',
			top:0,
			width:parent[0].scrollWidth,

		});
		clone.addClass('sticky-clone');
		// add clone to container above current one.
		parent.parent().prepend(clone);

		$.stickytable.elements[guid] = {
			t:self, p:parent,
		       	c:clone, 
			startY:self.position().top-parent.offset().top
		};
		// attach a mouseevent handler to parent
		parent.scroll(function(e){
			tbl = $.stickytable.elements[guid];
			$.stickytable.check_loc(tbl);
		});

	    
        });
    };
    
})(jQuery);
