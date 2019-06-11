var pageSize = 5
var pageList = 5
var page = 1
function load() {
	$('.cms-messages-list').empty()
	$.post('/messages.api', { query: $('.query').val(), pageSize, page }, function(res) {
		var data = res.data
		var pageCount = Number(res.pageCount)
		page = Number(res.page)
		$('.cms-messages-list').append(
			$('<div>')
				.attr('class', 'list-row head-row')
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('时间')
				)
				.append(
					$('<div>')
						.attr('class', 'col1')
						.html('类别')
				)
				.append(
					$('<div>')
						.attr('class', 'col2')
						.html('信息')
				)
		)
		for (var i = 0; i < data.length; i++)
			$('.cms-messages-list').append(
				$('<div>')
					.attr('class', 'list-row')

					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(Toolkit.dateft(data[i].createTime))
					)
					.append(
						$('<div>')
							.attr('class', 'col1')
							.html(data[i].type)
					)
					.append(
						$('<div>')
							.attr('class', 'col2')
							.html(data[i].content)
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
		$('.cms-messages-list').append(footer)
	})
}
$(function() {
	load()
	$('.search-btn').click(load)
})
