$('#readMore').click(function () {
    $('.read').toggleClass('read-less');
    if ($(this).text() == 'Show Less') $(this).text('Show More');
    else $(this).text('Show Less');
});