const { Users } = require('../models')
class UserAction {
	get({ account }) {
		if (account) {
			return new Users().get(account)
		}
		return {}
	}
	post(query) {
		return new Users().save(query)
	}
	patch(query) {
		return new Users().vaildate(query)
	}
}
module.exports = { UserAction }
