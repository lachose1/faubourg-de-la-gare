/*
 *
 *		CUSTOM.JS
 *
 */

(function($){
	$("area").each(function() {
	    $(this).attr("coords-original", $(this).attr("coords"));
	});

	$(".sold-logo").each(function() {
	    $(this).attr("top-original", $(this).css("top").match(/\d+/));
	    $(this).attr("left-original", $(this).css("left").match(/\d+/));
	    $(this).attr("max-width-original", $(this).css("max-width").match(/\d+/));
	});

	if($(window).width() < 900) {
		var coefficient = $(window).width() / 900;
		// console.log(winWidth / 900);
		$("area").each(function() {
		    var pairs = $(this).attr("coords-original").split(', ');
		    for(var i=0; i<pairs.length; i++) {
		        var nums = pairs[i].split(',');
		        for(var j=0; j<nums.length; j++) {
		            nums[j] = parseFloat(nums[j]) * coefficient;
		        }
		        pairs[i] = nums.join(',');
		    }
		    $(this).attr("coords", pairs.join(', '));
		});
		$(".sold-logo").each(function() {
	    	$(this).css("top", $(this).attr("top-original") * coefficient + "px");
	    	$(this).css("left", $(this).attr("left-original") * coefficient + "px");
	    	$(this).css("max-width", $(this).attr("max-width-original") * coefficient + "px");
		});
	}

	$(window).resize(function() {
		var winWidth = $(window).width();
		if(winWidth < 900) {
			var coefficient = winWidth / 900;
			// console.log(winWidth / 900);
			$("area").each(function() {
			    var pairs = $(this).attr("coords-original").split(', ');
			    for(var i=0; i<pairs.length; i++) {
			        var nums = pairs[i].split(',');
			        for(var j=0; j<nums.length; j++) {
			            nums[j] = parseFloat(nums[j]) * coefficient;
			        }
			        pairs[i] = nums.join(',');
			    }
			    $(this).attr("coords", pairs.join(', '));
			});
			$(".sold-logo").each(function() {
	    		$(this).css("top", $(this).attr("top-original") * coefficient + "px");
	    		$(this).css("left", $(this).attr("left-original") * coefficient + "px");
	    		$(this).css("max-width", $(this).attr("max-width-original") * coefficient + "px");
			});
		}
		else {
			var coefficient = 1;
			$("area").each(function() {
			    var pairs = $(this).attr("coords-original").split(', ');
			    for(var i=0; i<pairs.length; i++) {
			        var nums = pairs[i].split(',');
			        for(var j=0; j<nums.length; j++) {
			            nums[j] = parseFloat(nums[j]) * coefficient;
			        }
			        pairs[i] = nums.join(',');
			    }
			    $(this).attr("coords", pairs.join(', '));
			});
			$(".sold-logo").each(function() {
	    		$(this).css("top", $(this).attr("top-original") * coefficient + "px");
	    		$(this).css("left", $(this).attr("left-original") * coefficient + "px");
	    		$(this).css("max-width", $(this).attr("max-width-original") * coefficient + "px");
			});
		}
	});

	
	"use strict";
	
	// DETECT TOUCH DEVICE //
	function is_touch_device() {
		return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
	}
	
	
	// SHOW/HIDE MOBILE MENU //
	function show_hide_mobile_menu() {
		
		$("#mobile-menu-button").on("click", function(e) {
            
			e.preventDefault();
			
			$("#mobile-menu").slideToggle(300);
			
        });	
		
	}
	
	
	// MOBILE MENU //
	function mobile_menu() {
		
		if ($(window).width() < 1200) {
			
			if ($("#menu").length > 0) {
			
				if ($("#mobile-menu").length < 1) {
					
					$("#menu").clone().attr({
						id: "mobile-menu",
						class: ""
					}).insertAfter("#header");
					
					$("#mobile-menu .megamenu > a").on("click", function(e) {
                        
						e.preventDefault();
						
						$(this).toggleClass("open").next("div").slideToggle(300);
						
                    });
					
					$("#mobile-menu .dropdown > a").on("click", function(e) {
                        
						e.preventDefault();
						
						$(this).toggleClass("open").next("ul").slideToggle(300);
						
                    });
				
				}
				
			}
				
		} else {
			
			$("#mobile-menu").hide();
			
		}
		
	}
	
	
	// HEADER SEARCH //
	function header_search() {	
		
		$(".menu li.search a").on("click", function(e) { 
		
			e.preventDefault();
			
			if(!$(".menu li.search a").hasClass("open")) {
			
				$("#search-form").fadeIn(0).addClass("open");
				
				$("#search-form").append('<a class="close" href="#">x</a>');
				
			}
			
			$("#search-form a.close").on("click", function(e) { 
		
				e.preventDefault();
				$("#search-form").fadeOut(0).removeClass("open");
				
			});
			
		});
		
	 }
	
	
	// STICKY //
	function sticky() {
		
		var sticky_point = 155;
		
		$("#header").clone().attr({
			id: "header-sticky",
			class: ""
		}).insertAfter("header");
		
		$(window).scroll(function(){
			
			if ($(window).scrollTop() > sticky_point) {  
				$("#header-sticky").slideDown(300).addClass("header-sticky");
				$("#header .menu ul, #header .menu .megamenu-container").css({"visibility": "hidden"});
			} else {
				$("#header-sticky").slideUp(100).removeClass("header-sticky");
				$("#header .menu ul, #header .menu .megamenu-container").css({"visibility": "visible"});
			}
			
		});
		
	}
	
 
	// PROGRESS BARS // 
	function progress_bars() {
		
		$(".progress .progress-bar:in-viewport").each(function() {
			
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				$(this).animate({
					width: $(this).attr("data-width") + "%"
				}, 2000);
			}
			
		});
		
	}


	// CHARTS //
	function pie_chart() {
		
		if (typeof $.fn.easyPieChart !== 'undefined') {
		
			$(".pie-chart:in-viewport").each(function() {
				
				$(this).easyPieChart({
					animate: 1500,
					lineCap: "square",
					lineWidth: $(this).attr("data-line-width"),
					size: $(this).attr("data-size"),
					barColor: $(this).attr("data-bar-color"),
					trackColor: $(this).attr("data-track-color"),
					scaleColor: "transparent",
					onStep: function(from, to, percent) {
						$(this.el).find(".pie-chart-percent .value").text(Math.round(percent));
					}
				});
				
			});
			
		}
		
	}
	
	// COUNTER //
	function counter() {
		
		if (typeof $.fn.jQuerySimpleCounter !== 'undefined') {
		
			$(".counter .counter-value:in-viewport").each(function() {
				
				if (!$(this).hasClass("animated")) {
					$(this).addClass("animated");
					$(this).jQuerySimpleCounter({
						start: 0,
						end: $(this).attr("data-value"),
						duration: 2000
					});	
				}
			
			});
			
		}
	}
	
	
	// LOAD MORE PROJECTS //
	function load_more_projects() {
	
		var number_clicks = 0;
		
		$(".load-more").on("click", function(e) {
			
			e.preventDefault();
			
			if (number_clicks == 0) {
				$.ajax({
					type: "POST",
					url: $(".load-more").attr("href"),
					dataType: "html",
					cache: false,
					msg : '',
					success: function(msg) {
						$(".isotope").append(msg);	
						$(".isotope").imagesLoaded(function() {
							$(".isotope").isotope("reloadItems").isotope();
							$(".fancybox").fancybox({
								prevEffect: 'none',
								nextEffect: 'none'
							});
						});
						number_clicks++;
						$(".load-more").html("Nothing to load");
					}
				});
			}
			
		});
		
	}
	
	
	// MULTILAYER PARALLAX //
	function multilayer_parallax() {
		
		$(".multilayer-parallax .parallax-layer").each(function(){
			
			var x = parseInt($(this).attr("data-x"), 10),
				y = parseInt($(this).attr("data-y"), 10);
			
			$(this).css({
				"left": x + "%", 
				"top": y + "%"
			});
			
			if ($(this).attr("data-x") === "center") {
				$(this).addClass("x-center");
			}
			
		});

	}
	
	
	// SHOW/HIDE SCROLL UP //
	function show_hide_scroll_top() {
		
		if ($(window).scrollTop() > $(window).height()/2) {
			$("#scroll-up").fadeIn(300);
		} else {
			$("#scroll-up").fadeOut(300);
		}
		
	}
	
	
	// SCROLL UP //
	function scroll_up() {				
		
		$("#scroll-up").on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
	}
	
	
	// INSTAGRAM FEED //
	function instagram_feed() {

		if ($("#instafeed").length > 0 ) {
				
			var nr = $("#instafeed").data('number');
			var userid = $("#instafeed").data('user');
			var accesstoken = $("#instafeed").data('accesstoken');
			
			var feed = new Instafeed({
				target: 'instafeed',
				get: 'user',
				userId: userid,
				accessToken: accesstoken,
				limit: nr,
				resolution: 'thumbnail',
				sortBy: 'most-recent'
			});
			
			feed.run();
		
		}
			
	}
	
	
	// SMOOTH SCROLLING //
	function smooth_scrolling() {
		
		$(".scroll-down a").on("click", function() {
			
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - 120
					}, 1000);
				
					return false;
				
				}
			
			}
			
		});
		
	}
	
	
	// DRAG SLIDER //
	function drag_slider() {

		var availHeight = $('.content-body').outerHeight() - $('.content-mask').outerHeight();

		new Dragdealer('content-scroller', {
			horizontal: false,
			vertical: true,
			yPrecision: availHeight,
			animationCallback: function(x, y) {
				$('.content-body').css('margin-top', -y * availHeight);
			}
		});

	}
	
	
	// EQUAL HEIGHT //
	function equal_height() {

		$(".text-boxes-list").each(function(){
			
			var x = 0;
			
			$(".text-boxes-list li").each(function() {
				
				if($(this).height() > x) {
					x = $(this).height();
				}
				
			});
			
			$(".text-boxes-list li .text-box").css("height", x + "px");

		});

	}
	
	
	// FULL SCREEN //
	function full_screen() {

		if ($(window).width() > 767) {
			$(".full-screen").css("height", $(window).height() + "px");
		} else {
			$(".full-screen").css("height", "auto");
		}

	}
	
	
	// ANIMATIONS //
	function animations() {
		
		animations = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 100,
			mobile: false,
			live: true
		});
		
		animations.init();
		
	}
	
	// DOCUMENT READY //
	$(document).ready(function(){
		
		// STICKY //
		sticky();
		
		
		// MENU //
		if (typeof $.fn.superfish !== 'undefined') {
			
			$(".menu").superfish({
				delay: 500,
				animation: {
					opacity: 'show',
					height: 'show'
				},
				speed: 'fast',
				autoArrows: true
			});
			
		}
		
		
		// SHOW/HIDE MOBILE MENU //
		show_hide_mobile_menu();
		
		
		// MOBILE MENU //
		mobile_menu();
		
		
		// HEADER SEARCH //
		header_search();
		
		
		// FANCYBOX //
		if (typeof $.fn.fancybox !== 'undefined') {
		
			$(".fancybox").fancybox({
				prevEffect: 'none',
				nextEffect: 'none'
			});
		
		}
		
		// REVOLUTION SLIDER //
		if (typeof $.fn.revolution !== 'undefined') {
			
			$(".rev_slider").revolution({
				sliderType: "standard",
				sliderLayout: "auto",
				delay: 9000,
				navigation: {
					arrows:{
						style: "custom",
						enable: true,
						hide_onmobile: true,
						hide_onleave: false,
						hide_delay: 200,
						hide_delay_mobile: 1200,
						hide_under: 0,
						hide_over: 9999,
						tmp: '',
						left: {
							h_align: "left",
							v_align: "center",
							h_offset: 20,
							v_offset: 0
						 },
						 right: {
							h_align: "right",
							v_align: "center",
							h_offset: 20,
							v_offset: 0
						 }
					},
					bullets:{
						style: "custom",
						enable: true,
						hide_onmobile: false,
						hide_onleave: false,
						hide_delay: 200,
						hide_delay_mobile: 1200,
						hide_under: 0,
						hide_over: 9999,
						tmp: '', 
						direction: "horizontal",
						space: 5,       
						h_align: "center",
						v_align: "bottom",
						h_offset: 0,
						v_offset: 40
					},
					touch:{
						touchenabled: "on",
						swipe_treshold: 75,
						swipe_min_touches: 1,
						drag_block_vertical: false,
						swipe_direction: "horizontal"
					}
				},			
				gridwidth: 1140,
				gridheight: 800
					
			});
			
		}
	
	
		// OWL Carousel //
		if (typeof $.fn.owlCarousel !== 'undefined') {
			
			// IMAGES SLIDER //
			var images_slider = $(".owl-carousel.images-slider").owlCarousel({
				items: 1,
				autoplay: false,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: false,
				touchDrag: false,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut'
			});
			
			$(".images-slider-navigation a").each(function() {
				
				$(this).click(function() {
					
					var x = $(this).attr("data-slide");
					
					$(".images-slider-navigation a").removeClass("active");
					$(this).addClass("active");
					
					images_slider.trigger('to.owl.carousel', [x-1, 500, true]);
					return false;

				})
				
			});
			
			
			// IMAGES SLIDER 2 //
			var images_slider_2 = $(".owl-carousel.images-slider-2").owlCarousel({
				items: 1,
				autoplay: false,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: false,
				touchDrag: false,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut'
			});
			
			$(".images-slider-2-navigation a").each(function() {
				
				$(this).click(function() {
					
					var x = $(this).attr("data-slide");
					
					$(".images-slider-2-navigation a").removeClass("active");
					$(this).addClass("active");
					
					images_slider_2.trigger('to.owl.carousel', [x-1, 500, true]);
					return false;

				})
				
			});
			
			
			// IMAGES SLIDER 3 //
			$(".owl-carousel.images-slider-3").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 2000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				navText: false,
				dots: true,
				mouseDrag: true,
				touchDrag: true,
				animateIn: 'slideInDown',
				animateOut: 'slideOutDown'
			});
			
			
			// PROJECTS DESCRIPTIONS SLIDER //
			var projects_descriptions_slider = $(".owl-carousel.projects-descriptions-slider").owlCarousel({
				items: 1,
				autoplay: false,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: false,
				touchDrag: false
			});
			
			
			// PROJECTS IMAGES SLIDER //
			var projects_images_slider = $(".owl-carousel.projects-images-slider").owlCarousel({
				items: 1,
				autoplay: false,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: false,
				touchDrag: false
			});
			
			$(".projects-slider-thumbs a").each(function() {
				
				$(this).click(function() {
					
					var x = $(this).attr("data-slide");
					
					$(".projects-slider-thumbs a").removeClass("active");
					$(this).addClass("active");
					
					projects_images_slider.trigger('to.owl.carousel', [x-1, 500, true]);
					projects_descriptions_slider.trigger('to.owl.carousel', [x-1, 500, true]);
					return false;

				})
				
			});
			
			
			// PROJECTS SLIDER 2 //
			if ($(window).width() > 767) {
				
				var projects_images_slider_2 = $(".owl-carousel.projects-slider-2").owlCarousel({
					items: 1,
					autoplay: false,
					autoplayTimeout: 3000,
					autoplayHoverPause: true,
					loop: true,
					nav: false,
					smartSpeed: 1200,
					navText: false,
					dots: false,
					stagePadding: 150, 
					mouseDrag: true,
					touchDrag: true
				});
				
			} else {
				
				var projects_images_slider_2 = $(".owl-carousel.projects-slider-2").owlCarousel({
					items: 1,
					autoplay: false,
					autoplayTimeout: 3000,
					autoplayHoverPause: true,
					loop: true,
					nav: false,
					smartSpeed: 1200,
					navText: false,
					dots: false,
					stagePadding: 0, 
					mouseDrag: true,
					touchDrag: true
				});
				
			}
			
			$('.projects-slider-2-navigation .prev').click(function() {
				projects_images_slider_2.trigger('prev.owl.carousel');
			});
			
			$('.projects-slider-2-navigation .next').click(function() {
				projects_images_slider_2.trigger('next.owl.carousel');
			});
			
			
			// PROJECTS SLIDER 3 //
			var projects_slider_3 = $(".owl-carousel.projects-slider-3").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				smartSpeed: 1200,
				navText: false,
				dots: true,
				mouseDrag: false,
				touchDrag: true,
				animateIn: 'slideInDown',
				animateOut: 'slideOutDown'
			});
			
			projects_slider_3.on('translate.owl.carousel', function(event) {
				$(".projects-slider-3 .project-description").delay(200).addClass("animated");
			});
			
			projects_slider_3.on('translated.owl.carousel', function(event) {
				$(".projects-slider-3 .project-description").removeClass("animated");
			});
			
			
			// TEXT SLIDER //
			$(".owl-carousel.text-slider").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				smartSpeed: 1200,
				navText: false,
				dots: true,
				mouseDrag: true,
				touchDrag: true,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut'
			});
			
			
			// TESTIMONIALS SLIDER //
			$(".owl-carousel.testimonials-slider").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				smartSpeed: 1200,
				navText: false,
				dots: true,
				mouseDrag: true,
				touchDrag: true
			});
			
			
			// TESTIMONIALS SLIDER 2 //
			var testimonials_slider_2 = $(".owl-carousel.testimonials-slider-2").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: false,
				smartSpeed: 1200,
				navText: false,
				dots: true,
				mouseDrag: true,
				touchDrag: true
			});
			
			$('.testimonials-slider-2-navigation .prev').click(function() {
				testimonials_slider_2.trigger('prev.owl.carousel');
			});
			
			$('.testimonials-slider-2-navigation .next').click(function() {
				testimonials_slider_2.trigger('next.owl.carousel');
			});
			
			
			// LOGOS SLIDER //
			$(".owl-carousel.logos-slider").owlCarousel({
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				loop: true,
				nav: true,
				smartSpeed: 1200,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				responsive: {
					0:{
						items: 1
					},
					480:{
						items: 2
					},
					768:{
						items: 3
					},
					992:{
						items: 4
					},
					1200:{
						items: 5
					}
				}
			});
			
		}
		
		
		// GOOGLE MAPS //
		if (typeof $.fn.gmap3 !== 'undefined') {
		
			$(".map").each(function(){
				
				var data_zoom = 15,
					data_height;
				
				if ($(this).attr("data-zoom") !== undefined) {
					data_zoom = parseInt($(this).attr("data-zoom"),10);
				}	
				
				if ($(this).attr("data-zoom") !== undefined) {
					data_height = parseInt($(this).attr("data-height"),10);
				}	
				
				$(this).gmap3({
					marker: {
						values: [{
							address: $(this).attr("data-address"),
							data: $(this).attr("data-address-details")
						}],
						options:{
							draggable: false
						},
						events:{
							mouseover: function(marker, event, context){
								var map = $(this).gmap3("get"),
								infowindow = $(this).gmap3({get:{name:"infowindow"}});
								if (infowindow){
									infowindow.open(map, marker);
									infowindow.setContent(context.data);
								} else {
									$(this).gmap3({
										infowindow:{
											anchor:marker, 
											options:{content: context.data}
										}
									});
								}
							},
							mouseout: function(){
								var infowindow = $(this).gmap3({get:{name:"infowindow"}});
								if (infowindow){
									infowindow.close();
								}
							}
						}
					},
					map: {
						options: {
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							zoom: data_zoom,
							scrollwheel: false
						}
					}
				}).css("height", data_height + "px");
				
			});
			
		}
		
		
		// ISOTOPE //
		if ((typeof $.fn.imagesLoaded !== 'undefined') && (typeof $.fn.isotope !== 'undefined')) {
		
			$(".isotope").imagesLoaded( function() {
				
				var container = $(".isotope");
				
				container.isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					transitionDuration: '0.8s'
				});
				
				$(".filter li a").on("click", function() {
					$(".filter li a").removeClass("active");
					$(this).addClass("active");
		
					var selector = $(this).attr("data-filter");
					container.isotope({
						filter: selector
					});
		
					return false;
				});
		
				$(window).resize(function() {
					container.isotope();
				});
				
				var container_masonry = $(".isotope.masonry");
			
				container_masonry.isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					masonry: {
						columnWidth: 1,
						gutter: 1
					},
					transitionDuration: '0.8s'
				});
				
				$(".filter li a").on("click", function() {
					$(".filter li a").removeClass("active");
					$(this).addClass("active");
		
					var selector = $(this).attr("data-filter");
					container_masonry.isotope({
						filter: selector
					});
		
					return false;
				});
		
				$(window).resize(function() {
					container_masonry.isotope();
				});
				
			});
			
		}
		
		
		// LOAD MORE PORTFOLIO ITEMS //
		load_more_projects();
		
		
		// PLACEHOLDER //
		if (typeof $.fn.placeholder !== 'undefined') {
			
			$("input, textarea").placeholder();
			
		}
		
		
		// CONTACT FORM VALIDATE & SUBMIT //
		// VALIDATE //
		if (typeof $.fn.validate !== 'undefined') {
		
			$("#contact-form").validate({
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					subject: {
						required: true
					},
					message: {
						required: true,
						minlength: 3
					}
				},
				messages: {
					name: {
						required: "Please enter your name!"
					},
					email: {
						required: "Please enter your email!",
						email: "Please enter a valid email address"
					},
					subject: {
						required: "Please enter the subject!"
					},
					message: {
						required: "Please enter your message!"
					}
				},
					
				// SUBMIT //
				submitHandler: function(form) {
					var result;
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "assets/php/send.php",
						success: function(msg) {
							
							if (msg == 'OK') {
								result = '<div class="alert alert-success">Your message was successfully sent!</div>';
								$("#contact-form").clearForm();
							} else {
								result = msg;
							}
							
							$("#alert-area").html(result);
		
						},
						error: function() {
		
							result = '<div class="alert alert-danger">There was an error sending the message!</div>';
							$("#alert-area").html(result);
		
						}
					});
				}
			});
			
		}
		
		
		// MULTILAYER PARALLAX //
		multilayer_parallax();
		
		
		// PARALLAX //
		if (typeof $.fn.stellar !== 'undefined') {
		
			if (!is_touch_device()) {
				
				$(window).stellar({
					horizontalScrolling: false,
					verticalScrolling: true,
					responsive: true
				});
				
			}
		
		}
		
		
		// SHOW/HIDE SCROLL UP
		show_hide_scroll_top();
		
		
		// SCROLL UP //
		scroll_up();
		
		
		// YOUTUBE PLAYER //
		if (typeof $.fn.mb_YTPlayer !== 'undefined') {
			
			$(".youtube-player").mb_YTPlayer();
		
		}
		
		
		// INSTAGRAM FEED //
		instagram_feed();
		
		
		// COUNTDOWN //
		if (typeof $.fn.countdown !== 'undefined') {
			
			$(".countdown").countdown('2017/12/31 00:00', function(event) {
				$(this).html(event.strftime(
					'<div><div class="counter">%-D</div> <span>Days</span></div>' +
					'<div><div class="counter">%-H</div> <span>Hours</span></div>' +
					'<div><div class="counter">%-M</div> <span>Minutes</span></div>' +
					'<div><div class="counter">%S</div> <span>Seconds</span></div>'
				));
			});
		
		}
		
		
		// SMOOTH SCROLLING //
		smooth_scrolling();
		
		
		// DRAG SLIDER //
		drag_slider();
		
		
		// EQUAL HEIGHT //
		equal_height();
		
		
		// FULL SCREEN //
		full_screen();
		
		
		// ANIMATIONS //
		animations();
		
	});

	
	// WINDOW SCROLL //
	$(window).scroll(function() {
		
		progress_bars();
		pie_chart();
		counter();
		show_hide_scroll_top();
		
	});
	
	
	// WINDOW RESIZE //
	$(window).resize(function() {

		mobile_menu();
		equal_height();
		full_screen();
		
	});
	
})(window.jQuery);