const { Login } = require('../models')
const session = require('../../session')
class LoginAction {
	post({ account, password }, req, res) {
		let user = new Login().vaildate(account, password)
		if (user) {
			let { userName, account, cell, email } = user
			session.register(req, res, user)
			return { code: 1, user: { userName, account, cell, email } }
		} else if (user === null) {
			return { code: 0, message: '用户密码错误' }
		}
		return { code: 0, message: '该用户账号不存在' }
	}
	delete({}, req, res) {
		session.remove(req, res)
		return {}
	}
}
module.exports = { LoginAction }
