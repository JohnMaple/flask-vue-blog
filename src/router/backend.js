import Layout from '@/views/backend/layout/Layout'

export const backend = [{
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/backend/dashboard/Dashboard'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true,
        affix: true,
        admin: true,
      }
    }],
  },
  {
    path: '/admin/login',
    component: () => import('@/views/backend/login/Login'),
    hidden: true,
    meta: {
      admin: true
    }
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
]

export const asyncBackend = {

}