function save(password) {
	$.post(
		'/basic.api',
		{
			id: $('.id').val(),
			account: $('.account').val(),
			name: $('.name').val(),
			cell: $('.cell').val(),
			email: $('.email').val(),
			password,
			description: $('.description').val()
		},
		function() {
			Toolkit.hints('个人信息修改成功')
		}
	)
}
$(function() {
	$('.cms-back').click(function() {
		history.go(-1)
	})
	$('.cms-save').click(function() {
		if ($('.account').val() == '') {
			Toolkit.hints('请输入账号信息')
			$('.account').focus()
			return
		}
		if ($('.name').val() == '') {
			Toolkit.hints('请输入姓名')
			$('.name').focus()
			return
		}
		if ($('.password').val() != '') {
			$.ajax({
				url: '/basic.api',
				method: 'PATCH',
				data: { password: $('.password').val() },
				success: function(data) {
					if (data.result) {
						if ($('.new-password').val() == '') {
							Toolkit.hints('请输入新登录密码')
							return
						}
						if ($('.confirm-password').val() == '') {
							Toolkit.hints('请确认登录密码')
							return
						}
						if ($('.new-password').val() != $('.confirm-password').val()) {
							Toolkit.hints('输入新登录密码和确认密码不一致')
							return
						}
						save($('.new-password').val())
					} else {
						Toolkit.hints('原登录密码不正确')
					}
				}
			})
		} else {
			save()
		}
	})
})
