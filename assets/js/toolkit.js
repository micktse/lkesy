var Toolkit = {
	camel2hyphen: function(str) {
		var uppers = str.match(/[A-Z]/g)
		if (uppers) {
			uppers.forEach(U => {
				str = str.replace(U, '-' + U.toLowerCase())
			})
		}
		return str
	},
	style: function(obj) {
		var items = new Array()
		Object.keys(obj).forEach(key => {
			items.push(this.camel2hyphen(key) + ':' + obj[key])
		})
		return items.join(';') + ';'
	},
	hints: function(str) {
		$('.hints').remove()
		var toast = $('<div>')
			.attr('class', 'hints')
			.html(str)
		$('body').append(toast)
		toast.attr(
			'style',
			this.style({
				left: ($('body').width() - toast.width() - 40) / 2 + 'px'
			})
		)
	},
	user: function(user) {
		if (user) {
			window.sessionStorage.setItem('user', user)
		} else {
			user = window.sessionStorage.getItem('user')
			if (!user) {
				window.location.href = '/login.html'
			}
			return user
		}
	},
	dateft: function(ts) {
		if (ts) {
			var date = new Date(ts)
			return (
				date.getFullYear() +
				'-' +
				(date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
				'-' +
				(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
				' ' +
				(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
				':' +
				(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
				':' +
				(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
			)
		}
		return ts
	},
	imageLoad(url, selector, callback) {
		$(selector).empty()
		$(selector)
			.append(
				$('<img>')
					.attr('class', 'upload-img')
					.attr('src', url)
					.click(function() {
						Toolkit.upload(selector, callback)
					})
			)
			.append(
				$('<div>')
					.attr('class', 'delete-btn')
					.append(
						$('<i>')
							.attr('class', 'iconfont')
							.html('&#xe639;')
					)
					.click(callback)
			)
	},
	upload: function(selector, callback) {
		$('<input>')
			.attr('type', 'file')
			.attr('accept', 'image/*')
			.change(function() {
				var r = new FileReader()
				var file = $(this)[0].files[0]
				r.onload = function() {
					$.post('/files/', { name: file.name, file: r.result.replace(/data:.*;base64,/i, '') }, function(data) {
						$(selector).empty()
						$(selector)
							.append(
								$('<img>')
									.attr('class', 'upload-img')
									.attr('src', data.url)
									.click(function() {
										Toolkit.upload(selector, callback)
									})
							)
							.append(
								$('<div>')
									.attr('class', 'delete-btn')
									.append(
										$('<i>')
											.attr('class', 'iconfont')
											.html('&#xe639;')
									)
									.click(callback)
							)
					})
				}
				r.readAsDataURL(file)
			})
			.trigger('click')
	},
	confirm: function(caption, msg, callback) {
		var shade = $('<div>').attr('class', 'shade')
		var frame = $('<div>')
			.attr('class', 'confirm-frame')
			.append(
				$('<div>')
					.attr('class', 'confirm-caption')
					.html(caption)
			)
			.append(
				$('<div>')
					.attr('class', 'confirm-message')
					.html(msg)
			)
			.append(
				$('<div>')
					.attr('class', 'confirm-btns')
					.append(
						$('<button>')
							.html('取消')
							.click(function() {
								$('.shade').remove()
								$('.confirm-frame').remove()
								$('#app').removeAttr('style')
							})
					)
					.append(
						$('<button>')
							.html('确认')
							.click(function() {
								$('.shade').remove()
								$('.confirm-frame').remove()
								$('#app').removeAttr('style')
								callback()
							})
					)
			)
		$('#app').css('filter', 'blur(2px)')
		$('body')
			.append(shade)
			.append(frame)
	},
	closePop: function() {
		$('.shade').remove()
		$('.pop-frame').remove()
		$('#app').removeAttr('style')
	},
	pop: function(component, handler) {
		var mouseIn = false
		$.get(component, {}, function(data) {
			data = handler ? handler(data) : data
			var shade = $('<div>').attr('class', 'shade')
			var frame = $('<div>')
				.attr('class', 'pop-frame')
				.append(
					$('<div>')
						.attr('class', 'pop-window')
						.html(data)
						.mouseover(function() {
							mouseIn = true
						})
						.mouseout(function() {
							mouseIn = false
						})
				)
				.click(function() {
					if (!mouseIn) {
						$('.shade').remove()
						$('.pop-frame').remove()
						$('#app').removeAttr('style')
					}
				})
			$('#app').css('filter', 'blur(2px)')
			$('body')
				.append(shade)
				.append(frame)
		})
	}
}
