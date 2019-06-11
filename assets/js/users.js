var pageSize = 10
var pageList = 5
var page = 1
function load() {
	$('.cms-users-list').empty()
	$.post('/users.api', { query: $('.query').val(), pageSize, page }, function(res) {
		var data = res.data
		var pageCount = Number(res.pageCount)
		page = Number(res.page)
		$('.cms-users-list').append(
			$('<div>')
				.attr('class', 'list-row head-row')
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('账号')
				)
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('姓名')
				)
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('邮箱')
				)
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('手机')
				)
				.append(
					$('<div>')
						.attr('class', 'col2')
						.html('创建时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col3')
						.html('最后修改时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col4')
						.html('操作')
				)
		)
		for (var i = 0; i < data.length; i++)
			$('.cms-users-list').append(
				$('<div>')
					.attr('class', 'list-row')
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].account)
					)
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].name)
					)
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].email)
					)
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].cell)
					)
					.append(
						$('<div>')
							.attr('class', 'col2')
							.html(Toolkit.dateft(data[i].createTime))
					)
					.append(
						$('<div>')
							.attr('class', 'col3')
							.html(Toolkit.dateft(data[i].lastModify))
					)
					.append(
						$('<div>')
							.attr('class', 'col4')
							.append(
								$('<i>')
									.attr('title', '编辑')
									.attr('class', 'iconfont')
									.attr('data-account', data[i].account)
									.html('&#xe630;')
									.click(function() {
										location.href = 'user.cms?account=' + $(this).attr('data-account')
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
										Toolkit.confirm('删除确认', '是否删除用户 “' + that.attr('data-name') + '"?', function() {
											$.ajax({
												url: '/users.api?id=' + that.attr('data-id'),
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
			pageStart = pageCount - (pageList - 1)
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
		$('.cms-users-list').append(footer)
	})
}
$(function() {
	load()
	$('.search-btn').click(load)
	$('.cms-new').click(function() {
		location.href = 'user.cms'
	})
	$('body').fadeIn()
})
