@@include('./libs.js');
(function ($) {
	const tabs = $('.choise__top-tab')
	const content = $('[data-apart]')
	tabs.each(function(i) {
		$(this).on('click', (e) => {
			e.preventDefault()
			const filterName = e.currentTarget.dataset.flat
			showContent(filterName)
			showActiveTab(i)
		})
	})

	function showActiveTab(i = 0) {
		tabs.removeClass('choise__top-tab--active')
		tabs.eq(i).addClass('choise__top-tab--active')
	}

	showActiveTab()

	function showContent(filterName) {
		content.each(function() {
			$(this).hide()
		})

		$(`[data-apart="${filterName}"]`).show()
	}

	showContent('smart')

	$('.choise__filter-input--house').ionRangeSlider({
		type: "double",
		min: 1,
		max: 6,
		from: 1,
		to: 6
	})

	$('.choise__filter-input--floor').ionRangeSlider({
		type: "double",
		min: 2,
		max: 25,
		from: 2,
		to: 25
	})

	$('.choise__filter-input--stage').ionRangeSlider({
		type: "double",
		min: 1,
		max: 5,
		from: 1,
		to: 5
	})

	$('.choise__filter-input--floor').ionRangeSlider({
		type: "double",
		min: 2,
		max: 25,
		from: 2,
		to: 25
	})

	$('.choise__filter-input--param').ionRangeSlider({
		type: "double",
		min: 27,
		max: 169,
		from: 27,
		to: 169
	})

	var loader = function () {
		$(".loader-wrap").delay(500).fadeOut(500);
	};
	loader()
})(jQuery);