export default  {
  url() {
   return {
     list: 'user/list',
     login: 'login',
     logout: 'logout',
     unread: 'user/unread',
     getLoginInfo: 'user/get/loginUserInfo'
   }
  },
  permission: {
    add: 'sys:user:add',
    update: 'sys:user:update',
    delete: 'sys:user:delete'
  }
}
