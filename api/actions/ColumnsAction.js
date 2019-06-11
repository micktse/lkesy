const { Columns } = require('../models')
class ColumnsAction {
	post({ query, group_id, pageSize, page }) {
		let columns = new Columns().load(query, group_id)
		return {
			pageCount: Math.ceil(columns.length / pageSize),
			page,
			data: columns.slice((page - 1) * pageSize, page * pageSize)
		}
	}
	delete({ id }) {
		return new Columns().delete(id)
	}
}
module.exports = { ColumnsAction }
