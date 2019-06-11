const { Columns } = require('../models')
class ColumnAction {
	get({ id }) {
		if (id) {
			return new Columns().get(id)
		}
		return {}
	}
	post(query) {
		return new Columns().save(query)
	}
}
module.exports = { ColumnAction }
