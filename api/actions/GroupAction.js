const { Groups } = require('../models')
class GroupAction {
	get({ id }) {
		if (id) {
			return new Groups().get(id)
		}
		return {}
	}
	post(query) {
		return new Groups().save(query)
	}
}
module.exports = { GroupAction }
