jQuery.noConflict();
var CONF_VAL_STICKY = 90;
var m = false;
var aj_styling = false;
var aj_accordion = false;
var token = Math.random();
var popClose = false;
var func_call = 0;
var yOffset = 0;
var offset_float_icons = 0;
var scrtop_one = 0;
var scrtop_two = 0;
var winheight = 0;
var winwidth = 0;
var winmobile = 1124;
var small_screen = 0;
/* var _tok_cc = '?tk='+token; */ 
var _tok_cc = "";


/*//DYNAMIC LOADERS BASE*/
jQuery(document).ready(function ($) {
	jQuery.cachedScript = function (url, options) {
		options = $.extend(options || {}, {
			dataType: "script",
			cache: true,
			url: url,
		});
		return jQuery.ajax(options);
	};
});

function loadcssfile(filename) {
	var fileref = document.createElement("link");
	fileref.setAttribute("defer", "");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	if (typeof fileref != "undefined") {
		document.getElementById("dynaScript").appendChild(fileref);
	}
}

function loadjsfile(filename) {
	var fileref = document.createElement("script");
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", filename);
	if (typeof fileref != "undefined") {
		document.getElementById("dynaScript").appendChild(fileref);
	}
}

function pagerSetup(target) {
	jQuery(document).ready(function ($) {
		var pages = $(target).children().length;
		var pagerSize = 100 / pages;
		$(target)
			.children()
			.css("width", pagerSize + "%");
		$(target).children(":last").css("backgroundImage", "none");
		$(target).children(":first").css("border", "none");
	});
}
 

function boxEqualHeight(target) {
	jQuery(document).ready(function ($) {
		if ($("div." + target).length) {
			var maxHeight = 0;
			$("div." + target).each(function () {
				if ($(this).height() > maxHeight) {
					maxHeight = $(this).height();
				}
			});
			$("div." + target).height(maxHeight);
		}
	});
}

function doHeaderStyle() {
	jQuery(document).ready(function ($) {
		if ($(".scroll-to-top").length) {
			
			var windowpos = $(window).scrollTop();
			var sticky_thresh = windowpos - CONF_VAL_STICKY; 

			var siteHeader = $(".main-header .head-wrap-main");
			var scrollLink = $(".scroll-to-top");
			if (windowpos > CONF_VAL_STICKY && sticky_thresh > 10 && !jQuery("body").hasClass("header-sticky")) {
				jQuery("body").addClass("header-sticky");
				scrollLink.show(300);
			} else if (windowpos < CONF_VAL_STICKY) {
				jQuery("body").removeClass("header-sticky");
				scrollLink.hide(300);
			}
		}
	});

}  


function doAccordion() {
	/* // if(aj_accordion === false){ */
	jQuery(document).ready(function($) {
		$('.accordion-box div.accordion-content').hide(); 
		$('.accordion-box .acc_link').click(function() {
			var cont_link_id = $(this).data("id");  var cont_head_id = "acc_head_"+cont_link_id; var cont_guts_id = "acc_guts_"+cont_link_id;

			if ($("#"+cont_head_id).hasClass('accordion-header-active')) {
				$("#"+cont_head_id).removeClass("accordion-header-active").addClass("collapsed"); 
				$("#"+cont_guts_id).removeClass("accordion-content-active").slideUp().html("");
			} else {  
				var de_call     = 'fc_accordion_content';  var acc_params  = btoa(JSON.stringify({ fc: de_call, fv: cont_link_id })); 
				$.ajax({ type: 'post', url: 'assets/includes/ajapp.php', cache: true, data: { fdt: acc_params }, dataType: 'html',
					success: function(response) { $("#"+cont_guts_id).html(response);  doModalLinks(); doImageDisplays(); },
					error: function(data) { console.log("error_data", data); }
				});

				$("#"+cont_head_id).addClass("accordion-header-active").removeClass("collapsed");
				$("#"+cont_guts_id).addClass("accordion-content-active").show();
			}
			return false;
		});

		if ($('.accordion-box div.accordion-content-active').length) { $('.accordion-box div.accordion-content-active').show(); }  
		/* // aj_accordion = true; */
	});
	/* // } */
}



function doAccordionLegacy() {
	
	jQuery(document).ready(function($) {
		$('.accordion-flat div.accordion-content').hide(); 
		$('.accordion-flat .accordion-header, .accordion-flat .accordion-header-alt').click(function() {
			var cont_link_id = $(this).data("id");  
			
			var cont_head_id = "acc_head_"+cont_link_id; var cont_guts_id = "acc_guts_"+cont_link_id;

			if ($("#"+cont_head_id).hasClass('accordion-header-active')) {
				$("#"+cont_head_id).removeClass("accordion-header-active").addClass("collapsed"); 
				$("#"+cont_guts_id).removeClass("accordion-content-active").slideUp().html("");
			} else {   

				$("#"+cont_head_id).addClass("accordion-header-active").removeClass("collapsed");
				$("#"+cont_guts_id).addClass("accordion-content-active").show();
			}
			return false;
		});

		if ($('.accordion-flat div.accordion-content-active').length) {
			$('.accordion-flat div.accordion-content-active').show();
		} 

	}); 
}



function doImageDisplays() {
	jQuery(document).ready(function ($) {
		/*//IMAGE FUNCTIONS*/
		
		if (
			$("div.news-bits img").length &&
			$("div.main-guts img").not(".gravatar")
		) {
			$("div.news-bits img").wrap($("<span class='listChopa'>"));
		}

		if ($("div.eq33_cols img").length) {
			$("div.eq33_cols img").wrap($("<span class='bitChopa'>"));
		}
		if ($("div.home-bits img").length) {
			$("div.home-bits img").wrap($("<span class='bitChopa'>"));
		}
		if ($("div.long-bits img").length) {
			$("div.long-bits img").wrap($("<span class='bitChopa'>"));
		}
		if ($("div.grid-item img").length) {
			$("div.grid-item img").wrap($("<span class='bitChopa'>"));
		}

		if ($("div.accordion-content img").length) {
			/* $("div.accordion-content").addCaptions(); */
			$("div.accordion-content img")
				.not(".midSize")
				.each(function () {
					$(this).addClass("cwa-lightbox-image x--fancypic");
				});
		}
		if ($("div.main-guts img").not(".image-full").length) {
			/* // $("div.main-guts").addCaptions(); */
			$("div.main-guts img").each(function () {
				var isrc = $(this).attr('src'); if (isrc != undefined) {$(this).attr('href', isrc);}
				$(this).addClass("cwa-lightbox-image x--fancypic");
			});
		}

		if ($("div.hy-mains").length && $("div.hy-mains img").length) {
			$("div.hy-mains").addCaptions();
			$("div.hy-mains img").not(".midSize").each(function () {var isrc = $(this).attr('src'); if (isrc != undefined) {$(this).attr('href', isrc);} $(this).addClass("cwa-lightbox-image x--fancypic");});
		}


		/* if ($('div.wrap_menu_intro img').length) { $('div.wrap_menu_intro').addCaptions(); $('div.wrap_menu_intro img').each(function() { $(this).addClass("fancypic"); }); fancyModals(); } */

		if (jQuery(".bitChopaWrap").length) {
			jQuery(".bitChopaWrap").show();
			if (jQuery(".menu-column").length) {
				jQuery(".menu-column .carChopa").addClass("menuborder").show();
			}
		}
		if (jQuery(".bitChopa").length) {
			jQuery(".bitChopa").removeClass("hidden").show();
		}
		if (jQuery("div.main-guts img").length) {
			jQuery("div.main-guts img").show();
		}

		$(".modalpic").each(function () {
			$(this).on("click", function (event) {
				event.preventDefault();
				var icap = $(this).attr("title") !== "" ? $(this).attr("title") : "";
				var itag =
					'<div class="modal text-center"><div class="modal-content modal-auto">' +
					$(this).html() +
					"</br>" +
					icap +
					'<a data-dismiss="modal" class="close-modal" rel="modal:close">Close</a></div></div>';
				$(itag).appendTo("body").modal({showClose: false});
			});
		});

		$(".modalvid").each(function () {
			$(this).on("click", function (event) {
				event.preventDefault();
				var iref = this.href;
				var itag =
					'<div class="modal text-center"><div class="modal-content modal-auto w-100"><div class="modal-headerX text-right px-3"><a data-dismiss="modal" class="close-modal" rel="modal:close">x</a></div><div class="modal-body text-center w-100 m-0 p-0"><iframe src="' +
					iref +
					'" width="100%"  style="min-height:60vh" frameborder="0" webkitallowfullscreen="" allowfullscreen="" id="modal_iframe"></iframe></br>' +
					$(this).attr("title") +
					' <a data-dismiss="modal" class="close-modal" rel="modal:close">Close</a></div></div></div>';
				$(itag).appendTo("body").modal({showClose: false});
				$(".close-modal").on("click", function () {
					$("#modal_iframe").attr("src", ""); $('#uni_basic').hide().html(''); $('.blocker').hide(); $(".modal-backdrop").removeClass("show").hide(); $("body").removeClass('modal-open');
				});
			});
		});
 
	});
}

function doHitsLog() {
	/*jQuery('.linkMenu').click(function () {	
	   jQuery.post("assets/includes/ajx_hits.php",{ ht_tb:'tb_menu',ht_id: jQuery(this).attr("data-id"),rand:Math.random() } ,function(data){});
   });*/

	jQuery(".linkCont").click(function () {
		jQuery.post(
			"assets/includes/ajhits.php",
			{
				ht_tb: "tb_cont",
				ht_id: jQuery(this).attr("data-id"),
				rand: Math.random(),
			},
			function (data) { }
		);
	});

	jQuery(".linkRes").click(function () {
		jQuery.post(
			"assets/includes/ajhits.php",
			{
				ht_tb: "tb_docs",
				ht_id: jQuery(this).attr("data-id"),
				rand: Math.random(),
			},
			function (data) { }
		);
	});
}

function doGridMasonry() { }


function zul_nav_sidecats_docs() {
	jQuery(document).ready(function ($) {
		if (jQuery(".wrap_res_nav_cat").length) {
			jQuery(".wrap_res_nav_cat").each(function () {
				var box_id = jQuery(this).attr("id");
				var box_tag = jQuery(this).attr("data-value");
				var box_label = jQuery(this).attr("data-label");
				var box_com = jQuery(this).attr("data-com");
				var de_call = "fc_navcats";
				var legoo = btoa(
					JSON.stringify({
						fc: de_call,
						fv: box_tag,
						fname: box_label,
						fcom: box_com,
					})
				);

				$.ajax({
					type: "post",
					url: "assets/includes/ajapp.php" + _tok_cc,
					cache: true,
					data: {fdt: legoo},
					dataType: "html",
					success: function (response) {
						$("#" + box_id).html(response);
						if ($("#check_all").length) {
							$("#check_all").click(function () {
								var n = $("#check_all:checked").length;
								if (n == 1) {
									$(":checkbox").attr("checked", true);
								} else {
									$(":checkbox").attr("checked", false);
								}
							});
						}
					},
					error: function (data) {console.log("error_data", data);},
				});
			});
		}
	});
}

var el_call;
var el_acom;

function zul_nav_sidecats_tabs(el_class) {
	jQuery(document).ready(function ($) {
		if (jQuery("." + el_class).length) {
			var el_search = true;

			var loops = $("." + el_class).length;
			var inst = 0;

			jQuery("." + el_class).each(function () {
				var box_id = jQuery(this).attr("id");
				el_call = jQuery(this).attr("data-ref");
				var box_tag = jQuery(this).attr("data-value");
				var box_label = jQuery(this).attr("data-label");
				var box_com = jQuery(this).attr("data-com");
				el_acom = box_com;

				var day_from = jQuery("#filter_range_start").length
					? jQuery("#filter_range_start").val()
					: "";
				var day_to = jQuery("#filter_range_end").length
					? jQuery("#filter_range_end").val()
					: "";
				var de_call = "fc_navcats";
				var legoo = btoa(
					JSON.stringify({
						fc: de_call,
						fv: box_tag,
						fname: box_label,
						fcom: box_com,
						fdfrom: day_from,
						fdto: day_to,
					})
				);

				$.ajax({
					type: "post",
					url: "assets/includes/ajapp.php" + _tok_cc,
					cache: true,
					data: {fdt: legoo},
					dataType: "html",
					success: function (response) {
						$("#" + box_id).html(response);
						inst++;
						if (inst === loops) {
							zul_nav_sidecats_search("", el_call, box_com);
							jQuery(document).on(
								"change",
								".f_subs, .f_choice, .f_date",
								function (e) {
									zul_nav_sidecats_search("", el_call, box_com);
								}
							);

							if ($("#check_all").length) {
								$("#check_all").click(function () {
									var n = $("#check_all:checked").length;
									if (n == 1) {
										$(":checkbox").attr("checked", true);
									} else {
										$(":checkbox").attr("checked", false);
									}
									zul_nav_sidecats_search("", el_call, box_com);
								});
							}
						}
					},
					error: function (data) {console.log("error_data", data);},
				});
			});

			if (jQuery("#dt_searchtext_submit").length) {
				jQuery("#dt_searchtext_submit").on("click", function (e) {
					zul_nav_sidecats_search("", el_call, el_acom);
				});
			}
		}
	});
}

function zul_nav_sidecats_search(fpage, el_call, el_com) {
	jQuery(document).ready(function ($) {

		if (fpage === undefined || fpage === "") fpage = 1;
		if (el_com === undefined || el_com === "") el_com = el_acom;
		let ops_checked = 0;
		let ops_subs = [];
		let ops_choice = [];
		let ops_chocat = [];
		ops_chocat["focus_area"] = [];
		ops_chocat["pillar"] = [];
		ops_chocat["dtfrom"] = jQuery("#filter_range_start").length
			? jQuery("#filter_range_start").val()
			: "";
		ops_chocat["dtto"] = jQuery("#filter_range_end").length
			? jQuery("#filter_range_end").val()
			: "";
		var box_searchtext = jQuery("#dt_searchtext").length
			? js_clean_title(jQuery("#dt_searchtext").val())
			: "";
		ops_chocat["dttext"] = box_searchtext;

		if ($(".f_subs:checked").length > 0) {
			$(".side_subs").removeClass("fw-bold");
			$(".f_subs").each(function () {
				if ($(this).prop("checked")) {
					var sub_val = $(this).attr("data-value");
					$("#side_subs_" + sub_val + "").addClass("fw-bold");
					if (!ops_subs.includes(sub_val)) {
						ops_subs.push(sub_val);
						ops_checked++;
					}
				}
			});
		} else {
			ops_subs.push(
				el_com
			);  
		}

		if ($(".f_choice:checked").length > 0) {
			$(".f_choice").each(function () {
				var sub_cat = $(this).attr("data-cat");
				var sub_choice = $(this).attr("data-value");
				if ($(this).prop("checked")) {
					if (!ops_choice.includes(sub_choice)) {
						ops_choice.push(sub_choice);
						ops_checked++;
					}
					if (!ops_chocat[sub_cat].includes(sub_choice)) {
						ops_chocat[sub_cat].push(sub_choice);  
					}
				}
			});
		}

		var doc_box = jQuery("#docs_wrapper");
		var doc_view =
			doc_box.attr("data-view") != undefined ? doc_box.attr("data-view") : "";

		var de_call = el_call;
		var legoo = btoa(
			JSON.stringify({
				fc: de_call,
				fsec: sec_id,
				fops: ops_subs,
				ffoc: ops_chocat.focus_area,
				fpill: ops_chocat.pillar,
				fdfrom: ops_chocat.dtfrom,
				fdto: ops_chocat.dtto,
				fcom: el_com,
				fpage: fpage,
				fview: doc_view,
				fstext: box_searchtext,
			})
		);

		$.ajax({
			type: "post",
			url: "assets/includes/ajapp.php" + _tok_cc,
			cache: true,
			data: {fdt: legoo},
			dataType: "html",
			success: function (response) { 
				$("#docs_wrapper").html(response);
				aj_styling = false;
				doAjaxPageStyling();
				/* doImageDisplays(); doModalLinks(); fancyModals(); doHitsLog(); cwa_lightbox(); */
			},
			error: function (data) {console.log("error_data", data);},
		});
	});
}

function zul_contmain_disp(fpage, el_class) {
	/* alert(fpage + " :: "+ el_class); */
	jQuery(document).ready(function ($) {
		if (jQuery("#" + el_class).length) {
			/* // && !jQuery("#" + el_class).hasClass("loaded") */
			var doc_box =
				jQuery("#" + el_class);
			var box_dat = doc_box.data();
			var box_view =
				doc_box.attr("data-view") != undefined ? doc_box.attr("data-view") : "";
			var box_cat =
				doc_box.attr("data-cat") != undefined ? doc_box.attr("data-cat") : "";
			var box_tab =
				doc_box.attr("data-tab") != undefined ? doc_box.attr("data-tab") : "";
			var box_com =
				doc_box.attr("data-com") != undefined ? doc_box.attr("data-com") : "";
			var box_disp =
				doc_box.attr("data-disp") != undefined ? doc_box.attr("data-disp") : "";

			var day_from = jQuery("#filter_range_start").length
				? jQuery("#filter_range_start").val()
				: "";
			var day_to = jQuery("#filter_range_end").length
				? jQuery("#filter_range_end").val()
				: "";
			var box_searchtext = jQuery("#dt_searchtext").length
				? js_clean_title(jQuery("#dt_searchtext").val())
				: "";

			var ops_dat = box_dat != undefined ? JSON.stringify(box_dat) : "";

			var ops_choice = {};
			if ($(".dt_clg_filter option:selected").length > 0) {
				$(".dt_clg_filter").each(function () {
					var sel_id = $(this).attr("id");
					var sel_val = $("#" + sel_id + " option:selected").val();
					ops_choice[sel_id] = sel_val;
				});
			}
			var ops_cc = JSON.stringify(ops_choice);

			if (fpage === undefined || fpage === "") fpage = 1;
			if (box_tab === undefined) box_tab = "";

			var legoo = btoa(
				JSON.stringify({fc: el_class, fvops: ops_dat, fsec: box_cat, fcom: box_com, fdisp: box_disp, ftab: box_tab, fdfrom: day_from, fdto: day_to, fpage: fpage, fops: ops_cc, fview: box_view, fstext: box_searchtext, })
			);

			$.ajax({
				type: "post",
				url: "assets/includes/ajapp.php" + _tok_cc,
				cache: true,
				data: {fdt: legoo},
				dataType: "html",
				success: function (response) {
					$("#" + el_class)
						.html(response)
						.addClass("loaded");
					doImageDisplays();
					doModalLinks();
					fancyModals();
					doHitsLog();
					cwa_lightbox();
					doAccordion();
					if (jQuery(".f_date").length) {
						jQuery(document).on("change", ".f_date", function (e) {
							zul_contmain_disp("", el_class);
						});
					}
				},
				error: function (data) {console.log("error_data", data);},
			});
		}
	});
}

function zul_load_album(fpage, sec_search_text) {
	jQuery(document).ready(function ($) {
		if (fpage === undefined || fpage === "") fpage = 1;
		var el_search = false;
		var inst = 0;

		var album_wrapper = jQuery("#album_wrapper");
		var el_call = album_wrapper.attr("data-call");
		if (el_call === undefined) {
			el_call = "fc_album_fetch";
		}
		var box_com = album_wrapper.attr("data-item");
		if (box_com === undefined) {
			box_com = "";
		}
		var box_meta = album_wrapper.attr("data-meta");
		if (box_meta === undefined) {
			box_meta = "";
		}
		var sec_search = sec_search_text != "" ? sec_search_text : "";
		var legoo = btoa(
			JSON.stringify({
				fc: el_call,
				fcom: box_com,
				fpage: fpage,
				fmeta: box_meta,
				fq: sec_search,
			})
		);

		$.ajax({
			type: "post", url: "assets/includes/ajapp.php", cache: true, data: {fdt: legoo}, dataType: "html",
			success: function (response) {
				$("#album_wrapper").html(response); aj_styling = false; doAjaxPageStyling();
			},
			error: function (data) {console.log("error_data", data);},
		});
	});
}

/*// DYNAMIC LOADERS ACTUAL */
jQuery(document).ready(function ($) {

	/* // var active_sub = $(".main-menu li:has(li.active)");
	// if (active_sub.length) {
	//     active_sub.children(':first').addClass("active");
	// }
	// //$('ul.navination li:has(li.current)').children(':first').addClass("active"); */  
	// /*desktop-menu*/

	if ($('#gut_footer_icons').length) {
		offset_float_icons = $('#gut_footer_icons').offset().top; 
		/* // new Waypoint({ element: document.getElementById('sec_footer_icons'), offset: '50%', handler: function() { jQuery('#gut_footer_icons').addClass("loaded"); } }); */
	}

	var _daterange = $('input[name="daterange"]');
	if (_daterange.length) {
		_daterange.daterangepicker({opens: "left"}, function (start, end, label) {
			console.log("A new date selection was made: " + start.format("YYYY-MM-DD") + " to " + end.format("YYYY-MM-DD"));
		});
	}

	/* // Elements Animation */
	if ($(".wow").length) {
		var wow = new WOW({
			boxClass: "wow",
			animateClass: "animated",
			offset: 0,
			mobile: false,
			live: true,
		});
		wow.init();
	}

	$(window).resize(function () {
		/* googleTranslateElementInit(); */
		winwidth = jQuery(window).width();
		small_screen = (winwidth < winmobile) ? 1 : 0;
		if (small_screen && !jQuery("body").hasClass("mobile-view")) {
			get_menuMobile_v2();
		}
	});  
 

	/* ============= @@ accordion ======================== */ 

	if ($('.accordion-jx div.accordion-content').length) {  
        doAccordion(); 
    }
    if ($('.accordion-flat div.accordion-content').length) {  
        doAccordionLegacy(); 
    }

	/* ============= @@ inline-accordion ======================== */
	if ($(".main-guts blockquote").length) {
		/* $(".main-guts blockquote").each(function(i) { var acw = $(this); acw.addClass("accordion-subs"); var ach = acw.find("h5").addClass("accordion-header"); var acg = acw.find("p").addClass("accordion-content").hide(); ach.on("click", function() {  if(ach.hasClass("opened")) { acg.hide(); ach.removeClass("opened"); }  else { acg.show(200); ach.addClass("opened"); }  });  });  */
	}

	var pathanchor = window.location.href.split("#")[1];
	if (pathanchor !== undefined) {
		$('a[data-nav="' + pathanchor + '"]').addClass("active");
	}

	if ($('a[href^="#"]').length) {
		var pathname = window.location.href.split("#")[0];
		$('a[href^="#"]').each(function () {
			var $this = $(this);
			var alink = $this.attr("href");
			$this.attr("href", pathname + alink);
		});
	}

	
	if (jQuery("#fc_posts_main").length) {
		zul_contmain_disp("", "fc_posts_main");

		if (jQuery("#dt_searchtext_submit").length) {
			/* jQuery("#dt_searchtext").on('change', function(e) {  jQuery("#"+el_class).removeClass("loaded"); }); */
			jQuery("#dt_searchtext_submit").on("click", function (e) {
				zul_contmain_disp("", "fc_posts_main");
			});
		}
	}
	
	if (jQuery("#fc_tenders").length) {
		zul_contmain_disp("", "fc_tenders");

		if (jQuery("#dt_searchtext_submit").length) {
			/* jQuery("#dt_searchtext").on('change', function(e) {  jQuery("#"+el_class).removeClass("loaded"); }); */
			jQuery("#dt_searchtext_submit").on("click", function (e) {
				zul_contmain_disp("", "fc_tenders");
			});
		}
	}
	if ($(".wrap_menu_nav_cat").length) {
		zul_nav_sidecats_tabs("wrap_menu_nav_cat");
	}
	if ($(".wrap_cont_nav_cat").length) {
		zul_nav_sidecats_tabs("wrap_cont_nav_cat");
	}
	if ($(".wrap_res_nav_cat").length) {
		zul_nav_sidecats_tabs("wrap_res_nav_cat");
	}
	if ($(".wrap_gall_nav_cat").length) {
		zul_nav_sidecats_tabs("wrap_gall_nav_cat");
	}

	if ($("#album_wrapper").length) {
		zul_load_album("", "");
	}

	if (
		$(".fancyvid").length ||
		$(".fancypic").length ||
		$(".fancypop").length ||
		$(".fncy").length
	) {
		fancyModals();
	}

	/*//DATA TABLE*/
	zul_DataTable(); 

	/*//WYSIWYG*/
	if ($(".wysiwyg").length) { 
		if (typeof myFunction === "wysiwyg") {
			$(".wysiwyg").wysiwyg({
				autoGrow: true,
				maxHeight: 400,
				resizeOptions: {},
				controls: {html: {visible: true}},
			}); 
		}
	}

	/*//SITEMAP*/
	if ($(".sitemap").length) {
		loadcssfile("assets/scripts/sitemap/jquery.treeview.css");
		$.cachedScript("assets/scripts/sitemap/jquery.treeview.js").done(function ( script, textStatus ) {
			jQuery("#tree").treeview({ collapsed: false, animated: "medium", control: "#sidetreecontrol", persist: "location", });
		});
	}

	/* if ($("#popup_docs_carousel").length) {
		$.get('assets/includes/wrap_docs_carousel.php?crsf=' + Math.random()).done(function(data) {
			$("#popup_docs_carousel").html(data); 
			jQuery("#popup_docs_show").removeAttr("target").click(); 
		});
	} */

	if ($(".page-sidebar-menu").length) {
		var curtab = getUrlVars()["ptab"];
		if (curtab !== undefined) {
			var memberLink = $('a[data-id="' + curtab + '"]');
			memberLink.addClass("current");
			$(document).prop("title", memberLink.text() + " - " + sys_sitename);
		}
	}

	/* ============= @@ forms ======================== */

	if (jQuery.validator !== undefined) {
		jQuery.validator.addMethod( "notDefault", function (value, element) { return value != element.defaultValue; }, "Required" );
	}
	if ($("#searchform").length) { $("#searchform").validate({errorPlacement: function (error, element) { }}); }
	doFormsValidate();
	doFormsStyling(); 
	doFuncsBasic();

	doHitsLog();

	if (typeof con_meta_title != "undefined") {
		jQuery("#meta_title").prop("content", con_meta_title);
		jQuery(".meta_description").prop("content", con_meta_desc);
	}
 
});




function zul_DataTable_jx(tbId, dir, country) {
	jQuery(document).ready(function ($) {
		if ($("#" + tbId).length) {
			loadcssfile("assets/scripts/datatable/datatables-2.2.1.min.css");
			$.cachedScript("assets/scripts/datatable/datatables-2.2.1.min.js").done(
				function (script, textStatus) {
					var col_filter_link =
						jQuery("#" + tbId).length &&
							jQuery("#" + tbId).attr("data-col-link") !== undefined
							? jQuery("#" + tbId).attr("data-col-link")
							: "";
					var col_filter_tag =
						jQuery("#" + tbId).length &&
							jQuery("#" + tbId).attr("data-col-filter") !== undefined
							? jQuery("#" + tbId).attr("data-col-filter")
							: "";
					var col_filter =
						col_filter_tag !== "" ? col_filter_tag.split(",") : "";

					$.ajax({
						url: "assets/includes/addons/ajdat.php?ftd=c&fc=" + dir,
						//method : "post",
						acceptCharset: "",
						success: function (data) {
							data = JSON.parse(data);
							columnNames = Object.keys(data.data[0]);

							var colFooter = "<tfoot><tr>";
							for (var i in columnNames) {
								var headerBase = columnNames[i].toLowerCase();
								var headerClean = js_clean_title(columnNames[i]);
								tbl_columns.push({
									data: columnNames[i],
									title: headerClean,
								});
								var headerFilta = col_filter.includes(headerBase);
								var footaBase =
									headerFilta === true
										? '<input type="text" placeholder="Search ' +
										headerClean +
										'" />'
										: "&nbsp;";
								colFooter +=
									'<th data-id="' + headerBase + '">' + footaBase + "</th>";
							}
							colFooter += "</tr></tfoot>";
							$("#" + tbId).append(colFooter);

							var jxTable = $("#" + tbId).DataTable({
								processing: true,
								serverSide: true,
								bJQueryUI: true,
								bInfo: true,
								sPaginationType: "full_numbers",
								accept: "utf-8, iso-8859-1;q=0.5",
								contentType: "application/json",
								bStateSave: false,
								ajax: {
									url:
										"assets/includes/addons/ajdat.php?ftd=d&fc=" +
										dir +
										"&fctry=&fcrgn=",
									type: "get",
								},
								deferRender: true,
								columns: tbl_columns,
								initComplete: function (data) {
									var num_cols = this.api().columns().nodes().length;

									if (col_filter !== "") {
										this.api()
											.columns()
											.every(function (tb_col) {
												var column = this;
												var col_title = column
													.header()
													.innerText.toString()
													.toLowerCase();
												var col_key = column.footer().getAttribute("data-id");
												var col_id = col_filter.includes(col_key);

												if (col_id === true) {
													$("input", this.footer()).on(
														"keyup change clear",
														function () {
															if (column.search() !== this.value) {
																column.search(this.value).draw();
															}
														}
													);
												}
											});
									}
								},
								fnDrawCallback: function () {
									/*clickRowHandler(this);*/
								},
							});

							/* Click event handler */
							function clickRowHandler(gani) {
								$("#" + tbId + " tbody tr").bind("click", function (rr) {
									var rowId = $(this).attr("id");
								});
								$("#" + tbId + " tbody tr").bind("dblclick", function (rr) {
									var aData = gani.fnGetData(this);
									var iId = aData[col_filter_link];
									location.href = dt_link + iId;
								});
							}
						},
					});
				}
			);
		}
	});
}

function zul_DataTable() {
	jQuery(document).ready(function ($) {
		if ($("table").length && $("#dt_list_ajx").length == 0) {
			loadcssfile("assets/scripts/datatable/datatables-2.2.1.min.css");
			$.cachedScript("assets/scripts/datatable/datatables-2.2.1.min.js").done(
				function (script, textStatus) {
					$("table").each(function () {
						var tb_this = $(this);
						var tb_head = tb_this.children("thead").length;
						var tb_id = tb_this.attr("id");
						var tb_filter = tb_this.attr("data-col-filter");

						var col_filter =
							tb_filter !== undefined ? tb_filter.split(",") : "";

						if (!tb_this.hasClass("nodtt") && !tb_this.hasClass("no-dtt") && tb_id != "dt_list_ajx" && tb_head != 0) {
							var tb_dtable = tb_this.addClass("table display").dataTable({
								bProcessing: true,
								bJQueryUI: true,
								bInfo: true,
								sPaginationType: "full_numbers",
								bStateSave: true,
								aaSorting: [],
								responsive: true,
								iDisplayLength: 5,
								search: {return: true},
								/* "search": { return: true }, */ bSearchable: true,
								aLengthMenu: [
									[5, 10, 25, 50, 100, -1],
									[5, 10, 25, 50, 100, "All"],
								],
								responsive: true,
								initComplete: function () {
									var wd = window.innerWidth;
									if (wd < 599) {
										tb_this.addClass("dtr-inline collapsed nowrap");
									}
									var num_cols = this.api().columns().nodes().length;
									if (col_filter !== "") {
										this.api()
											.columns()
											.every(function (tb_col) {
												var column = this;
												var col_title = column
													.header()
													.innerText.toString()
													.toLowerCase();
												var col_id = col_filter.includes(col_title);

												if (col_id === true) {
													var select = $(
														'<select><option value=""></option></select>'
													)
														.appendTo($(column.footer()) /*.empty()*/)
														.on("change", function () {
															var val = $.fn.dataTable.util.escapeRegex(
																$(this).val()
															);
															column
																.search(val ? "^" + val + "$" : "", true, false)
																.draw();
														});

													column
														.data()
														.unique()
														.sort()
														.each(function (d, j) {
															select.append(
																'<option value="' + d + '">' + d + "</option>"
															);
														});
												}
											});
									}
								},
							});
							new $.fn.dataTable.Responsive(tb_dtable, {
								details: false,
							});
						}
					});
				}
			);
		}
	});
}

function fancyModals() {
	jQuery(document).ready(function ($) {
		link_pop_source = location.href;

		if ($(".fancyvid").length || $(".fancypic").length || $(".fancypop").length || $(".fncy").length) {
			var $thisImage;
			$(".fancypop").each(function () {
				$(this).click(function (event) {
					event.preventDefault(); $thisLink = $(this);
					var dlink = $thisLink.attr("href") !== undefined ? $thisLink.attr("href") : $thisLink.attr("data-href");
					var dtext = $thisLink.attr("title") !== undefined ? $thisLink.attr("title") : mains_title;
					var res = dlink.split("/"); scrtop_two = scrtop_one;

					$.ajax({
						url: "assets/includes/inc.ajx.cont.main.php?item=" + res[0] + "&item_l=" + res[1] + "&tk=" + Math.random() + "#ttop",
						type: "GET", beforeSend: function () {$("#content-col").html("Please wait...");},
						success: function (response) {
							$("#content-col").html(response); $(".guts_wrap").hide(); $(".main-navbar").hide();
							window.scrollTo(0, 0); doAjaxPageStyling();
						}
					});

					popClose = true;
					$("html").addClass("Reader-open Reader-postopen has-scrolled");
					$(document).prop("title", dtext);
					ChangeUrl("Page1", dlink);
					return false;
				});
			});

			$(".fancypic").each(function () {
				$(this).click(function () {
					$thisImage = $(this);
					//var psrc = $thisImage.attr('src');
					var psrc = $thisImage.attr("data-url") != undefined && $thisImage.attr("data-url") != "" ? $thisImage.attr("data-url") : $thisImage.attr("src");
					var pprops = $thisImage.attr("data-props") != undefined ? $thisImage.attr("data-props") : "";
					var pdesc = $thisImage.attr("title") != undefined ? $thisImage.attr("title") : $thisImage.attr("alt");
					var palt = "<div>" + pdesc + '</div><a data-dismiss="modal" class="close-modal txtblue txt90 bold" rel="modal:close">[ CLOSE ]</a>';
					$("#uni_basic").removeClass("fade").addClass("show " + pprops).show()
						.html('<div class="modal-dialog"><div class="modal-content text-center padd15"><img src="' + psrc + '" class="img-full" alt="">' + palt + " </div></div>")
						.modal();
					$(".blocker").show(); $("body").addClass('modal-open');
					$(".close-modal").on("click", function () {
						$("#uni_basic").hide().html("");
						$(".blocker").hide(); $(".modal-backdrop").removeClass("show").hide();
						$("body").removeClass('modal-open');
					});
				});
			});

			$(".fancyvid").each(function () {
				$(this).click(function () {
					$thisImage = $(this);
					var psrc = $thisImage.attr("data-url") !== undefined ? $thisImage.attr("data-url") : $thisImage.attr("data-href"); var pprops = $thisImage.attr("data-props") != undefined ? $thisImage.attr("data-props") : ""; var ptitle = $thisImage.attr("alt") != undefined ? $thisImage.attr("alt") : $thisImage.attr("title"); var palt = "<div>" + ptitle + "</div>";
					/* <a data-dismiss="modal" class="close-modal txtblue txt90 bold" rel="modal:close">[ CLOSE ]</a> */
					$("#uni_basic")
						.removeClass("fade").addClass("show " + pprops).show().html('<div class="modal-dialog modal-vid"><div class="modal-content"><div class="modal-headerX text-right px-3"><a data-dismiss="modal" class="close-modal" rel="modal:close">x</a></div><div class="modal-body text-center w-100 m-0 p-0"><iframe src="' + psrc + '?controls=0&modestbranding=1&autoplay=1" width="100%" style="min-height:60vh" frameborder="0" webkitallowfullscreen allowfullscreen id="modal_iframe"></iframe>' + palt + "</div></div></div>").modal();
					$('.blocker').show();
					/* // $('.close-modal').on('click', function() { $('#modal_iframe').attr('src', ''); $('.blocker').hide(); }); */
					$(".close-modal").on("click", function () {
						$("#uni_basic").removeClass("show " + pprops).hide().html("");
						$(".blocker").hide();
						$(".modal-backdrop").removeClass("show").hide();
					});
				});
			});

			$("#closebtn").click(function () {
				$(document).prop("title", mains_title);

				ChangeUrl("Home", link_pop_source);
				$("html").removeClass("Reader-open Reader-postopen has-scrolled");
				$("#content-col").html("");
				$(".main-navbar").show();
				$(".guts_wrap").show();
				window.scrollTo(0, scrtop_two);
			});
		}
	});
}

function func_scrollTo() {
	jQuery(document).ready(function ($) {
		if ($(".scroll-to-target").length) {
			$(".scroll-to-target").on("click", function () { 
				var target_ref = $(this).attr("data-target");
				var target_offset = "home" != target_ref ? $(target_ref).offset().top - 50 : $(target_ref).offset().top;
				$("html, body").animate({scrollTop: target_offset}, 100);
			});
		}
	});
}

function ChangeUrl(page, url) {
	if (typeof history.pushState !== "undefined") {
		var obj = {Page: page, Url: url};
		history.pushState(obj, obj.Page, obj.Url);
	} else {
		alert("Browser does not support HTML5.");
	}
}

function doSliders() {
	jQuery(document).ready(function ($) {
		/*-----------------------------------------------------------------------------------*/
		/*	NEW STYLO
		/*-----------------------------------------------------------------------------------*/

		if (jQuery(".widget_swiper").length) {
			jQuery(".widget_swiper").each(function () {
				var wid_box = jQuery(this);
				var box_id = wid_box.attr("id");
				var box_call = wid_box.attr("data-call");
				var box_cache = wid_box.attr("data-cache") != undefined && wid_box.attr("data-cache") == "true" ? true : false;
				var box_wrap = wid_box.attr("data-wrap") != undefined ? wid_box.attr("data-wrap") : "";
				var box_value = wid_box.attr("data-value") != undefined ? wid_box.attr("data-value") : "";
				var box_com = wid_box.attr("data-com") != undefined ? wid_box.attr("data-com") : "";
				var legoo = btoa(JSON.stringify({fc: box_call, fv: box_value, fcom: box_com, fname: box_wrap, }));

				$.ajax({
					type: "post", url: "assets/includes/ajapp.php", cache: box_cache, data: {fdt: legoo}, dataType: "html",
					success: function (response) {
						$("#" + box_id).html(response).show();
						/* // setTimeout(() => { $("#" + box_id).show(); }, 200); */
						AOS.init({easing: 'ease-out-back', duration: 1200});
						if ($(".fancyvid").length || $(".fancypic").length) {fancyModals();}
						if ($(".cwa-lightbox-image").length) {cwa_lightbox();}

					},
					error: function (data) {console.log("error_data", data);},
				});
			});
		} 
		 
 

		if ($(".video").length) {
			$(".video").click(function () {
				var theModal = $(this).data("target"),
					videoSRC = $(this).attr("data-video"),
					videoSRCauto =
						videoSRC +
						"?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
				$(theModal + " iframe").attr("src", videoSRCauto);
				$(theModal + " button.close").click(function () {
					$(theModal + " iframe").attr("src", videoSRC);
				});
			});
		}
 

		if (jQuery(".feature_popups").length) {
			jQuery(".feature_popups").each(function () {
				var wid_box = jQuery(this);
				/* var box_id      = wid_box.attr("id"); */
				var box_id = wid_box.attr("data-id");
				// if(!$("#" + box_id).hasClass('loaded')) {
				var box_call = wid_box.attr("data-call");
				var box_props = wid_box.data();
				var box_cache = false;
				var box_init = (wid_box.attr("data-click") != undefined) ? wid_box.attr("data-click") : '';

				var ops_props = JSON.stringify(box_props);
				var ops_post = btoa(JSON.stringify({fc: box_call, fprops: ops_props}));

				$.ajax({
					type: 'post', url: 'assets/includes/ajapp.php?_j=' + Math.random(), cache: box_cache,
					data: {fdt: ops_post}, headers: {"Cache-Control": "no-cache, no-store, must-revalidate", "Pragma": "no-cache", "Expires": "0"}, dataType: 'html',
					success: function (response) {
						$("#" + box_id).html(response);
						/* $("#uni_basic").html(response); */
						$("#" + box_id).addClass('loaded');
						$("body").addClass('modal-open');
						if (box_init !== '') {jQuery("#" + box_init).click(); $(".jquery-modal.blocker").show(); doModalLinks();}
						$(".close-modal").on("click", function () {
							$("#" + box_id).hide().html("");
							$(".blocker").hide(); $(".modal-backdrop").hide(); $("body").removeClass('modal-open');
						});
					}, error: function (data) {console.log("error_data", data);}
				});
				// }
			});

		}

		if ($("#popup_docs_carousel").length) {
			$.get(
				"assets/includes/wrap_docs_carousel.php?crsf=" + Math.random()
			).done(function (data) {
				$("#popup_docs_carousel").html(data);
				jQuery("#popup_docs_show").removeAttr("target").click();
			});
		}
	});
}


function doFuncsBasic() {
	AOS.init({easing: 'ease-out-back', duration: 1200});

	jQuery(document).ready(function ($) {
		/*//GENERAL*/
		$('a[href^="mailto:"], a[href^="tel:"],a[href*="lib.php"],a[href^="http"]:not([href^="' + my_domain + '"])').attr({target: "_blank"});

		if ($(".close-notify").length) {
			$(".close-notify a").click(function () {$("#box_alert").hide();});
		}

		if ($("div.main-guts address").length) {
			$("div.main-guts address").append('<span class="q_c">&nbsp;</span>').wrap($("<div class='q_w'><div class='q_o'><em>"));
		}

		/* @@ equal height */
		if ($("div.eq-headerx").length) {boxEqualHeight("eq-header");}
		if ($("div.widget-card").length) {boxEqualHeight("widget-card");}
		if ($("div.equalized").length) {boxEqualHeight("equalized");}
		if ($("div.equalizedb").length) {boxEqualHeight("equalizedb");}
		if ($("div.pager").length) {
			var pagerWidth = $(this).width(); if (pagerWidth > 767) {$(".pager").each(function () {pagerSetup(this);});}
		}
	});
}

function doFormsValidate() {
	jQuery(document).ready(function ($) {
		if ($(".rwdvalid").length) {
			/* Multiselect - require one*/
			$.validator.addMethod("needsSelection", function (value, element) {var count = $(element).find("option:selected").length; return count > 0;});

			/* Multicheckbox - require one*/
			$.validator.addMethod("require-one", function (value, element) {return $(".require-one:checked").size() > 0;});

			/* WYSIWYG - required */
			$.validator.addMethod("wysi_required", function (value, element) {return $(".wysi-required").val() !== "";});

			$(".rwdvalid").validate(); /*{errorContainer: ".errorBox" , errorPlacement: function(error, element) { } }*/
		}
	});
}


function doFormsStyling() {
	jQuery(document).ready(function ($) {
		/* @@ FORM LOCK EDITING */
		if ($(".frmnoborder :input").length) {
			$(".frmnoborder :input").not(".btn").css({"border-width": "0px 0px 1px", background: "none"});
			$(".frmnoborder :input").not(".btn").each(function (index) {
				$(this).on("focusin", function () {
					$(this).css({background: "#fafafa"});
				});
				$(this).on("focusout", function () {
					$(this).css({background: "none"});
				});
			});
		}

		if ($(".frmNoEdit").length) {
			$(".frmNoEdit :input").prop("disabled", true).css({border: "1px solid #ddd", background: "none"}).removeClass("wysiwyg").removeClass("tags-field");
			$(".frmNoEdit").prop("action", "#");
			$(".frmNoEdit").find(":submit, .hideable").css("display", "none");
		}

		/*//MASKED INPUTS*/
		if ($('input[class*="mask_"]').length) {
			$.cachedScript("assets/scripts/validate/jquery.inputmask.js").done(
				function (script, textStatus) {
					if ($(".mask_date").length) { $(".mask_date").inputmask("mm/dd/yyyy"); }
					if ($(".mask_time").length) { $(".mask_time").inputmask("h:s t"); }
					if ($(".mask_phone").length) { $(".mask_phone").inputmask("+999 999 999999"); }
				}
			);
		}

		/*//FORM-FOCUS*/
		if ($(".floating").length > 0) {
			$(".floating").on("focus blur", function (e) {
				$(this).parents(".form-focus").toggleClass("focused",e.type === "focus" || this.value.length > 0 || this.type == "date");
			}).trigger("blur");
		} 

	});
}

function doAjaxPageStyling() {
	/* alert(aj_styling);*/
	if (aj_styling === false) {
		doImageDisplays(); doModalLinks(); 
		if (jQuery(".equalized").length) { boxEqualHeight("equalized"); } 
		kbModalLoaded(); fancyModals(); doAccordion(); doTruncator(); doHitsLog(); cwa_lightbox(); doFormsStyling();
		/*doTreeview(); */
		aj_styling = true;
	}
}

function doTruncator() {
	jQuery(document).ready(function ($) {
		if ($('[class^="trunc"]').length) { 
			if ($(".trunc-xs").length) {
				$(".trunc-xs").show().truncate({max_length: 150});
			}
			if ($(".trunc-sm").length) {
				$(".trunc-sm").show().truncate({max_length: 200});
			}
			if ($(".trunc-md").length && !$(".trunc-md").hasClass("truncated")) {
				$(".trunc-md").addClass("truncated").show().truncate({max_length: 500});
			}
			if ($(".trunc-lg").length) {
				$(".trunc-lg").show().truncate({max_length: 1200});
			}
			if ($(".trunc-xl").length) {
				$(".trunc-xl").show().truncate({max_length: 2200});
			}
		}
	});
}

function kbModalLoaded() {
	jQuery(document).ready(function ($) {
		if ($(".modal-body").length) {
			var _self = $(".modal-body");
			if (_self.outerHeight() > 400) {
				_self.addClass("modal-scroll");
			}
		}
		if ($(".modal-body .rwdvalid").length) {
			$(".modal-body .rwdvalid").validate({
				errorPlacement: function (error, element) { },
			});
		}
		if ($(".modal-long").length) {
			$(window)
				.resize(function () {
					var mod_long_height =
						$(window).height() > 500 ? "auto" : $(window).height() - 200;
					$(".modal-long").css({height: mod_long_height});
					$(".modal.current").css({top: "40%"});
				})
				.resize();
		}

		if ($("#modal_iframe").length) {
			$(".close-modal").on("click", function () {
				$("#modal_iframe").attr("src", ""); $('#uni_basic').hide().html(''); $('.blocker').hide(); $(".modal-backdrop").removeClass("show").hide(); $("body").removeClass('modal-open');
			});
		}

		doModalLinks();
	});
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split("=");
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
} 

function doStatsCounter() {
	jQuery(document).ready(function ($) {
		if ($(".count-box").length) {
			$(".count-box").appear(
				function () {
					var $t = $(this),
						n = $t.find(".count-text").attr("data-stop"),
						r = parseInt($t.find(".count-text").attr("data-speed"), 10);
					if (!$t.hasClass("counted")) {
						$t.addClass("counted");
						$({countNum: $t.find(".count-text").text()}).animate(
							{countNum: n},
							{
								duration: r,
								easing: "linear",
								step: function () {
									$t.find(".count-text").text(Math.floor(this.countNum));
								},
								complete: function () {
									$t.find(".count-text").text(this.countNum);
								},
							}
						);
					}
				},
				{accY: 0}
			);
		}
	});
}

function get_gutLoader_elem(sec_id) {
	jQuery(document).ready(function ($) {
		if (!jQuery("#" + sec_id).hasClass("loaded")) {
			jQuery("#" + sec_id).addClass("loaded");
			var sec_attrs = JSON.stringify(jQuery("#" + sec_id).data());
			var tab_params = btoa(JSON.stringify({fc: sec_id, fops: sec_attrs}));
			$.ajax({
				type: "post",
				url: "assets/includes/ajapp.php",
				cache: true,
				data: {fdt: tab_params},
				dataType: "html",
				success: function (response) {
					jQuery("#" + sec_id).html(response);
					if (sec_id == "widget_logos_slick") {doSliders();}
					doImageDisplays();
				},
				error: function (data) {
					jQuery("#" + sec_id).html("");
				},
			});
		}
	});
}

function get_gutLoader_base() {
	jQuery(document).ready(function ($) {
		if (jQuery(".gutLoader").length) {
			jQuery(".gutLoader").each(function (d, j) {
				var sec_id = jQuery(this).attr("id");
				if (sec_id != undefined) {
					var sec_attrs = JSON.stringify(jQuery(this).data());
					var tab_params = btoa(
						JSON.stringify({fc: sec_id, fops: sec_attrs})
					);
					$.ajax({
						type: "post",
						url: "assets/includes/ajapp.php",
						cache: true,
						data: {fdt: tab_params},
						dataType: "html",
						success: function (response) { 
							jQuery("#" + sec_id).html(response);
							// doAjaxPageStyling();
							// if ($(".accordion-box div.accordion-content").length) {doAccordion();}
							// doImageDisplays();
							aj_styling = false; doAjaxPageStyling();
							// doHitsLog();
						},
						error: function (data) {
							jQuery("#" + sec_id).html("");
						},
					});
				}
			});
		}
	});
}

var el_widget_products_slick = 0;
var el_widget_news_slick = 0;

function onVisible(element_id, callback) {
	if (jQuery("#" + element_id).length) {
		var element = document.querySelector("#" + element_id);
		new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				/* // console.log('intersectionRatio', entry.intersectionRatio); */
				if (entry.intersectionRatio == 1) {

					if (element_id == "sec_footer_icons" && jQuery("#gut_footer_icons").hasClass("loaded")) {
						 
						jQuery("#gut_footer_icons").removeClass("loaded");
						offset_float_icons = jQuery('#sec_footer_icons').offset().top;
						
						/* if( (offset_float_icons_check-1000) < offset_float_icons  && !jQuery("#gut_footer_icons").hasClass("loaded")){
							jQuery("#gut_footer_icons").addClass("loaded");
						}  */
					}
					else if (!jQuery("#" + element_id).hasClass("loaded")) {
						/* element_id != "sec_footer_icons" &&  */
						if (element_id == "widget_products_slick" && el_widget_products_slick === 0) {
							el_widget_products_slick = 1; setTimeout(() => {callback(element_id);}, 800);
						}
						if (element_id == "widget_news_slick" && el_widget_news_slick === 0) {
							el_widget_news_slick = 1; setTimeout(() => {callback(element_id);}, 1000);
						}
						/* // setTimeout(() => { get_gutLoader_elem(element_id); }, 500);
						// setTimeout(() => { callback(element_id); }, 500); */
					}
					observer.disconnect();
				}
			});
		}).observe(element);
	}
}


function scrollFunction() {
	yOffset = jQuery(window).scrollTop();
	onVisible("sec_footer_icons", '');
	if (yOffset < (0.75 * offset_float_icons) && !jQuery("#gut_footer_icons").hasClass("loaded")) {
		jQuery("#gut_footer_icons").addClass("loaded");
	}
	/* // console.log('yOffset', yOffset); 
	// console.log('scroll_float_icons', offset_float_icons);  */
	onVisible("widget_products_slick", get_gutLoader_elem);
	onVisible("widget_news_slick", get_gutLoader_elem);
	var wd = jQuery(window).innerWidth(); var sz_tiny = (wd > 767) ? "65px" : "72px"; var scroll = jQuery(window).scrollTop(); func_call += 1
}

function navEventsPosition() {
	jQuery(document).ready(function ($) {
		var halfwin = jQuery(window).width() / 2;
		$(".navigation > li.dropdown").each(function () {
			var offset = $(this).offset();
			if (offset.left > halfwin) {
				jQuery(this).addClass("navbar-right");
			}
		});
	});
}

function responsiveSearch() {
	jQuery(document).ready(function ($) {
		/*Search Popup*/
		if ($("#search-popup").length) {
			/*Show Popup*/
			$(".btn_func_search").on("click", function () {
				$("#search-popup").addClass("popup-visible");
				$("#searchtext_pop").trigger("focus");
				$("#searchtext_pop").focus();
			});
			$(document).keydown(function (e) {
				if (e.keyCode == 27) {
					$("#search-popup").removeClass("popup-visible");
				}
			});
			/*Hide Popup*/
			$(".close-search,.search-popup .overlay-layer").on("click", function () {
				$("#search-popup").removeClass("popup-visible");
			});
		}
	});
}

function responsiveContent(field_id, menu_data) {
	jQuery(document).ready(function ($) {
		
		winwidth = $(window).width();
		var menu_opt = winwidth >= winmobile ? "main" : "canvas";

		$("#" + field_id + " li, #" + field_id + " a").removeClass("active");

		var malink = jQuery('a.linkMenu[data-id="' + menu_id + '"]');
		if (malink.length > 0) {
			malink.addClass("active");
			$("#" + field_id + " li:has(a.active)").children(":first").addClass("active");
			$("#" + field_id + " ul li:has(a.active)").children(":first").addClass("active");
			$("#" + field_id + " ul li ul li:has(a.active)").children(":first").addClass("active");
		}
		responsiveSearch();
	});
}

function get_menuHeader(field_id) {
	jQuery(document).ready(function ($) {
		if (
			$("#" + field_id).length &&
			!jQuery("#" + field_id).hasClass("loaded")
		) {
			jQuery("#" + field_id).addClass("loaded");
			var sel_call = $("#" + field_id).attr("data-call");
			var sel_active = $("#" + field_id).attr("data-active"); 
			var sel_cat = $("#" + field_id).attr("data-cat");
			var sel_sec = $("#" + field_id).attr("data-sec");

			if (sel_call == undefined) {sel_call = "menu_header";}
			if (sel_active == undefined) {sel_active = menu_id;}
			if (sel_cat == undefined) {sel_cat = "nav_top";}
			if (sel_sec == undefined) {sel_sec = "1";}

			$.ajax({
				type: "post",
				url: "assets/includes/ajapp.php",
				cache: true,
				data: {fc: sel_call, fcurr: sel_active, fsec: sel_sec, fcat: sel_cat, lang_code: "en", },
				dataType: "html",
				success: function (data) {
					var btn_search = (field_id == "menu_main") ? '<li class="button-search"><a id="slide-search" class="btn_func_search" title="Search"><i class="fa fa-search fs-18 d-md-inline d-sm-none"></i> <span class="d-md-none d-sm-inline">Search</span></a></li>' : "";
					
					/* // <li><div id="google_translate_element"></div> </li> */
					/* <li>  <a href="tel:+254-xxx" class="fw-bolder mx-1" style="padding: 5px 10px !important; margin-top: -5px;color:#fff !important;"><i class="fa fa-phone"></i> +254-xxxx</a> </li> */
					/* var btn_search = ''; */
					jQuery("#" + field_id).prepend(data + btn_search);
					 
					if (field_id == "menu_main" && winwidth >= winmobile) {
						doMegaMenu_v1();
					}
					if (jQuery("#" + field_id + " li.dropdown ul").length) {
						jQuery("#" + field_id + " li.dropdown").append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
					}
					responsiveContent(field_id, data);
					navEventsPosition();
					doModalLinks();
					doFuncsBasic();
					if (winwidth < winmobile) {
						get_menuMobile_v2();
					}
				},
				error: function () {console.log("failed to load #" + sec_id);},
			});
		}
	});
}

function doRedirect(r_ref, r_call = "") {
	if (r_ref != "") {
		location.href = r_ref;
	}
}

/* jQuery(window).on("scroll", function () {
	doHeaderStyle();
}); */


function get_menuMobile_v2() {
	jQuery(document).ready(function ($) {
		
		if ($(".mobile-menu").length) {
			
			if (($(".desktop-menu li.dropdown ul").length || $(".desktop-menu li.dropdown div.dropdown-menu").length)) {
				$("li.dropdown ul").removeClass("dropdown-menu");
				$("li.dropdown div").removeClass("dropdown-menu");
			}

			var mobileMenuHeader = $("#menu_main_right").length ? $("#menu_main_right").html() : "";
			mobileMenuHeader += $("#menu_head").length ? $("#menu_head").html() : "";
			var mobileMenuContent = $("#menu_main").html();
			$(".mobile-menu #menu_mobile").html("").append(mobileMenuContent).addClass("desktop-menu navigation mt-0 mx-auto loaded");
			$(".mobile-menu #menu_mobile").append(mobileMenuHeader);

			$(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
				$(this).toggleClass("open");
				$(this).prev("ul").slideToggle(500);
				if ($(this).prev("div") != undefined) {
					$(this).prev("div").toggleClass("open");
				}
			});

			$(".mobile-nav-toggler").on("click", function () {
				$("body").addClass("mobile-menu-visible");
			});
			$(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on("click", function(){
					$("body").removeClass("mobile-menu-visible");
				}
			);

			$("body").addClass("mobile-view");
		}
	});
}

function dateinsec() {
	dateInMillisecs = Date.now();
	return Math.round(dateInMillisecs / 1000);
}




function doMegaMenu_v1() {
	jQuery(document).ready(function ($) {
		if ($('.nav-mega-menu').length) {
			var $dcMegaMenuObj = $('#menu_main');
			$('> li', $dcMegaMenuObj).each(function () { 

				var mainSub = $('> ul', this);
				var mainSubIcons = $('> div.nav-icons', this);
				var mainSubSub = $('> ul ul', this);
				var primaryLink = $('> a', this);

				$(primaryLink).addClass('_flyout_main');

				if ($(mainSub).length > 0 || mainSubIcons.length > 0) {
					$(primaryLink).addClass('_flyout_link');
				}

				if ($(mainSubSub).length > 0) { /*  */
					var _fly_subs = '_' + $(mainSubSub).length + '_cols';
					$(mainSubSub).removeClass('dropdown-menu');
					$(mainSub).removeClass('dropdown-menu').addClass('mega-wrap-columns').wrap('<div class="dropdown-menu mega-wrap ' + _fly_subs + '" />').wrap('<div class="container-lg" style="position:relative;display:block;min-height:300px;xwidth:100%;"><div class="container -lg">');

					$(mainSubSub).each(function () {
						var mainSubSubLi = $('> li', this);						 
						if ($(mainSubSubLi).length > 7) {$(this).addClass('flex-ul');}
					});

					$('> li > a', mainSub).addClass('mega-hdr-a');
				}
			});

			if ($("a._flyout_link").length > 0) {
				$("a._flyout_link").each(function () { 

					$(this).on("click", function (e) {
						var _cms_id = $(this).data("id");
						e.preventDefault();

						$("li._has_focus_6lau5_1").removeClass("_has_focus_6lau5_1");
						$("a._flyout_link[data-id!=" + _cms_id + "]").removeClass("_has_focus");

						if (!$(this).hasClass("_has_focus")) {
							$(this).addClass("_has_focus");
							$(this).parent("li.dropdown").addClass("_has_focus_6lau5_1"); 
							$(this).parent("li.dropdown > .dropdown-menu").addClass("open").show();
						} else {
							$(this).removeClass("_has_focus");
							$(this).parent("li.dropdown").removeClass("_has_focus_6lau5_1"); 
						}
					});
					 
				});

				$(".close_flyout").each(function () {
					$(this).on("click", function (e) {
						$(this).parents("li._has_focus_6lau5_1").removeClass("_has_focus_6lau5_1");
					});
				});
			}
		}
	});
}

 

function doPageTabs() {
	jQuery(document).ready(function ($) {
		if ($('#dept_nav').length) { 
			var token = Math.random();
			var hash = window.location.hash.substr(1);
			if (hash === '') {hash = $('#dept_nav li a:first').attr('data-slug');}

			var href = $('#dept_nav li a').each(function(){		
				var tabC 	= jQuery(this);
				var tabId 	= tabC.attr('data-slug'); 
				var tabUri 	= tabC.attr('data-href');
				var sec_id 	= tabC.attr("data-sec");
				if (hash === tabId && sec_id != undefined) {
					var sec_attrs = JSON.stringify(jQuery(this).data());
					var tab_params = btoa(JSON.stringify({fc: sec_id, fops: sec_attrs}));
					
					/* $(document).prop('title', tabTxt); ChangeUrl('Page1', tabUri); */
					tabC.addClass("active");
					tabLoad(tab_params);   
				} 										
			});


			
			jQuery(".fc_themetab").on("click", function (e) {
				e.preventDefault();
							
				jQuery(".fc_themetab").removeClass("active");
				var tabC 	= jQuery(this);
				var tabTxt 	= tabC.text();
				var tabId 	= tabC.attr("data-slug");
				var tabUri 	= tabC.attr('data-href'); 
				window.location.hash = tabId;
				/* ================================== */
				var sec_id = jQuery(this).attr("data-sec");
				if (sec_id != undefined) {
					var sec_attrs = JSON.stringify(jQuery(this).data());
					var tab_params = btoa(JSON.stringify({fc: sec_id, fops: sec_attrs}));
					
					/* $(document).prop('title', tabTxt); ChangeUrl('Page1', tabUri); */
					tabC.addClass("active");
					tabLoad(tab_params);   
				}
				/* ================================== */
				
				return false;
			});


			function tabLoad(tab_params) {
				jQuery(".pgtabsloader").show();

				$.ajax({
					type: "post",
					url: "assets/includes/ajapp.php",
					cache: true,
					data: {fdt: tab_params},
					dataType: "html",
					beforeSend: function () {jQuery(".pgtabsloader").html('<div class="text-center p-4">Please wait...</div>').show(); jQuery(".pgtabscontent").html('');},
					success: function (response) {
						
						jQuery(".pgtabscontent").html(response);
						if ($(".accordion-box div.accordion-content").length) {
							aj_accordion = false; doAccordion();
						}
						doTruncator();
						doImageDisplays();
						$('a[href^="mailto:"], a[href^="tel:"], a[href*="lib.php"], a[href^="http"]:not([href^="' + my_domain + '"])').attr({target: "_blank"});
						 
						doHitsLog(); 
						setTimeout(() => { jQuery(".pgtabsloader").hide(); }, 500);
						
					},
					error: function (data) {
						jQuery(".pgtabscontent").html("");
					},
				});
				
			}


		}
	});
}


jQuery(window).on("load", function ($) {
	winwidth = jQuery(window).width();
	winheight = jQuery(window).innerHeight(); 

	small_screen = (winwidth < winmobile) ? 1 : 0;
	if (small_screen) {jQuery("body").addClass("cls-sticky");}
	if (jQuery("#menu_head").length) {get_menuHeader("menu_head");}
	if (jQuery("#menu_main").length) {get_menuHeader("menu_main");}
	/* doHeaderStyle(); */
		
	if (small_screen && !jQuery("body").hasClass("mobile-view")) {get_menuMobile_v2();}
	
	doStatsCounter(); doModalLinks(); doTruncator(); cwa_lightbox(); doPageTabs();

	if (jQuery(".gutLoader").length) {get_gutLoader_base();}

	window.onscroll = function () {scrollFunction()}; 

	if (jQuery("#dt_list_ajx").length && fc_dir != undefined) {zul_DataTable_jx("dt_list_ajx", fc_dir, "");}

	if (jQuery(".widget_swiper").length || jQuery("#wrap_banner_swiper").length || jQuery("#popup_docs_carousel").length) {
		setTimeout(() => {doSliders();}, 1000);
	}

	doImageDisplays();
	func_scrollTo();
});
