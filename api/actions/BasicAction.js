const { Users } = require('../models')
const session = require('../../session')
class BasicAction {
	get({}, req, res) {
		return session.valid(req, res)
	}
	post(query, req, res) {
		let user = new Users().modify(query)
		session.register(req, res, user)
		return user
	}
	patch({ password }, req, res) {
		return { result: session.valid(req, res).password === password }
	}
}
module.exports = { BasicAction }
