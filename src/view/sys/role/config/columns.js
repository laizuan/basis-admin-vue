export default {
  new(t) {
    return [
      {
        type: 'selection',
        width: 50,
        align: 'center',
        fixed: 'left'
      },
      {
        title: t.$t('system.role.column.roleName'),
        ellipsis: true,
        tooltip: true,
        key: 'roleName',
        align: 'center',
        sortable: false
      },
      {
        key: 'sortNo',
        ellipsis: true,
        tooltip: true,
        editable: false,
        width: '80px',
        align: 'center',
        title: t.$t('system.role.column.sortNo')
      },
      {
        title: t.$t('system.role.column.status'),
        ellipsis: true,
        tooltip: true,
        key: 'enable',
        width: '80px',
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
        title: t.$t('system.role.column.createTime'),
        ellipsis: true,
        tooltip: true,
        align: 'center',
        key: 'createTime'
      },
      {
        title: t.$t('system.role.column.remark'),
        ellipsis: true,
        tooltip: true,
        align: 'center',
        key: 'remark'
      },
      {
        title: t.$t('btn.action'),
        key: 'handle',
        options: ['delete'],
        align: 'center',
        fixed: 'right',
        button: [
          (h, params, vm) => {
            return h('Button', {
              props: {
                type: 'text',
                ghost: true
              },
              on: {
                'click': () => {
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
