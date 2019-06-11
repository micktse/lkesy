const { Messages } = require('../models')
class MessagesAction {
	post({ query, pageSize, page }) {
		let messages = new Messages().load(query)
		return {
			pageCount: Math.ceil(messages.length / pageSize),
			page,
			data: messages.slice((page - 1) * pageSize, page * pageSize)
		}
	}
	put(query) {
		return new Messages().save(query)
	}
}
module.exports = { MessagesAction }
