import url from '@/libs/url/sys/user'
export default {
  new(t) {
    let permission = url.permission
    let deletePermission = t.$api.hasPermisson(permission.delete)
    return [
      {
        type: 'selection',
        width: 50,
        align: 'center'
      },
      {
        title: t.$t('system.user.column.account'),
        ellipsis: true,
        tooltip: true,
        key: 'account',
        align: 'center',
        sortable: false
      },
      {
        key: 'userName',
        ellipsis: true,
        tooltip: true,
        editable: true,
        align: 'center',
        title: t.$t('system.user.column.username')
      },
      {
        title: t.$t('system.user.column.status'),
        ellipsis: true,
        tooltip: true,
        key: 'enable',
        align: 'center',
        render(h, row) {
          return h('Tag',{
            props:{
              type: 'dot',
              color: row.row.enable.value === 1 ? 'success' : 'error'
            }
          }, row.row.enable.desc)
        }
      },
      {
        title: t.$t('system.user.column.userType'),
        ellipsis: true,
        tooltip: true,
        key: 'userType',
        align: 'center',
        render(h, row) {
          return h('span', row.row.userType.desc)
        }
      },
      {
        title: t.$t('system.user.column.createTime'),
        ellipsis: true,
        tooltip: true,
        align: 'center',
        key: 'createTime'
      },
      {
        title: t.$t('btn.action'),
        key: 'handle',
        align: 'center',
        options: [(deletePermission ? 'delete': null)],
        button: [
          (h, params, vm) => {
            return h('Button', {
              props: {
                type: 'text',
                ghost: true
              },
              on: {
                'on-ok': () => {
                  vm.$emit('to-edit', params)
                }
              }
            }, vm.$t('btn.detail'))
          }
        ]
      }
    ]
  }
}
/*
*/
