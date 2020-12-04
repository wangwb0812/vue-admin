import router from './router'
import store from './store'

//无需权限页面
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
	const hasLogin = store.getters.userInfo
	if(hasLogin) {
		next()
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
		}
	}
})