export default {
  new(t) {
    return [
      {
        title: t.$t('system.menu.column.resourceName'),
        key: 'menuName',
        width: '100px',
        template: 'menuName',
        type: 'template',
        headerAlign: 'center',
      },
      {
        title: t.$t('system.menu.column.icon'),
        key: 'icon',
        width: '40px',
        template: 'icon',
        type: 'template',
        headerAlign: 'center',
        align: 'center'
      },
      {
        title: t.$t('system.menu.column.permission'),
        key: 'permission',
        width: '100px',
        headerAlign: 'center',
        align: 'center'
      },
      {
        title: t.$t('system.menu.column.type'),
        width: '80px',
        template: 'menuType',
        type: 'template',
        headerAlign: 'center',
        align: 'center'
      },
      {
        title: t.$t('btn.action'),
        key: 'action',
        width: '100px',
        template: 'action',
        type: 'template',
        headerAlign: 'center',
        align: 'center'
      }
    ]
  }
}
