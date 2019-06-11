const db = require('../../db')
class ViewDataModel {
	load() {
		return db.viewdata.value()
	}
	save() {
		let now = new Date()
		let year = now.getFullYear()
		let month = now.getMonth() + 1
		let date = now.getDate()
		let hours = now.getHours()
		let item = db.viewdata.find(t => t.year === year && t.month === month && t.date === date && t.hours === hours)
		if (item.value()) {
			item.assign({ count: item.value().count + 1 }).write()
		} else {
			db.viewdata.push({ year, month, date, hours, count: 1 }).write()
		}
	}
}
module.exports = { ViewDataModel }
