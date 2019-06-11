const fs = require('fs')
const config = require('../config')
const contentType = require('../content-type')
/**
 * 大字段处理程序
 * @author Mick
 */
class LobHandler {
	constructor(req, res) {
		this.req = req
		this.res = res
		this.query = new Object()
		this.isRead = req.method.toLowerCase() === 'get'
		let url = req.url.split('?')
		if (url.length > 1) {
			this.fileName = decodeURIComponent(url[1])
			this.ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1)
		}
	}
	invoke() {
		//读取文件
		if (this.isRead) {
			let filePath = `${config.dirname}/db/lob/${this.fileName}`
			if (this.fileName && fs.existsSync(filePath)) {
				let { mtime } = fs.statSync(filePath)
				if (mtime.toGMTString() === this.req.headers['if-modified-since']) {
					this.res.writeHead(304)
					this.res.end()
				} else {
					fs.readFile(filePath, (err, data) => {
						if (!err) {
							if (contentType[this.ext]) {
								this.res.setHeader('Content-Type', contentType[this.ext])
							}
							this.res.setHeader('Last-Modified', mtime.toGMTString())
							this.res.writeHead(200)
							this.res.write(data, 'binary')
							this.res.end()
						} else {
							this.res.writeHead(500)
							this.res.end()
						}
					})
				}
			} else {
				this.res.writeHead(404)
				this.res.end()
			}
		} else {
			let query = ''
			this.req.on('data', chunk => (query += chunk))
			this.req.on('end', () => {
				if (query !== '') {
					query = query.split('&')
					query.forEach(q => {
						let [key, value] = q.split('=')
						this.query[key] = decodeURIComponent(value.replace(/\+/g, '%20'))
					})
				}
				let fileName = `${new Date().getTime()}_${this.query.name}`
				let filePath = `${config.dirname}/db/lob/${fileName}`
				fs.writeFileSync(filePath, Buffer.from(this.query.file, 'base64'))
				this.res.setHeader('Content-Type', contentType.json)
				this.res.writeHead(200)
				this.res.write(JSON.stringify({ url: `/files/?${fileName}` }))
				this.res.end()
			})
		}
	}
}
module.exports = { LobHandler }
