import Layout from '@/views/backend/layout/Layout'

const backend = {
  path: '/admin',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: []
};

export default backend;
