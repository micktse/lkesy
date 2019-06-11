var editor
function columnSelected(column) {
	if (column.id != '') {
		$('.column-id').attr('value', column.id)
		$('.column-name').attr('value', column.name)
		$('.column-name-text').html(column.name)
	}
}
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
function save(release) {
	if ($('.form .title').val() == '') {
		Toolkit.hints('请填写文案标题')
		return
	}
	if ($('.column-id').val() == '') {
		Toolkit.hints('请选择所属栏目')
		return
	}
	$.post(
		'/article.api',
		{
			id: $('.id').val(),
			title: $('.form .title').val(),
			sub_title: $('.sub_title').val(),
			author: $('.sub_title').val(),
			link: $('.link').val(),
			keyword: $('.keyword').val(),
			description: $('.description').val(),
			banner: $('.banner img').length > 0 ? $('.banner img').attr('src') : '',
			content: editor.html(),
			text: editor.text(),
			column_id: $('.column-id').val(),
			column_name: $('.column-name').val(),
			release
		},
		function() {
			location.href = 'articles.cms'
		}
	)
}

$(function() {
	if ($('.img').val() != '') {
		Toolkit.imageLoad($('.img').val(), '.banner', upload)
	} else {
		upload()
	}
	if ($('.column-name-text').html() == '') $('.column-name-text').html('点击选择所属栏目 -必选')
	$('.columns').click(function() {
		Toolkit.pop('/columnselect.cms', function(data) {
			return data.replace(/<div class="all">显示所有文案<\/div>/, '')
		})
	})
	$('.cms-back').click(function() {
		history.go(-1)
	})
	$('.cms-save').click(function() {
		save(false)
	})
	$('.cms-release').click(function() {
		save(true)
	})
})
KindEditor.ready(function(K) {
	editor = K.create('textarea[name="content"]', {})
})
