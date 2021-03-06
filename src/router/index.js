import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import user from './modules/user'
import system from './modules/system'
Vue.use(VueRouter)

const constantRoutes = [{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login')
	},
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		children: [{
			path: 'home',
			name: 'Home',
			component: () => import('@/views/Home'),
			meta: {
				title: '首页'
			}
		}]
	},
	user,
	system
]

export const asyncRoutes = [
	user
]

const router = new VueRouter({
	routes: constantRoutes
})

export default router
