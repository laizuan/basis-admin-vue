const btns = {
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        transfer: true,
        title: vm.$t('message.deleteMsg')
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
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
