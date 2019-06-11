const low = require('lowdb')
const config = require('../config')
const FileSync = require('lowdb/adapters/FileSync')
let adapter = new FileSync(`./db/${config.db_name}.db`)
let db = low(adapter)
let defaults = {
	ARTICLES: [],
	COLUMNS: [],
	GROUPS: [],
	USERS: [
		{
			name: '系统管理员',
			password: 'sureking',
			account: 'admin',
			role: 'admin'
		}
	],
	SEO: {},
	MESSAGES: [],
	VIEWDATA: [],
	MESSAGES: []
}
db.defaults(defaults).write()
let mission = {}
Object.keys(defaults).forEach(key => {
	mission[key.toLowerCase()] = db.get(key)
})
module.exports = mission
