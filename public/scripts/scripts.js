// aMenuActive -> Add class to clicked li
// $('ul.navbar-nav > li').click(function (e) {    
//     console.log("log...clicked menu",);
//     $('ul.navbar-nav > li').removeClass('aMenuActive');
//     $(this).addClass('aMenuActive');
//     //e.preventDefault(); // -> works but does not send to link
// });

//***  Main menu scrolled 
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});
