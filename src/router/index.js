import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component:  () => import('@/views/Login')
  },
	{
	  path: '/',
	  name: 'Layout',
	  component: Layout,
		children: [
			{
				path: 'home',
				name: 'Home',
				component:  () => import('@/views/Home')
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
