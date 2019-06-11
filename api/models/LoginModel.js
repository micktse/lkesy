const db = require('../../db')
class LoginModel {
	vaildate(account, password) {
		let user = db.users
			.find(user => user.account === account || user.cell === account || user.email === account)
			.value()
		if (user) {
			if (user.password === password) {
				return user
			} else {
				return null
			}
		} else {
			return undefined
		}
	}
}
module.exports = { LoginModel }
