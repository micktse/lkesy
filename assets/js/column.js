function upload() {
	$('.banner').empty()
	$('.banner').append(
		$('<div>')
			.attr('class', 'upload-btn')
			.append(
				$('<i>')
					.attr('class', 'iconfont')
					.html('&#xe600;')
			)
			.click(function() {
				Toolkit.upload('.banner', upload)
			})
	)
}

function groupSelected(group) {
	$('.group-name-text').html(group.name)
	$('.group-id').attr('value', group.id)
	$('.group-name').attr('value', group.name)
}
$(function() {
	if ($('.group-name-text').html() == '') $('.group-name-text').html('点击选择所属栏目组 -必选')
	if ($('.img').val() != '') {
		Toolkit.imageLoad($('.img').val(), '.banner', upload)
	} else {
		upload()
	}
	$('.cms-column-edit-back').click(function() {
		history.go(-1)
	})
	$('.cms-column-edit-save').click(function() {
		if ($('.name').val() == '') {
			Toolkit.hints('请填写名称')
			$('.name').focus()
			return
		}
		if ($('.group-id').val() == '') {
			Toolkit.hints('请选择所属栏目组')
			return
		}
		$.post(
			'/column.api',
			{
				id: $('.id').val(),
				name: $('.name').val(),
				group_id: $('.group-id').val(),
				group_name: $('.group-name').val(),
				keyword: $('.keyword').val(),
				description: $('.description').val(),
				banner: $('.banner img').length > 0 ? $('.banner img').attr('src') : '',
				customize: $('.customize').val()
			},
			function(data) {
				if (data.result == 'success') {
					location.href = '/columns.cms'
				}
			}
		)
	})
	$('.groups').click(function() {
		Toolkit.pop('/groupselect.cms', function(data) {
			return data.replace(/<div class="all">显示所有栏目<\/div>/, '')
		})
	})
	$('body').fadeIn()
})
