const { Dashboard } = require('../models')
class DashboardAction {
	get() {
		return new Dashboard().stat()
	}
}
module.exports = { DashboardAction }
