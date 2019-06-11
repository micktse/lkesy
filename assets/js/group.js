$(function() {
	$('.cms-back').click(function() {
		history.go(-1)
	})
	$('.cms-save').click(function() {
		if ($('.name').val() == '') {
			Toolkit.hints('请填写栏目组名称')
			$('.name').focus()
			return
		}
		$.post(
			'/group.api',
			{
				id: $('.id').val(),
				name: $('.name').val()
			},
			function() {
				location.href = 'groups.cms'
			}
		)
	})
	$('body').fadeIn()
})
