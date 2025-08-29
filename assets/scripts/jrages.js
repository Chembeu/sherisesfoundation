function useCustomValidity({ target }) {
    target.setCustomValidity(target.getAttribute("custom-validity"));
}
function clearCustomValidity({ target }) {
    target.setCustomValidity("");
}

document.querySelectorAll("input[custom-validity]").forEach((input) => {
    input.addEventListener("invalid", useCustomValidity);
    input.addEventListener("change", clearCustomValidity);
});

function js_num_format(val) {
	var res = val.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
	return res;
}	
	
function js_alpha_only(str) {
	var res = str.trim();
	if (str.match(/[a-z]/i)) {
		res = str.replace(/[^a-z .\/]+/ig, "");
		res = str.replace(/[\/]+/ig, ", ");
	}
	return res.trim();
}	

function js_alpha_seo(str) {
	var res = str.trim();
	if (str.match(/[a-z]/i)) {
		res = str.replace(/[^a-z]+/ig, "");
	}
	return res.trim();
}

function js_clean_title(str) {
	var res = str.trim();
	res = str.replace(/[^a-z0-9 .-\/]+/ig, " "); 	
	return res.toUpperCase().trim();
}

function js_strip_tags(html){
   let doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

function my_split( val ) {
	return val.split( /,\s*/ );
}
function extractLast( term ) {
	return my_split( term ).pop();
}	

function urlTitle(text, sub = "-") {       
    text = text.replace(/[^a-zA-Z0-9]/g,sub).replace(/[-]+/g,sub).replace(/[_]+/g,sub).toLowerCase();
    return text;
}
    
function wordInString(s, words, replacement){ 
    var re = new RegExp( '\\b' + words.join('|') + '\\b','gi');
    return s.replace(re, replacement);
}    
	
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}    
 

function sentenceCase(str) {
	return str.toLowerCase().replace(/[a-z]/i, function (letter) {
		return letter.toUpperCase();
	}).trim();
}
 
function titleCase(str) { 
	// var sstr = urlTitle(str, " ");
	var sstr = str.replace(/[_]+/g, " ");	//.replace(/\w\S*/g, "")
	// return sstr.charAt(0).toUpperCase() + sstr.substr(1).toLowerCase();
	return sstr.replace(
		/\w\S*/g,
		function(txt) {
		  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	  );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLanguage() {
	return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
} 

function getCookies(name = '') {
    let cookies = document.cookie; let cookiestore = {}; cookies = cookies.split(";");    
    if (cookies[0] == "" && cookies[0][0] == undefined) {return undefined;}    
    cookies.forEach(function(cookie) { cookie = cookie.split(/=(.+)/); if (cookie[0].substr(0, 1) == ' ') { cookie[0] = cookie[0].substr(1); } cookiestore[cookie[0]] = cookie[1]; }); 
    return (name !== '' ? cookiestore[name] : cookiestore);
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) { var date = new Date(); date.setTime(date.getTime() + (days*24*60*60*1000)); expires = "; expires=" + date.toUTCString(); }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
/*gr_alert('Title', '<img src="~" alt="~">', '{message}','{style}');  */
function gr_alert(title, thumb, text, type, is_sticky) {  
	if(is_sticky === undefined) { is_sticky = false; }
	jQuery.jGrowl.defaults.closer = false;
	/*//Stop jGrowl //$.jGrowl.defaults.sticky = true;*/
	var tpl = thumb + '<p>'+text+'</p>';
	jQuery.jGrowl(tpl, {sticky: is_sticky,life: 8000,header: title,speed: 'slow',theme: type});
}
	


function zul_FileValidate()
{  						
	jQuery(document).ready(function($) {	

		if ($('.fileValidate').length) {
			$('.fileValidate').each(function(){	
				var fld_id = $(this).attr("id");	
				$("#"+fld_id).on("change", function() { 
					//zul_FileValidate(fld_id);

					const fi = document.getElementById(fld_id);
					const fi_max = jQuery("#"+fld_id).attr("data-size"); 
					if(fi_max == undefined) {fi_max = '4096'; }
					const fi_cap = jQuery("#"+fld_id).attr("data-caption"); 
					
					if (fi.files.length > 0) {
						const i = 0;
						const fname = fi.files.item(i).name;
						const fsize = fi.files.item(i).size;
						const file = Math.round(parseFloat(fsize) / 1024);
						const file_mb = Math.round(file / 1024);
						const item_max = parseFloat(fi_max) ;

						if (file > item_max) {
							alert('('+ file_mb +'MB). Please select upload of less than '+ (item_max / 1024) +'MB');
							fi.value = '';
							jQuery("#" + fld_id).addClass("error");
							if(fi_cap != undefined && $("#"+fi_cap).length) {
								jQuery("#"+fi_cap).val("");
							}
						}
						else
						{
							if(fi_cap != undefined && $("#"+fi_cap).length) {
								jQuery("#"+fi_cap).val(fname);
							}
						}
					}
				});	

			});
		}
	}); 
}



var modal_call = '';

function doModalLinks() {
    jQuery(document).ready(function($) {
		/* console.log("modals", $('a[rel^="modal:open"]').length); */
        if ($('a[rel^="modal:open"]').length) {
            $('a[rel^="modal:open"]').each(function() {
                $(this).on("click", function(e) { 
                    e.preventDefault();
                    var t = $(this);
                    var t_ref = (t.attr("data-href")!== undefined)?t.attr("data-href") : t.attr("data-url");
					if(modal_call != t_ref){
						modal_call = t_ref;
						var t_props = (t.attr("data-props") != undefined) ? t.attr("data-props") : ''; 
						uni_modal("", t_ref, t_props, "uni_basic");
					}
                });
            });
        }
    });
}



window.start_load = function() {
    //$('body').prepend('<div id="preloader2"></div>');
}
window.end_load = function() {
    //$('#preloader2').fadeOut('fast', function() { $(this).remove(); });
}

window.uni_modal = function($title = '', $url = '', $size = '', $mod_id = 'uni_basic') {
    jQuery(document).ready(function($) {
        start_load();
        jQuery.ajax({
			type: 'post', url: $url, error: err => { console.log(); alert("An error occured"); },
            success: function(resp) {
                if (resp) {  
                    if ($mod_id === 'uni_modal') {
                        $('#uni_modal .modal-title').html($title)
                        $('#uni_modal .modal-body').html(resp)
                        if ($size != '') { $('#uni_modal .modal-dialog').addClass($size) } 
						else { $('#uni_modal .modal-dialog').removeAttr("class").addClass("modal-dialog modal-md") }
                        $('#uni_modal').modal({ show: true, backdrop: 'static', keyboard: false, focus: true });
                        end_load();

                    } else {                       
                        if ($size != '') { $('#uni_basic, .modal').addClass($size); }
                        $('#uni_basic').removeClass("fade").addClass("show").show().html(resp).modal({
                            show: true, backdrop: 'static', keyboard: true, focus: true
                        });	  
                        $('.blocker').show();
						$("body").addClass('modal-open'); 
                        $('.close-modal').on('click', function() { $('#uni_basic').hide().html(''); $('.blocker').hide(); $("body").removeClass('modal-open'); }); 
                    }
                }

                doModalLinks();
            }
        });
    });
}



function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function checkSess() { 
	jQuery(document).ready(function ($) {	
		var user_sess = getCookie("pwdj_acc");  /* alert(user_sess); */
		if(user_sess === null && apage_pv !== "1"){ location.href="index.php?qst=199"; }
	});
}