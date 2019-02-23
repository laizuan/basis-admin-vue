export default {
  /**
   * @description 配置业务字段
   */
  field: {
    list: 'records',
    pageIndex: 'current',
    pageSize: 'size',
    total: 'total',
    code: {
      success: 200, // 操作成功
      unauthorized: 401, //没有登入
      forbidden: 403, // 没有权限
      internalServerError: 500 //服务器内部错误
    }
  },

  /**
   * 初始化可视化高度。
   * 窗口大小改变的时候需要刷新整个页面才能更新这个高度
   */
  clientHeight: document.documentElement.clientHeight || document.body.clientHeight,


  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'Basis-admin',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '/api',
    pro: 'https://produce.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {

  }
}
