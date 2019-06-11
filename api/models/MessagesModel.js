const uuid = require('node-uuid')
const db = require('../../db')
class MessagesModel {
	load(query) {
		return db.messages
			.filter(c => !query || (c.text && c.text.indexOf(query) > -1))
			.orderBy('createTime', 'desc')
			.value()
	}
	save(message) {
		let isModify = message.id && message.id !== ''
		message.lastModify = new Date().getTime()
		if (isModify) {
			let { id } = message
			db.message
				.find({ id })
				.assign(message)
				.write()
		} else {
			message.id = 'M' + uuid.v1().replace(/-/g, '')
			message.createTime = new Date().getTime()
			db.messages.push(message).write()
		}
		return {
			result: 'success'
		}
	}
}
module.exports = { MessagesModel }
