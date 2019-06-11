const db = require('../../db')
class DashboardModel {
	stat() {
		return {
			groups: db.groups.value().length,
			columns: db.columns.value().length,
			articles: db.articles.value().length,
			users: db.users.value().length
		}
	}
}

module.exports = { DashboardModel }
