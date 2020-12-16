import Layout from '@/views/Layout'

const user = {
  path: '/user',
  name: 'User',
  component: Layout,
  children: [{
    path: 'info',
    name: 'UserInfo',
    component: () => import('@/views/User/Info'),
    meta: {
      title: '基础信息',
      menuIcon: 'el-icon-setting'
    }
  },
  {
    path: 'resetPsd',
    name: 'UserResetPsd',
    component: () => import('@/views/User/ResetPsd'),
    meta: {
      title: '修改密码',
      menuIcon: 'el-icon-setting'
    }
  },
  {
    path: 'permission',
    name: 'UserPermission',
    component: () => import('@/views/User/Permission'),
    meta: {
      title: '页面权限',
      menuIcon: 'el-icon-s-tools'
    }
  }
  ]
}

export default user