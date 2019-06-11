const db = require('../../db')
class SEOModel {
	get() {
		return db.seo.value()
	}
	save({ keyword, description }) {
		db.seo.assign({ keyword, description }).write()
	}
}

module.exports = { SEOModel }
