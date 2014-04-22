$(document).ready(function () {

    var horizontal_line_left_limit = [],
        horizontal_line_right_limit = [];

    // Calculate the width of the org chart
    $('.org-chart-container').width(($('li').length - $('ol').length + 4) * $('li:last').width());

    // ut the center point markers for top and bottom if necessary.
    $('.container').each(function () {
        $(this).before('<div class="center-point-top"> </div>');
        if ($(this).siblings('ol').size() > 0) {
            $(this).after('<div class="center-point-bottom"> </div>');
        }
    });

    // Dual Reports Experimental at this point.
    $('.dual-report').each(function () {
        var parent_width = $(this).parent().width(),
            dual_report_width = $(this).width();
        $(this).css({
            left: ((parent_width - dual_report_width) / 2) + 'px'
        });
    });

    // Variable width container boxes that adjust for name size.  Will only adjust if name text length is larger than css width set on the .vcard.
    $('.fn').each(function () {
        var parent_width = $(this).parent().width(),
            child_width = $(this).width();
        if (child_width > parent_width) {
            $(this).parents('.vcard').width(child_width);
        }
    });

    // Connecting the dots so to speak
    function horizontal_line(top, left) {
        this.top = top;
        this.left = left;
    }

    $('ol > li:last-child > .center-point-top').each(function (i) {
        horizontal_line_right_limit[i] = new horizontal_line($(this).offset().top, $(this).offset().left);
    });

    $('ol > li:first-child > .center-point-top').each(function (i) {
        horizontal_line_left_limit[i] = new horizontal_line($(this).offset().top, $(this).offset().left);
        $(this).before('<div class="line"> </div>');
        $(this).siblings(".line").css({
            width:  (horizontal_line_right_limit[i].left - horizontal_line_left_limit[i].left),
            left:   horizontal_line_left_limit[i].left,
            top:    horizontal_line_left_limit[i].top
        });
    });

});