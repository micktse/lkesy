const fs = require('fs')
const config = require('../config')
const contentType = require('../content-type')
/**
 * 静态资源处理程序
 * @author Mick
 */
class StaticHandler {
	/**
	 * 构造函数
	 * @params  req http请求对象
	 *          res http响应对象
	 */
	constructor(req, res) {
		this.req = req
		this.res = res
		this.filePath = `${config.dirname}/assets/${req.url.substr(1)}`
		this.ext = ''
		if (req.url.indexOf('.') > -1) {
			this.ext = req.url.substr(req.url.lastIndexOf('.') + 1)
		}
	}
	/**
	 * 读取静态资源文件
	 */
	invoke() {
		if (fs.existsSync(this.filePath)) {
			let { mtime } = fs.statSync(this.filePath)
			if (mtime.toGMTString() === this.req.headers['if-modified-since']) {
				this.res.writeHead(304)
				this.res.end()
			} else {
				fs.readFile(this.filePath, (err, data) => {
					if (!err) {
						if (contentType[this.ext]) {
							this.res.setHeader('Content-Type', contentType[this.ext])
						}
						if (this.ext !== 'js' && this.ext !== 'css') this.res.setHeader('Last-Modified', mtime.toGMTString())
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
	}
}
module.exports = { StaticHandler }
