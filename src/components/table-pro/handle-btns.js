const btns = {
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: vm.$t('message.deleteMsg')
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true,
        },
        'class': {
          'error-text-btn': true
        },
      }, vm.$t('btn.delete'))
    ])
  }
}

export default btns
