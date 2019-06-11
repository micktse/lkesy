const uuid = require('node-uuid')
const config = require('./config')
module.exports = {
	register: (req, res, obj) => {
		let id
		if (req.headers.cookie) {
			for (let cookie of req.headers.cookie.split(';')) {
				let [key, value] = cookie.split('=')
				if (key === 'NSESSIONID') {
					id = value
					break
				}
			}
		}
		let i = process.sessionContext.findIndex(s => s.sessionId === id)
		if (i === -1) {
			let sessionId = uuid.v1()
			let expire = new Date()
			expire.setMinutes(expire.getMinutes() + config.session_expire_minutes)
			expire = expire.getTime()
			process.sessionContext.push({ sessionId, expire, obj })
			res.setHeader('Set-Cookie', `NSESSIONID=${sessionId};path=/`)
		} else {
			let expire = new Date()
			expire.setMinutes(expire.getMinutes() + config.session_expire_minutes)
			expire = expire.getTime()
			process.sessionContext[i].expire = expire
			process.sessionContext[i].obj = obj
		}
	},
	remove: (req, res) => {
		let id
		if (req.headers.cookie) {
			for (let cookie of req.headers.cookie.split(';')) {
				let [key, value] = cookie.split('=')
				if (key === 'NSESSIONID') {
					id = value
					break
				}
			}
		}
		let i = process.sessionContext.findIndex(s => s.sessionId === id)
		if (i > -1) {
			process.sessionContext.splice(i, 1)
		}
		res.setHeader('Set-Cookie', `NSESSIONID=${id};max-age=-1s`)
	},
	valid: (req, res) => {
		let id
		if (req.headers.cookie) {
			for (let cookie of req.headers.cookie.split(';')) {
				let [key, value] = cookie.split('=')
				if (key === 'NSESSIONID') {
					id = value
					break
				}
			}
		}
		let i = process.sessionContext.findIndex(s => s.sessionId === id)
		if (i > -1) {
			if (new Date().getTime() < process.sessionContext[i].expire) {
				let expire = new Date()
				expire.setMinutes(expire.getMinutes() + config.session_expire_minutes)
				expire = expire.getTime()
				process.sessionContext[i].expire = expire
				return process.sessionContext[i].obj
			} else {
				res.setHeader('Set-Cookie', `NSESSIONID=${id};max-age=-1s`)
				return false
			}
		} else {
			return false
		}
	}
}
