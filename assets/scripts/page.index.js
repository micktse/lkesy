$(function() {
	var owl = $('.owl-carousel')
	owl.owlCarousel({
		loop: true,
		items: 1,
		autoplay: true,
		autoplaySpeed: 1000,
		animateOut: 'lightSpeedOut',
		animateIn: 'lightSpeedIn'
	})
	owl.on('changed.owl.carousel', function(event) {
		$('.dots-border div').attr('class', 'dot')
		$('#dot' + (event.page.index + 1)).attr('class', 'selected')
	})
	$('#dot1').click(function() {
		owl.trigger('to.owl.carousel', [0])
	})
	$('#dot2').click(function() {
		owl.trigger('to.owl.carousel', [1])
	})
	$('#dot3').click(function() {
		owl.trigger('to.owl.carousel', [2])
	})
})
