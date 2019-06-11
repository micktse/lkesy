const uuid = require('node-uuid')
const db = require('../../db')
class ArticlesModel {
	get(id) {
		return db.articles.find(c => c.id === id).value()
	}
	load(query, column_id) {
		return db.articles
			.filter(a => {
				let i = true
				if (column_id) i = a.column_id === column_id
				if (query) i = a.title.indexOf(query) > -1
				return i
			})
			.orderBy('createTime', 'desc')
			.value()
	}
	save(article) {
		let isModify = article.id && article.id !== ''
		article.lastModify = new Date().getTime()
		article.release = article.release === 'true'
		if (isModify) {
			let { id } = article
			db.articles
				.find({ id })
				.assign(article)
				.write()
		} else {
			article.id = 'A' + uuid.v1().replace(/-/g, '')
			article.createTime = new Date().getTime()
			db.articles.push(article).write()
		}
		return {
			result: 'success'
		}
	}
	delete(id) {
		db.articles.remove({ id }).write()
		return { result: 'success' }
	}
}
module.exports = { ArticlesModel }
