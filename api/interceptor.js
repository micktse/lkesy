const { ViewData } = require('./models')
module.exports = {
	invoke(req) {
		if (/.html?/.test(req.url)) {
			new ViewData().save()
		}
	}
}
