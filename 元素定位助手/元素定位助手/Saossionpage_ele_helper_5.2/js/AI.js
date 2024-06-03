$(document).ready(function() {
    // 当窗口大小改变时重新计算高度
    $(window).on('resize', function() {
        var windowHeight = $(window).height();
        var iframeContainer = $('#iframeContainer');
        iframeContainer.css('height', (windowHeight * 0.9) + 'px');
    });

    // 初始时也需要设置一次高度
    $(window).trigger('resize');
});
