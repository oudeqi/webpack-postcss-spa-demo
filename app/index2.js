import './components/index/index.css';

$('.nav-item').mouseenter(function(){
	$(this).find('ul').show();
	$(this).find('>a').addClass('active');
}).mouseleave(function(){
	$(this).find('ul').hide();
	$(this).find('>a').removeClass('active');
});

var mySwiper = new Swiper('#bannerSwiper', {
    loop: true,
	// autoplay:5000,
	speed:1000,
	pagination: '#bannerpagination',
	paginationClickable: true,
	grabCursor : true,
	// nextButton: '.arrow-right',
 //    prevButton: '.arrow-left',
	parallax:true,
}); 