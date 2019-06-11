const uuid = require('node-uuid')
const db = require('../../db')
class GroupsModel {
	load(query) {
		if (query && query !== '')
			return db.groups
				.filter(({ name }) => name.indexOf(query) > -1)
				.orderBy('createTime', 'desc')
				.value()
		else return db.groups.orderBy('createTime', 'desc').value()
	}
	get(id) {
		return db.groups.find(g => g.id === id).value()
	}
	delete(id) {
		db.groups.remove({ id }).write()
		return { result: 'success' }
	}
	save(group) {
		let isModify = group.id && group.id !== ''
		group.lastModify = new Date().getTime()
		if (isModify) {
			let { id } = group
			db.groups
				.find({ id })
				.assign(group)
				.write()
		} else {
			group.id = 'G' + uuid.v1().replace(/-/g, '')
			group.createTime = new Date().getTime()
			db.groups.push(group).write()
		}
		return {
			result: 'success'
		}
	}
}
module.exports = { GroupsModel }
