import './assets/styles/base.css';
import './assets/styles/sprite.css';
import './components/header/header.css';
import './components/index/index.css';
import './components/footer/footer.css';

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