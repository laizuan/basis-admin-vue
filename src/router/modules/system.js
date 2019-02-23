import Main from "@/components/main";

const systemRouter = {
  path: '/sys',
  component: Main,
  name: 'systemManager',
  meta: {title: '系统管理', icon: '_iconfont icon-system-manager'},
  children: [
    {
      path: 'user/list',
      component: () => import('@/view/sys/user/list'),
      name: 'userManager',
      meta: {title: '用户管理', icon: '_iconfont icon-user-manager'}
    },
    {
      path: 'user/form/:id',
      props: (route) => ({id: route.params.id}),
      component: () => import('@/view/sys/user/form'),
      name: 'userForm',
      meta: {title: '编辑用户', hideInMenu: true, notCache: false}
    },
    {
      path: 'role/list',
      component: () => import('@/view/sys/role/list'),
      name: 'roleManager',
      meta: {title: '角色管理', icon: '_iconfont icon-role-manager'}
    },
    {
      path: 'menu/list',
      component: () => import('@/view/sys/menu/list'),
      name: 'menuManager',
      meta: { title: '菜单管理', icon: '_iconfont icon-about'}
    },
    {
      path: 'dict/list',
      component: () => import('@/view/sys/dict/list'),
      name: 'dictManager',
      meta: {title: '字典管理', icon: 'ios-book'}
    },
    {
      path: 'company/list',
      component: () => import('@/view/sys/company/list'),
      name: 'companyManager',
      meta: {title: '组织机构管理', icon: '_iconfont icon-department'}
    }
  ]
}

export default systemRouter
