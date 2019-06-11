$(function() {
	if (self != top) {
		top.location.href = location.href
	} else {
		$('.cms-login-btn').click(function() {
			if ($('.account').val() == '') {
				$('.account').focus()
				Toolkit.hints('请输入用户账号、电子邮箱或手机号码')
			} else if ($('.password').val() == '') {
				$('.password').focus()
				Toolkit.hints('请输入用户登录密码')
			} else {
				$.post(
					'/login.api',
					{
						account: $('.account').val(),
						password: $('.password').val()
					},
					function(data) {
						if (data.code == 1) {
							top.location.href = 'main.cms'
						} else {
							Toolkit.hints(data.message)
						}
					}
				)
			}
		})
	}
})
