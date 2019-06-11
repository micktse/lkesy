const http = require('http')
const https = require('https')
const config = require('./config')
const { Dynamic, Static, Api, Lob } = require('./handlers')
process.sessionContext = new Array()
const handler = (req, res) => {
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
	res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE,OPTIONS')
	//拦截器配置
	require('./api/interceptor').invoke(req, res)
	let [url] = req.url.split('?')
	let handlers = [
		[
			/^\/$/,
			function() {
				this.invoke = () => {
					res.writeHead(301, { Location: `/${config.home_url}` })
					res.end()
				}
			}
		],
		[/\.api$/, Api],
		[/\.html?$/, Dynamic],
		[/\.cms$/, Dynamic],
		[/\/files\//, Lob],
		[/.*/, Static]
	]
	let Handler = handlers.filter(h => h[0].test(url))[0][1]
	new Handler(req, res).invoke()
}
http
	.createServer((req, res) => {
		if (process.HTTPS_SERVER_STARTED) {
			let host = req.headers.host.split(':')[0]
			res.writeHead(301, {
				Location: `https://${host}:${config.https_port}${req.url}`
			})
			res.end()
		} else {
			handler(req, res)
		}
	})
	.listen(config.http_port)
console.info(`Http服务启动，端口：${config.http_port}`)
if (!config.development && !config.debug && config.https_key && config.https_cert) {
	if (fs.existsSync(config.https_key)) {
		if (fs.existsSync(config.https_cert)) {
			let options = {
				key: fs.readFileSync(config.https_key),
				cert: fs.readFileSync(config.https_cert)
			}
			https
				.createServer(options, (req, res) => {
					handler(req, res)
				})
				.listen(config.https_port)
			console.info(`Https服务启动，端口：${config.https_port}`)
			console.info(`所有请求将被重定向到安全网址`)
			process.HTTPS_SERVER_STARTED = true
		} else {
			console.error('服务器启动错误', '没有找到SSL证书')
		}
	} else {
		console.error('服务器启动错误', '没有找到SSL密钥')
	}
}
