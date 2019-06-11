let models = {}
let files = require('fs').readdirSync('./api/models')
files.forEach(fileName => {
	if (/Model\.js$/g.exec(fileName)) {
		fileName = fileName.replace(/\.js/, '')
		models[fileName.replace('Model', '')] = require(`./${fileName}`)[fileName]
	}
})

module.exports = models
