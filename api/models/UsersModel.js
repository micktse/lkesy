const uuid = require('node-uuid')
const db = require('../../db')
class UsersModel {
	load(query) {
		if (query && query !== '')
			return db.users
				.filter(
					({ name, cell, email, account, role }) =>
						((name && name.indexOf(query) > -1) ||
							(email && email.indexOf(query) > -1) ||
							(account && account.indexOf(query) > -1) ||
							(cell && cell.indexOf(query) > -1)) &&
						role === 'user'
				)
				.orderBy('createTime', 'desc')
				.value()
		else
			return db.users
				.filter(({ role }) => role === 'user')
				.orderBy('createTime', 'desc')
				.value()
	}
	get(account) {
		return db.users.find(g => g.account === account).value()
	}
	delete(id) {
		db.users.remove({ id }).write()
		return { result: 'success' }
	}
	save(user) {
		let isModify = user.id && user.id !== ''
		user.lastModify = new Date().getTime()
		if (isModify) {
			let { id } = user
			db.users
				.find({ id })
				.assign(user)
				.write()
		} else {
			user.id = 'U' + uuid.v1().replace(/-/g, '')
			user.createTime = new Date().getTime()
			user.role = 'user'
			db.users.push(user).write()
		}
		return user
	}
	modify(user) {
		let { account } = user
		user.lastModify = new Date().getTime()
		db.users
			.find({ account })
			.assign(user)
			.write()
		return user
	}
	vaildate({ id, account, cell, email }) {
		if (db.users.filter(u => u.id !== id && u.account === account).value().length > 0) {
			return { result: false, type: 'account', message: '账号已被注册，请更换账号重试' }
		}
		if (cell !== '' && db.users.filter(u => u.id !== id && u.cell === cell).value().length > 0) {
			return { result: false, type: 'cell', message: '电话号码已被注册，请更换电话号码重试' }
		}
		if (email !== '' && db.users.filter(u => u.id !== id && u.email === email).value().length > 0) {
			return { result: false, type: 'email', message: '电子邮件已被注册，请更换电子邮件重试' }
		}
		return { result: true }
	}
}

module.exports = { UsersModel }
