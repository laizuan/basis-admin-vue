import system from "../models/sys/zh_CN";

export default {
  router: {
    doc: '文档',
    home: '首页',
    systemManager: '系统设置',
    userManager: '用户管理',
    roleManager: '角色管理',
    companyManager: '公司管理',
    dictManager: '字典管理',
    menuManager: '菜单管理',
    menuManagerForm: '菜单编辑',
    userForm: '编辑用户',
    login: '登入'
  },
  navbar: {
    logOut: '退出登录',
    screenfull: '全屏',
    theme: '换肤',
    laneSelect: '语言切换',
    closeAll: '关闭所有',
    closeOthers: '关闭其它'
  },
  tip: {
    input: '请输入',
    select: '请选择',
    select2: '选择',
    required: '(必填项)'
  },
  message: {
    validFailure: '数据验证不通过。已标识为红色，请修正！',
    loadingResources: '正在为您加载资源...',
    logOutTitle: '确定登出',
    deleteMsg: '您确定要删除这条数据吗?',
    loginTimeOut: '登入过期，请重新登入。'
  },
  notification: {
    successMsg: '操作成功',
    errorTitle: '错误',
    infoTitle: '温馨提示',
    warningTitle: '警告',
    successTitle: '成功'
  },
  time: {
    toDay: '今天',
    lastWeek: '最近一周',
    lastMonth: '最近一个月',
    lastThreeMonths: '最近三个月',
    placeholder: '选择时间范围'
  },
  btn: {
    save: '保存',
    display: '显示',
    hide: '隐藏',
    enable: '启用',
    disable: '禁用',
    submit: '提交',
    close: '关闭',
    cancel: '取消',
    confirm: '确定',
    refresh: '刷新',
    query: '查询',
    reset: '重置',
    create: '创建',
    'export': '导出',
    'import': '导入',
    add: '新增',
    search: '搜索',
    'delete': '删除',
    action: '操作',
    edit: '编辑',
    loginAgain: '重新登入',
    switchColumn: '隐藏/显示列',
    detail: '详情',
    list: '列表'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账户',
    password: '密码',
    errorPassword: '密码不能少于5个字符',
    errorUsername: '登入账户不能为空',
    success: '登入成功'
  },
  tagsView: {
    refresh: '刷新当前',
    close: '关闭当前',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  validate: {
    required: '当前项为必填项',
    radio: '请至少选择一项',
    range:  '不能少于{0}个字符或者大于{1}个字符',
    notZh: '字符不能为中文',
    email: '邮箱格式错误',
    mobile: '无效的手机号',
    phone: '无效的座机号码(需包含区号)',
    dawk: '无效的邮政编码',
    idCard: '无效的身份证号码',
    number: '必须为数字',
    numberLe: '必须小于等于{0}',
    numberGt: '必须大于等于{0}',
    numberMax: '只能{0}位数',
    integer: '只能为整数',
    precision: '小数位后只能保留{0}位',
    maxLength: '不能大于{0}个字符',
  },
  table: {
    SerialNumber: '序号',
    total: '合计'
  },
  title: {
    basic: '基本数据',
    authorization: '授权'
  },
  system
}
