let development = /^supervisor/.test(process.env.npm_lifecycle_script)
let debug = !process.env.npm_lifecycle_script || /--inspect-brk/.test(process.env.npm_lifecycle_script)
console.info(development ? '开发模式' : debug ? '调试模式' : '生产模式')
module.exports = {
	http_port: development || debug ? 2020 : 2020,
	https_port: 443,
	development,
	debug,
	https_key: undefined,
	https_cert: undefined,
	host_name: 'www.sureking.cn',
	sign_in_url: 'login.html',
	main_url: '',
	home_url: 'index.html',
	session_expire_minutes: 20,
	dirname: __dirname,
	db_name: 'lkesy'
}
