var pageSize = 10
var pageList = 5
var page = 1
function load() {
	$('.cms-groups-list').empty()
	$.post('/groups.api', { query: $('.query').val(), pageSize, page }, function(res) {
		var data = res.data
		var pageCount = Number(res.pageCount)
		page = Number(res.page)
		$('.cms-groups-list').append(
			$('<div>')
				.attr('class', 'list-row head-row')
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('栏目组名称')
				)
				.append(
					$('<div>')
						.attr('class', 'col2')
						.html('栏目组标识')
				)
				.append(
					$('<div>')
						.attr('class', 'col3')
						.html('创建时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col4')
						.html('最后修改时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col5')
						.html('操作')
				)
		)
		for (var i = 0; i < data.length; i++) {
			$('.cms-groups-list').append(
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
							.html(Toolkit.dateft(data[i].createTime))
					)
					.append(
						$('<div>')
							.attr('class', 'col4')
							.html(Toolkit.dateft(data[i].lastModify))
					)
					.append(
						$('<div>')
							.attr('class', 'col5')
							.append(
								$('<i>')
									.attr('title', '编辑')
									.attr('class', 'iconfont')
									.attr('data-id', data[i].id)
									.html('&#xe630;')
									.click(function() {
										location.href = 'group.cms?id=' + $(this).attr('data-id')
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
										Toolkit.confirm('删除确认', '是否删除栏目组 “' + that.attr('data-name') + '"?', function() {
											$.ajax({
												url: '/groups.api?id=' + that.attr('data-id'),
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
		$('.cms-groups-list').append(footer)
	})
}
$(function() {
	load()
	$('.search-btn').click(load)
	$('.cms-groups-new').click(function() {
		location.href = 'group.cms'
	})
	$('body').fadeIn()
})
