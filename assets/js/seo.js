$(function() {
	$('.cms-back').click(function() {
		history.go(-1)
	})
	$('.cms-save').click(function() {
		if ($('.keyword').val() == '') {
			Toolkit.hints('请输入关键字')
			return
		}
		if ($('.description').val() == '') {
			Toolkit.hints('请输入描述')
			return
		}
		$.post(
			'/seo.api',
			{
				keyword: $('.keyword').val(),
				description: $('.description').val()
			},
			function() {
				Toolkit.hints('搜索引擎优化信息保存成功')
			}
		)
	})
})
