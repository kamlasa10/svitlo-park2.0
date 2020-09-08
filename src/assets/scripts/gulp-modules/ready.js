@@include('./libs.js');
(function ($) {
    const img = $('.info__content img')
    const play = $('[data-play]')
    const video = $('.video__block video')[0]
    let isScrolled = false

    video.addEventListener('pause', () => {
        play.removeClass('video__play--playing')
    })

    video.addEventListener('play', () => {
        play.addClass('video__play--playing')
    })

    play.on('click', function() {
        $(this).addClass('video__play--playing')
        video.play()
    })

    $('.slider__wrap').slick({
        arrows: false,
        vertical: true,
        dots: true,
        infinite: false
    })

    $('.slider__wrap').on('afterChange', (_, slick, currentSlide = 0) => {
        if(currentSlide === slick.$slides.length - 1) {
            $('.slider__wrap').unbind('wheel', onWheelSliderWrapHanlde)
            toggleBodyScroll(false)
        }
    })

    $(document).on('scroll', (e) => {
        const offsetTop = document.documentElement.scrollTop
        const offsetSlider = $('.slider__wrap').offset().top

        if(offsetTop + 150 >= offsetSlider) {
            const screanHeight = document.documentElement.clientHeight
            const offsetTopForPadding = (screanHeight / 10) / 1.2
            const needMoreScroll = screanHeight >= 1050 ? offsetTopForPadding : 0
            const userHeightScrean = offsetTop - screanHeight
            const a = $('.slider__wrap').outerHeight() - (offsetTop + 150 - screanHeight)
            if(!isScrolled) {
                const scrollingIn = offsetTop + userHeightScrean - needMoreScroll
                const body = $("html, body");
                body.stop().animate({scrollTop: scrollingIn}, 800, 'swing', function() {
                    toggleBodyScroll(true)
                    $('.slider__wrap').on('wheel', onWheelSliderWrapHanlde)
                });
                isScrolled = true
            }
        }
    })

    function onWheelSliderWrapHanlde(e) {
        if(e.originalEvent.wheelDeltaY >= 120) {
            $('.slider__wrap').slick('slickPrev')
        } else {
            $('.slider__wrap').slick('slickNext')
        }
    }

    function onMouseEnterSliderWrapHandler() {
        toggleBodyScroll(true)
    }

    function onMouseleaveSliderWrapHandler() {
        toggleBodyScroll(false)
    }

    function toggleBodyScroll(disable) {
        if (!window.tempScrollTop) {
            window.tempScrollTop = window.pageYOffset;
            // save the current position in a global variable so I can access again later

        }
        if (disable) {
            document.body.classList.add('disable-scroll');
            document.body.style.top = `-${window.tempScrollTop}px`;
        } else {
            document.body.classList.remove('disable-scroll');
            document.body.style.top = `0px`;
            window.scrollTo({top: window.tempScrollTop});
            window.tempScrollTop = 0;
        }
    }

    const userWidth = document.documentElement.clientWidth
    const height = document.documentElement.clientWidth / 2
    img.css({
        width: userWidth,
        height: height
    })

    window.addEventListener('resize', () => {
        const userWidth = document.documentElement.clientWidth
        const height = document.documentElement.clientWidth / 2
        img.css({
            width: userWidth,
            height: height
        })
    })

    $('.main__slider').on('init afterChange', (_, slick, currentSlide = 0) => {
        $('.main__controls-info-current').text(`${currentSlide + 1}/`)
        $('.main__controls-info-total').text(slick.$slides.length)
    })

    $(".main__slider").slick({
        arrows: false,
        autoplay: true,
        dots: false
    })

    $('.main__controls-btn--next').click(() => {
        $('.main__slider').slick('slickNext')
    })
})(jQuery);