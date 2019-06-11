function go() {
	$('.cms-main-frame').attr('src', $(this).attr('data-url'))
}
$(function() {
	$.post('/main.api', {}, function(menu) {
		for (var i = 0; i < menu.length; i++) {
			$('.cms-main-menu').append(
				$('<div>')
					.attr('class', 'btn')
					.attr('data-url', menu[i][3])
					.append(
						$('<i>')
							.attr('class', 'iconfont')
							.html(menu[i][0])
					)
					.append(
						$('<div>')
							.attr('class', 'caption')
							.append($('<span>').html(menu[i][1]))
					)
					.click(go)
			)
		}
		$('.cms-main-menu').append(
			$('<div>')
				.attr('class', 'btn')
				.append(
					$('<i>')
						.attr('class', 'iconfont')
						.html('&#xe650;')
				)
				.append(
					$('<div>')
						.attr('class', 'caption')
						.append($('<span>').html('退出系统'))
				)
				.click(function() {
					$.ajax({
						url: '/login.api',
						type: 'DELETE',
						complete: function() {
							location.href = 'login.html'
						}
					})
				})
		)
	})
})
