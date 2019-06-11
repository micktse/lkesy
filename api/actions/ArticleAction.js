const { Articles } = require('../models')
class ArticleAction {
	get({ id }) {
		if (id) {
			return new Articles().get(id)
		}
		return {}
	}
	post(query) {
		return new Articles().save(query)
	}
}
module.exports = { ArticleAction }
