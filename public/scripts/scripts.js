// Add class to clicked class
$('.aMenu').click(function(){
    $('.aMenuActive').removeClass('aMenuActive');
    $(this).addClass('aMenuActive');
    console.log("log...button");
});

//***  Main menu scrolled 
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});

