const session = require('../../session')
class MainAction {
	get({}, req, res) {
		let user = session.valid(req, res)
		if (user) {
			return { userName: user.userName }
		} else {
			return { userName: '' }
		}
	}
	post({}, req, res) {
		let menu = [
			['&#xe61b;', '站点数据', 'Dashboard', 'dashboard.cms', 'user admin'],
			['&#xe7e5;', '栏目组设置', 'Column groups', 'groups.cms', 'admin'],
			['&#xe625;', '栏目设置', 'Columns', 'columns.cms', 'admin'],
			['&#xe602;', '文案编辑', 'Article Editor', 'article.cms', 'user admin'],
			['&#xe68b;', '文案列表', 'Articles', 'articles.cms', 'user admin'],
			['&#xe64d;', '留言板', 'Messages', 'messages.cms', 'user admin'],
			['&#xe603;', '搜索引擎优化', 'SEO', 'seo.cms', 'admin'],
			['&#xe611;', '用户管理', 'Users', 'users.cms', 'admin'],
			['&#xe601;', '基本信息', 'Basic information', 'basic.cms', 'user admin']
		]
		let { role } = session.valid(req, res)
		return menu.filter(m => m[4].indexOf(role) > -1)
	}
}
module.exports = { MainAction }
