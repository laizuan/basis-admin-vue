import user from '../../store/module/user'

export default {
  inserted(el, binding, vnode) {
    const {value} = binding
    const roles = user.state.access || []

    if (value) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need access! Like v-permission="['admin','editor']"`)
    }
  }
}
