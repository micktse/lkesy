const { Groups } = require('../models')
class GroupSelectAction {
	get() {
		return { groups: JSON.stringify(new Groups().load()) }
	}
}
module.exports = { GroupSelectAction }
