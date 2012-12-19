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
	$.stickytable.get_styles = function(obj){
		var sheets = document.styleSheets;
		var iter;
		var rule;
		var styles = {};
		for(var i in sheets) {
			iter = $.stickytable.isNum(i);
			if(iter !== false){
				var rules = sheets[i].rules || sheets[i].cssRules;
				for(r in rules){
					iter= $.stickytable.isNum(r);
					if(iter !== false){
						if(rules[r]){
						if(rules[r].selectorText && rules[r].selectorText.indexOf(":")==-1){
							if(obj.is(rules[r].selectorText)){
								for (s in rules[r].style){
									iter = $.stickytable.isNum(s);
									if(iter == false && s!=0 && s !='cssText'){
										rule = rules[r].style[s];
										if(typeof(rule)=='string' && rule !==''){
											styles[s]= rule;
										}
									}
								}

							}
						}}
					}
				}
			}

		}
		return styles;
	}

	$.stickytable.isNum = function(t){
		t = parseInt(t);
		if(isNaN(t)){
			return false;
		}else{
			return t;
		}

	}
    
	$.stickytable.css = function(a){
		var s = $.stickytable.get_styles(a);
		s['background'] = 'none';
		s['border'] = 'none';
		s['overflow'] = 'visible';
		s['overflowX'] = 'visible';
		s['overflowY'] = 'visible';
		s['padding'] = 0;
		return s;
	}

	$.stickytable.guid = function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
	}

	$.stickytable.check_loc = function(tbl){
		var sTop = tbl.p.scrollTop();
		var min = tbl.startY;
		var max = tbl.startY + tbl.t.outerHeight(true);
		if(sTop > min && sTop < max){
			if(tbl.c.css('display')=='none') tbl.c.css('display', 'inline-table');
		}else{
			tbl.c.css('display', 'none');
		}

	}

	$.stickytable.updated_p_styles = {
		margin:0,
		position:'relative',
		float:'none'
	}
    
    $.fn.stickytable = function(options){
	var self; // the table itself
	var tbl;
        return this.each(function(){
		(new $.stickytable(this, options));
		// store references
		self = $(this);
		var parent = self.parent();
		parent.scrollTop(0);
		var guid = $.stickytable.guid();
		
		//  wrap
		var wrap, p_styles;

		// sometimes they all live in the same element so... lets check for that before wrapping the parent over and over
		if(!parent.hasClass('stky-ct-el')){
			wrap = $(document.createElement('div'));
			wrap.addClass('stky-wrapper');
			// get styles and patch them!
			p_styles = $.stickytable.css(parent);
			p_styles['width'] = parent.width() + "px";
			p_styles['float'] = parent.css('float');
			wrap.css(p_styles);
		       	parent.wrap(wrap);
			parent.addClass('stky-ct-el');
			parent.css($.stickytable.updated_p_styles);
			wrap = parent.parent();
		}else{
			wrap = parent.parent();
		}
		// create our clone.
		var clone = self.clone();
		// get rid of useless nodes
		clone.children('tbody').remove();
		clone.css({
			display:'none',
			position:'absolute',
			'z-index':100,
			width:parent[0].scrollWidth + "px"

		});
		clone.addClass('sticky-clone');
		wrap.prepend(clone);
		//wrap.append(clone);

		$.stickytable.elements[guid] = {
			t:self, 
			p:parent,
		       	c:clone, 
			startY:self.position().top
		};
		// attach a mouseevent handler to parent
		parent.scroll(function(e){
			tbl = $.stickytable.elements[guid];
			$.stickytable.check_loc(tbl);
		});

	    
        });
    };
    
})(jQuery);
