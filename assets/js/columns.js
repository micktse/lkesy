var pageSize = 10
var pageList = 5
var page = 1
function load() {
	$('.cms-columns-list').empty()
	$.post('/columns.api', { query: $('.query').val(), group_id: $('.group').val(), pageSize, page }, function(res) {
		var data = res.data
		var pageCount = Number(res.pageCount)
		page = Number(res.page)
		$('.cms-columns-list').append(
			$('<div>')
				.attr('class', 'list-row head-row')
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('栏目名称')
				)
				.append(
					$('<div>')
						.attr('class', 'col2')
						.html('栏目标识')
				)
				.append(
					$('<div>')
						.attr('class', 'col3')
						.html('所属栏目组')
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
						.html('操作')
				)
		)
		for (var i = 0; i < data.length; i++)
			$('.cms-columns-list').append(
				$('<div>')
					.attr('class', 'list-row')
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].name)
					)
					.append(
						$('<div>')
							.attr('class', 'col2')
							.html(data[i].id)
					)
					.append(
						$('<div>')
							.attr('class', 'col3')
							.html(data[i].group_name)
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
							.append(
								$('<i>')
									.attr('title', '编辑')
									.attr('class', 'iconfont')
									.attr('data-id', data[i].id)
									.html('&#xe630;')
									.click(function() {
										location.href = 'column.cms?id=' + $(this).attr('data-id')
									})
							)
							.append(
								$('<i>')
									.attr('title', '删除')
									.attr('class', 'iconfont')
									.html('&#xe639;')
									.attr('data-name', data[i].name)
									.attr('data-id', data[i].id)
									.click(function() {
										var that = $(this)
										Toolkit.confirm('删除确认', '是否删除栏目 “' + that.attr('data-name') + '"?', function() {
											$.ajax({
												url: '/columns.api?id=' + that.attr('data-id'),
												type: 'DELETE',
												complete: load
											})
										})
									})
							)
					)
			)
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
		$('.cms-columns-list').append(footer)
	})
}
function groupSelected(group) {
	$('.group').attr('value', group.id)
	if (group.id != '') $('.cms-columns-app .header h2').html(group.name)
	else $('.cms-columns-app .header h2').html('所有栏目')
	load()
}
$(function() {
	load()
	$('.search-btn').click(load)
	$('.cms-group').click(function() {
		Toolkit.pop('groupselect.cms')
	})
	$('.cms-new').click(function() {
		location.href = 'column.cms'
	})
	$('body').fadeIn()
})
