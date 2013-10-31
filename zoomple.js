/*
	This plugin is developed by Yordan Stoev
	Homepage: http://yordanstoev.com/blog/zoomple-simple-jquery-plugin-for-image-zoom/
*/
(function($){
$.fn.zoomple = function(options) {  
	var timer; 
	options = jQuery.extend({ 
	 delay : 0,
	 zoomWidth : 300,
	 zoomHeight : 300,
	 offset : {x : 5,y : 5},
	 onZoomShow : function(){},
	 onZoomHide : function(){},
	 loaderURL : 'images/loader.gif',
	 blankURL : 'images/blank.gif',
	 source : 'href',
	 attachWindowToMouse : true, 
	 windowPosition : {x : 'right', y : 'top'}
	}, options|| {});   
	var stopLoading = new Array();
	// Checks if the preview holder div was alread appended
	if(!Boolean($('#Previewholder').attr('id'))) {
		$('body').append('<div id="Previewholder"><img src="'+options['blankURL']+'" alt="" /> <p></p> </div>');
	}
	$.each($(this),function() {	
			var img = new Image();  
			img.src = options['loaderURL'];
			$(this).find('img').hover(
				function(){ 					
					options.onZoomShow.call(this);
					if(options['source'] == 'href')	delaier($(this).parent().attr('href'),$(this).attr('alt'));		 
					else if(options['source'] == 'rel')	delaier($(this).parent().attr('rel'),$(this).attr('alt'));		 
				},
				function(){ 
					clearTimeout(timer); 
					
					if(options['source'] == 'href') stopLoading[$(this).parent().attr('href')] = false; 	 
					else if(options['source'] == 'rel')	stopLoading[$(this).parent().attr('rel')] = false; 	
					$("#Previewholder img").css({"background" : "black url("+options['blankURL']+") 50% 50% no-repeat"});			
					$("#Previewholder p").html(''); 
					$("#Previewholder").css({"display" : "none"});	
					options.onZoomHide.call(this);
			});
			$(this).find('img').mousemove(function(e){
				
				var x = ((e.pageX - $(this).offset().left) / $(this).width() )*100 ;
				var y =  ((e.pageY - $(this).offset().top) / $(this).height())*100; 
				$('#writer').html(x +" - "+ $(this).width() + " / " + y);
				if(options['attachWindowToMouse']){
						thumbPosition = { left : ( e.pageX ), 
											top : ( e.pageY ), 
											right : ($(window).width() - ( e.pageX - options['offset']['x'])), 
											bottom : ($(window).height() - ( e.pageY - options['offset']['y']))}; 
						if(($(window).height() +  $(window).scrollTop() - options['zoomHeight'] - options['offset']['y']) > thumbPosition.top){
							$("#Previewholder").css({ 
														'top' :  (thumbPosition.top + options['offset']['y']) + "px" 
														});  
						}else{
							$("#Previewholder").css({ 
														'top' :  (thumbPosition.top - options['zoomHeight'] - options['offset']['y']) + "px"  
														});  
						}
						if(($(window).width() +  $(window).scrollLeft() - options['zoomWidth'] - options['offset']['x']) > thumbPosition.left){
							$("#Previewholder").css({
														'left' : (thumbPosition.left + options['offset']['x']) + "px" 
														});  
						}else{
							$("#Previewholder").css({
														'left' : (thumbPosition.left - options['zoomWidth'] - options['offset']['x'])
														});  
														}
					}
					else{						 			
						var leftPos = $(this).offset().left - options['offset']['x'] - options['zoomWidth'];
						var rightPos = $(this).offset().left + $(this).width() + options['offset']['x']; 
						var topPos =  $(this).offset().top - options['offset']['y'];; 
						var bottomPos =  $(this).offset().top + $(this).height() - options['zoomHeight'] + options['offset']['y'];  
						if(options['windowPosition']['y'] == 'top') $("#Previewholder").css({'top' :  topPos + "px"});  	
						if(options['windowPosition']['x'] == 'left') $("#Previewholder").css({'left' :  leftPos + "px"});  	
						if(options['windowPosition']['y'] == 'bottom') $("#Previewholder").css({'top' :  bottomPos + "px"});  	
						if(options['windowPosition']['x'] == 'right') $("#Previewholder").css({'left' :  rightPos + "px"});  			 
					}
					$("#Previewholder img").css({"backgroundPosition" : x +"% "+ y +"%"});  
				
			}); 
		});   
		function delaier(imgRefUrl,imgDescription)
		{	   
			
			stopLoading[imgRefUrl] = true;  
			function delaiedZoom()
			{  
				
				$("#Previewholder").css({"display" : "block"});	
				$("#Previewholder img").css({"width" : options['zoomWidth'] + "px","height" : options['zoomHeight'] + "px","background" : "black url(" + options['loaderURL'] +") 50% 50% no-repeat"});		
				 
				  var objImagePreloader = new Image();
				  objImagePreloader.src = imgRefUrl;
				  if(objImagePreloader.complete){				
						if(stopLoading[imgRefUrl]) 
						{
							$("#Previewholder img").css({"background" : "black url("+imgRefUrl+") 50% 50% no-repeat"});					
							$("#Previewholder p").html(imgDescription); 
						} 
				  }
				  else{
					objImagePreloader.onload = function() {	
						if(stopLoading[imgRefUrl]) 
						{
							$("#Previewholder img").css({"background" : "black url("+imgRefUrl+") 50% 50% no-repeat"});					
							$("#Previewholder p").html(imgDescription); 
						}
					}
				  }
			}
			 
			timer = setTimeout(delaiedZoom, options['delay']);
		}
}  
})(jQuery);
 