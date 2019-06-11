const { Groups, Columns } = require('../models')
class ColumnSelectAction {
	get() {
		let groups = new Groups().load()
		let columns = new Columns().load()
		groups.forEach(({ id }, i) => {
			groups[i].columns = columns.filter(c => c.group_id === id)
		})
		return { groups: JSON.stringify(groups) }
	}
}
module.exports = { ColumnSelectAction }
