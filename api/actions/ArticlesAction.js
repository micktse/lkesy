const { Articles } = require('../models')
class ArticlesAction {
	post({ query, column_id, pageSize, page }) {
		let articles = new Articles().load(query, column_id)
		return {
			pageCount: Math.ceil(articles.length / pageSize),
			page,
			data: articles.slice((page - 1) * pageSize, page * pageSize)
		}
	}
	delete({ id }) {
		return new Articles().delete(id)
	}
}
module.exports = { ArticlesAction }
