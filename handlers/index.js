let handlers = {}
let files = require('fs').readdirSync('./handlers')
files.forEach(fileName => {
	if (/Handler\.js$/g.exec(fileName)) {
		fileName = fileName.replace(/\.js/, '')
		handlers[fileName.replace('Handler', '')] = require(`./${fileName}`)[fileName]
	}
})
module.exports = handlers
