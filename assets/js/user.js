$(function() {
	$('.cms-back').click(function() {
		history.go(-1)
	})
	$('.cms-save').click(function() {
		if ($('.account').val() == '') {
			Toolkit.hints('请输入账号信息')
			return
		}
		if ($('.name').val() == '') {
			Toolkit.hints('请输入姓名')
			return
		}
		if ($('.password').val() == '') {
			Toolkit.hints('请输入登录密码')
			return
		}
		if ($('.confirm-password').val() == '') {
			Toolkit.hints('请确认登录密码')
			return
		}
		if ($('.password').val() != $('.confirm-password').val()) {
			Toolkit.hints('输入登录密码和确认密码不一致')
			return
		}
		$.ajax({
			url: '/user.api',
			method: 'PATCH',
			data: {
				id: $('.id').val(),
				account: $('.account').val(),
				cell: $('.cell').val(),
				email: $('.email').val()
			},
			success: function(res) {
				if (res.result) {
					$.post(
						'/user.api',
						{
							id: $('.id').val(),
							account: $('.account').val(),
							name: $('.name').val(),
							cell: $('.cell').val(),
							email: $('.email').val(),
							password: $('.password').val(),
							description: $('.description').val()
						},
						function() {
							location.href = 'users.cms'
						}
					)
				} else {
					Toolkit.hints(res.message)
				}
			}
		})
	})
})
