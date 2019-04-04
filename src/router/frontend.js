import Layout from '@/views/layout/Layout'

const frontend = [
  {
    path: '/',
    component: Layout,
    redirect: 'noredirect',
    name: 'ComponentDemo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: []
  }

];

export default frontend;
