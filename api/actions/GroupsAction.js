const { Groups } = require('../models')
class GroupsAction {
	post({ query, pageSize, page }) {
		let groups = new Groups().load(query)
		return {
			pageCount: Math.ceil(groups.length / pageSize),
			page,
			data: groups.slice((page - 1) * pageSize, page * pageSize)
		}
	}
	delete({ id }) {
		return new Groups().delete(id)
	}
}
module.exports = { GroupsAction }
