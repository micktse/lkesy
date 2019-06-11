var pageSize = 10
var pageList = 5
var page = 1
function load() {
	$('.cms-articles-list').empty()
	$.post('/articles.api', { query: $('.query').val(), column_id: $('.column').val(), pageSize, page }, function(res) {
		var data = res.data
		var pageCount = Number(res.pageCount)
		page = Number(res.page)
		$('.cms-articles-list').append(
			$('<div>')
				.attr('class', 'list-row head-row')
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('文案标题')
				)
				.append(
					$('<div>')
						.attr('class', 'col2')
						.html('文案标题')
				)
				.append(
					$('<div>')
						.attr('class', 'col3')
						.html('所属栏目')
				)
				.append(
					$('<div>')
						.attr('class', 'col4')
						.html('创建时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col5')
						.html('最后修改时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col6')
						.html('是否发布')
				)
				.append(
					$('<div>')
						.attr('class', 'col7')
						.html('操作')
				)
		)
		for (var i = 0; i < data.length; i++) {
			$('.cms-articles-list').append(
				$('<div>')
					.attr('class', 'list-row')
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].title)
					)
					.append(
						$('<div>')
							.attr('class', 'col2')
							.html(data[i].id)
					)
					.append(
						$('<div>')
							.attr('class', 'col3')
							.html(data[i].column_name)
					)
					.append(
						$('<div>')
							.attr('class', 'col4')
							.html(Toolkit.dateft(data[i].createTime))
					)
					.append(
						$('<div>')
							.attr('class', 'col5')
							.html(Toolkit.dateft(data[i].lastModify))
					)
					.append(
						$('<div>')
							.attr('class', 'col6')
							.html(data[i].release ? '是' : '否')
					)
					.append(
						$('<div>')
							.attr('class', 'col7')
							.append(
								$('<i>')
									.attr('title', data[i].release ? '撤回' : '发布')
									.attr('class', 'iconfont')
									.attr('data-id', data[i].id)
									.attr('data-name', data[i].title)
									.attr('data-release', data[i].release)
									.html(data[i].release ? '&#xe680;' : '&#xe626;')
									.click(function() {
										var that = $(this)
										Toolkit.confirm(
											'是否发布',
											'是否' +
												(that.attr('data-release') == 'true' ? '撤回' : '发布') +
												' “' +
												$(this).attr('data-name') +
												'”',
											function() {
												$.post(
													'/article.api',
													{
														id: that.attr('data-id'),
														release: that.attr('data-release') != 'true'
													},
													load
												)
											}
										)
									})
							)
							.append(
								$('<i>')
									.attr('title', '编辑')
									.attr('class', 'iconfont')
									.attr('data-id', data[i].id)
									.html('&#xe630;')
									.click(function() {
										location.href = 'article.cms?id=' + $(this).attr('data-id')
									})
							)
							.append(
								$('<i>')
									.attr('title', '删除')
									.attr('class', 'iconfont')
									.html('&#xe639;')
									.attr('data-name', data[i].title)
									.attr('data-id', data[i].id)
									.click(function() {
										var that = $(this)
										Toolkit.confirm('删除确认', '是否删除文案 “' + that.attr('data-name') + '"?', function() {
											$.ajax({
												url: '/articles.api?id=' + that.attr('data-id'),
												type: 'DELETE',
												complete: load
											})
										})
									})
							)
					)
			)
		}
		var footer = $('<div>').attr('class', 'footer-row')
		var pageEnd = pageCount > pageList ? pageList : pageCount
		var pageStart = 1

		if (page > Math.floor(pageList / 2)) {
			pageStart = page - Math.floor(pageList / 2)
			pageEnd = page + (pageList - Math.floor(pageList / 2) - 1)
		}
		if (pageEnd > pageCount) {
			//pageStart = pageCount - (pageList - 1)
			pageEnd = pageCount
		}
		for (var i = pageStart; i <= pageEnd; i++) {
			var css = 'page'
			if (i == page) {
				css = 'page-selected'
			}
			footer.append(
				$('<div>')
					.attr('class', css)
					.html(i)
					.click(function() {
						page = $(this).html()
						load()
					})
			)
		}
		$('.cms-articles-list').append(footer)
	})
}
function columnSelected(column) {
	$('.column').attr('value', column.id)
	$('.cms-articles-app .header h2').html(column.name)
	load()
}
$(function() {
	load()
	$('.search-btn').click(load)
	$('.cms-new').click(function() {
		location.href = 'article.cms'
	})
	$('.cms-column').click(function() {
		Toolkit.pop('columnselect.cms')
	})
	$('body').fadeIn()
})
