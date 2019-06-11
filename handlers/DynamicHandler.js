const fs = require('fs')
const actions = require('../api/actions')
const config = require('../config')
const contentType = require('../content-type')
const session = require('../session')
/**
 * 动态页面处理程序
 * @author Mick
 */
class DynamicHandler {
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
				if (value) this.query[key] = decodeURIComponent(value.replace(/\+/g, '%20'))
			})
		}
		if (/\.html?$/.test(url)) {
			this.dirname = `${config.dirname}/pages`
			this.pagePath = `${this.dirname}${url}`
			this.action = url.substr(1).replace(/\.html?$/, '')
			this.redirect = false
		} else if (/\.cms$/.test(url)) {
			this.dirname = `${config.dirname}/settings`
			this.pagePath = `${this.dirname}${url}`.replace(/\.cms$/, '.html')
			this.action = url.substr(1).replace(/\.cms$/, '')
			this.redirect = !session.valid(req, res)
		}
		if (this.action && this.action.indexOf('/') > -1) {
			this.action = this.action.substr(this.action.lastIndexOf('/'))
		}
		this.pageExist = fs.existsSync(this.pagePath)
	}
	/**
	 * 动态页面适配器
	 * @param {*} attributes
	 */
	adapter(attributes) {
		fs.readFile(this.pagePath, (err, data) => {
			if (!err) {
				let page = data.toString('utf-8')
				let pattern = /<!--include "\S*\.\S*"\s*-->/g
				let result
				let include = []
				do {
					result = pattern.exec(page)
					if (result != null) {
						include.push(result.toString())
					}
				} while (result != null)
				include.forEach(inc => {
					let incPage = /"\S*.\S*"/.exec(inc)
					if (incPage) {
						incPage = incPage.toString().replace(/"/g, '')
						incPage = `${this.dirname}/${incPage}`
						if (fs.existsSync(incPage)) {
							let incData = fs.readFileSync(incPage).toString('utf-8')
							page = page.replace(inc, incData)
						}
					}
				})
				if (attributes) {
					Object.keys(attributes).forEach(attribute => {
						page = page.replace(new RegExp(`\\$\\{${attribute}\\}`, 'g'), attributes[attribute])
					})
				}
				page = page.replace(/\$\{\S*\}/g, '')
				this.res.writeHead(200, { 'Content-Type': contentType.html })
				this.res.write(Buffer.from(page, 'utf-8'), 'binary')
				this.res.end()
			} else {
				this.res.writeHead(500)
				this.res.end()
			}
		})
	}
	/**
	 * 执行动态页面加载并响应请求
	 */
	invoke() {
		//是否重定向到登录页
		if (this.redirect) {
			this.res.writeHead(302, { Location: config.sign_in_url })
			this.res.end()
		} else {
			//是否存在资源页面
			if (this.pageExist) {
				let attributes
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
						attributes = new actions[this.action]()[this.req.method.toLowerCase()](this.query, this.req, this.res)
						this.adapter(attributes)
					})
				} else {
					this.adapter()
				}
			} else {
				this.res.writeHead(404)
				this.res.end()
			}
		}
	}
}
module.exports = { DynamicHandler }
