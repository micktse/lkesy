const { ViewData } = require('../models')
class ViewDataAction {
	post() {
		return new ViewData().load()
	}
}
module.exports = { ViewDataAction }
