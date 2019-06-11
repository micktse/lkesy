const { Users } = require('../models')
class UsersAction {
	post({ query, pageSize, page }) {
		let users = new Users().load(query)
		return {
			pageCount: Math.ceil(users.length / pageSize),
			page,
			data: users.slice((page - 1) * pageSize, page * pageSize)
		}
	}
	delete({ id }) {
		return new Users().delete(id)
	}
}
module.exports = { UsersAction }
