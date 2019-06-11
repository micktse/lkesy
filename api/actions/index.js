let actions = {}
let files = require('fs').readdirSync('./api/actions')
files.forEach(fileName => {
	if (/Action\.js$/g.exec(fileName)) {
		fileName = fileName.replace(/\.js/, '')
		actions[fileName.replace(/Action/g, '').toLowerCase()] = require(`./${fileName}`)[fileName]
	}
})

module.exports = actions
