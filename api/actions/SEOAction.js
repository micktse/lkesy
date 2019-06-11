const { SEO } = require('../models')
class SEOAction {
	get() {
		return new SEO().get()
	}
	post({ keyword, description }) {
		new SEO().save({ keyword, description })
		return {}
	}
}
module.exports = { SEOAction }
