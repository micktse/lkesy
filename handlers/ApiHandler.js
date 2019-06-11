const actions = require('../api/actions')
const contentType = require('../content-type')
/**
 * 接口处理程序
 * @author Mick
 */
class ApiHandler {
	/**
	 * 构造函数
	 * @params  req http请求对象
	 *          res http响应对象
	 */
	constructor(req, res) {
		this.req = req
		this.res = res
		this.query = new Object()
		let [url, query] = req.url.split('?')
		if (query) {
			query.split('&').forEach(q => {
				let [key, value] = q.split('=')
				this.query[key] = decodeURIComponent(value.replace(/\+/g, '%20'))
			})
		}
		this.action = url.substr(1).replace(/\.api/, '')
		if (this.action.indexOf('/') > -1) {
			this.action = this.action.substr(this.action.lastIndexOf('/'))
		}
	}
	/**
	 * 处理接口逻辑
	 */
	invoke() {
		if (actions[this.action] && actions[this.action].prototype[this.req.method.toLowerCase()]) {
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
				let result = new actions[this.action]()[this.req.method.toLowerCase()](this.query, this.req, this.res)
				if (result && typeof result === 'object') {
					this.res.setHeader('Content-Type', contentType.json)
					this.res.writeHead(200)
					this.res.write(JSON.stringify(result))
					this.res.end()
				} else {
					this.res.writeHead(500)
					this.res.end()
				}
			})
		} else {
			this.res.writeHead(404)
			this.res.end()
		}
	}
}
module.exports = { ApiHandler }
