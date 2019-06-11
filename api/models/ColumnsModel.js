const uuid = require('node-uuid')
const db = require('../../db')
class ColumnsModel {
	get(id) {
		return db.columns.find(c => c.id === id).value()
	}
	load(query, group_id) {
		return db.columns
			.filter(c => {
				let i = true
				if (group_id) i = c.group_id === group_id
				if (query) i = c.name.indexOf(query) > -1
				return i
			})
			.orderBy('createTime', 'desc')
			.value()
	}
	save(column) {
		let isModify = column.id && column.id !== ''
		column.lastModify = new Date().getTime()
		if (isModify) {
			let { id } = column
			db.columns
				.find({ id })
				.assign(column)
				.write()
		} else {
			column.id = 'C' + uuid.v1().replace(/-/g, '')
			column.createTime = new Date().getTime()
			db.columns.push(column).write()
		}
		return {
			result: 'success'
		}
	}
	delete(id) {
		db.columns.remove({ id }).write()
		return { result: 'success' }
	}
}
module.exports = { ColumnsModel }
