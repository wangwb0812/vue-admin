import router from './router'
import store from './store'

//无需权限页面
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
	const hasLogin = store.getters.userInfo
	if(hasLogin) {
		const hasMenuList = store.getters.menuList && store.getters.menuList.length > 0
		if (hasMenuList) {
			next()
		} else {
			try {
			  await store.dispatch('user/setMenuList')
				next()
			} catch(e) {
				next('/login')
			}
		}
		
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
		}
	}
})