/*
 * onProximityFade jQuery Plugin v1.0.0
 * http://jquery.com/
 *
 * Copyright 2010, Jakub Linowski
 * Licensed under the MIT license
 * http://www.linowski.ca
 *
 * Date: July 25 2010
 */

//Default Settings
var opf = {
    farOpacity : 0.1,
	farDistanceMax : 200,
	closeOpacity : 1,
	closeDistanceMin : 10,
	className : "fadeBox", 
	hover : null
};

$(document).ready(function(){
	//setup default opacity on
	$("." + opf.className).each(function() {
		$(this).fadeTo(1,opf.farOpacity);
		// for links
		if($(this).get(0).tagName == "A")
		{
			//set all items as block (so that IE can pick up a width)
			$(this).css("display","inline-block");
			//set a background color so that FireFox & ClearType can better calculate an opacity colour
			$(this).css("background-color","inherit");
		}
	});
	
	
	//attach hovers
	$("." + opf.className).hover(
		function() {
			opf.hover = this;
		},
		function() {
			opf.hover = null;
		}
	);
});

$(document).mousemove(function(e){
	//adjust opacity foreach element based on className
	if(opf.hover == null) {
		$("." + opf.className).each(function() {
			//highlight the elements in the beginning to show they are there
			
			//grab the element's boundary points
			var boundary = new Object();
			boundary.topY = $(this).offset().top;
			boundary.bottomY = boundary.topY + $(this).height();
			boundary.leftX = $(this).offset().left;
			boundary.rightX = boundary.leftX + $(this).width();
			
			//cursor top left of element
			if ((e.pageX <= boundary.leftX) && (e.pageY <= boundary.topY)) {
				var distance = Math.sqrt(Math.pow((e.pageX - boundary.leftX), 2) + Math.pow((e.pageY - boundary.topY), 2));
			}
			//cursor top right of element
			else if ((e.pageX >= boundary.rightX) && (e.pageY <= boundary.topY)) {
				var distance = Math.sqrt(Math.pow((e.pageX - boundary.rightX), 2) + Math.pow((e.pageY - boundary.topY), 2));
			}
			//cursor bottom right of element
			else if ((e.pageX >= boundary.rightX) && (e.pageY >= boundary.bottomY)) {
				var distance = Math.sqrt(Math.pow((e.pageX - boundary.rightX), 2) + Math.pow((e.pageY - boundary.bottomY), 2));
			}
			//cursor bottom left of element
			else if ((e.pageX <= boundary.leftX) && (e.pageY >= boundary.bottomY)) {
				var distance = Math.sqrt(Math.pow((e.pageX - boundary.leftX), 2) + Math.pow((e.pageY - boundary.bottomY), 2));
			}
			
			//cursor left of element
			else if (e.pageX < boundary.leftX) {
				var distance = boundary.leftX - opf.closeDistanceMin - e.pageX;
			}
			//cursor right of element
			else if (e.pageX > boundary.rightX) {
				var distance = e.pageX - boundary.rightX + opf.closeDistanceMin ;
			}
			//cursor top of element
			else if (e.pageY < boundary.topY) {
				var distance = boundary.topY - opf.closeDistanceMin - e.pageY;
			}
			//cursor bottom of element
			else if (e.pageY > boundary.bottomY) {
				var distance = e.pageY - boundary.bottomY + opf.closeDistanceMin;
			}
			
			
			//set the right opacity for the element
			if (distance > opf.farDistanceMax) { distance = opf.farDistanceMax;}
			var opacity = (opf.farDistanceMax - distance) / opf.farDistanceMax;
			
			if(opacity <= opf.farOpacity) {
			opacity = opf.farOpacity;
			}
			if(opacity >= opf.closeOpacity) {
			opacity = opf.closeOpacity;
			}

			$(this).stop().css("opacity",opacity);
			//$(this).stop().fadeTo(1,opacity);
		});
	}
	//set right the hover effect
	
	//$(opf.hover).css("border","1px solid #000000");
	//fade out the rest of elements
	if (opf.hover != null) {
		$("." + opf.className).stop().fadeTo(500, opf.farOpacity);
		$(opf.hover).stop().fadeTo(500, opf.closeOpacity);
	}
  
});
