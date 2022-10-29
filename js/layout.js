function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	if (location.search == '') {
		results = regex.exec(location.hash);
	}
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); //정규식 치환
}

$(document).ready(function () {
	// pc check
	var isPC = $(window).width() > 1024;

	var $sitemap_btn = $('.header-btn .sitemap'),
		$sitemap_depth2Btn = $('.sitemap-wrap .depth2 > li > a'),
		$sitemap_depth3Btn = $('.sitemap-wrap .depth3 > li > a'),
		$searchBtn = $('.header-btn .search');

	$sitemap_depth2Btn.on('mouseover focus', function () {
		$sitemap_depth2Btn.removeClass('active');
		$(this).addClass('active');
		//$('body').addClass('sitemap-open');
	});

	$sitemap_depth2Btn.on('mouseleave blur', function () {
		$sitemap_depth2Btn.removeClass('active');
		//$('body').removeClass('sitemap-open');
	});

	$sitemap_depth3Btn.on('mouseover focus', function () {
		$(this).closest('.depth3').siblings('a').addClass('active');
	});
	$sitemap_depth3Btn.on('mouseleave blur', function () {
		$(this).closest('.depth3').siblings('a').removeClass('active');
	});

	$sitemap_btn.on('click', function () {
		$searchBtn.removeClass('active');

		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).attr('title', '사이트맵 열기');
			$(this).find('span').text('사이트맵 열기');
			$('.sitemap-wrap').removeClass('active');
			$('body').removeClass('sitemap-open');
		} else {
			$(this).addClass('active');
			$(this).attr('title', '사이트맵 닫기');
			$(this).find('span').text('사이트맵 닫기');
			$('.sitemap-wrap').addClass('active');
			$('body').addClass('sitemap-open');
		}

		if ($('.sitemap-wrap li .current').length > 0) {
			var $this_offsetTop = $('.sitemap-wrap li .current').offset().top - 550;
			$('.sitemap-wrap .sitemap-layout').animate({
				scrollTop: $this_offsetTop
			}, 0);
		}

		return false;
	});

	$sitemap_btn.on('blur', function () {
		if ($(this).hasClass('active')) {
			$('.sitemap-layout a').eq(0).focus();
		}
	});

	$searchBtn.on('click', function () {
		if ($(this).hasClass('active')) {
			$('body').removeClass('sitemap-open');
			$(this).removeClass('active');
			$(this).attr('title', '검색창 열기');
			$(this).text('검색창 열기');

		} else {
			$sitemap_btn.removeClass('active');
			$('body').addClass('sitemap-open');
			$(this).addClass('active');
			$(this).attr('title', '검색창 닫기');
			$(this).text('검색창 닫기');
		}
		return false;
	});

	$('.search-wrap .searchBtn').on('blur', function () {
		$searchBtn.focus();
	});

	// footer select
	$(".siteOpen").click(function (e) {
		e.preventDefault();
		if ($(".siteOpen").parent(".relatedSite").hasClass("active")) {
			$(".relatedSite").removeClass("active");
		} else {
			$(".relatedSite").addClass("active");
		}
	});


	// show more
	$(".db-box").slice(0, 9).show();
	$(".show-more").on('click', function (e) {
		e.preventDefault();
		$(".db-box:hidden").slice(0, 9).slideDown();
		if ($(".db-box:hidden").length == 0) {
			$(".show-more").fadeOut('slow');
		}
		$('html,body').animate({
			scrollTop: $(this).offset().top
		}, 1500);
	});

	// more srch
	$(".lnb-list.more-srch>li>label").on('click', function () {
		if ($(this).parent().hasClass("active")) {
			$(this).parent().removeClass('active');
		} else {
			$(".lnb-list.more-srch>li").removeClass('active');
			$(this).parent().addClass('active');
		}
	});
	$('#wrap').click(function (e) {
		if (!$('.lnb-list.more-srch>li').has(e.target).length) $('.lnb-list.more-srch>li').removeClass('active');
	});


	// memo
	$('.butts>button.memo').on('click', function () {
		$('.memo-wrap').slideToggle();
	});
});