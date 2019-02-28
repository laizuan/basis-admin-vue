import system from "../models/sys/zh_TW";

export default {
  router: {
    doc: '文檔',
    home: '首頁',
    systemManager: '系統設置',
    userManager: '用戶管理',
    roleManager: '角色管理',
    companyManager: '公司管理',
    dictManager: '字典管理',
    menuManager: '菜單管理',
    menuManagerForm: '菜單編輯',
    userForm: '編輯用戶',
    login: '登入'
  },
  navbar: {
    logOut: '退出登錄',
    screenfull: '全屏',
    theme: '換膚',
    laneSelect: '語言切換',
    closeAll: '關閉所有',
    closeOthers: '關閉其它'
  },
  tip: {
    input: '請輸入',
    select: '請選擇',
    select2: '選擇',
    required: '(必填項)'
  },
  message: {
    validFailure: '數據驗證不通過。已標識為紅色，請修正！ ',
    loadingResources: '正在為您加載資源...',
    logOutTitle: '確定登出',
    deleteMsg: '您確定要刪除這條數據嗎?',
    loginTimeOut:'登錄已過期，請再次登錄。'
  },
  notification: {
    successMsg: '操作成功',
    errorTitle: '錯誤',
    infoTitle: '溫馨提示',
    warningTitle: '警告',
    successTitle: '成功'
  },
  time: {
    toDay: '今天',
    lastWeek: '最近一周',
    lastMonth: '最近一個月',
    lastThreeMonths: '最近三個月',
    placeholder: '選擇時間範圍'
  },
  btn: {
    save: '保存',
    display: '顯示',
    hide: '隱藏',
    enable: '啟用',
    disable: '禁用',
    submit: '提交',
    close: '關閉',
    cancel: '取消',
    confirm: '確定',
    refresh: '刷新',
    query: '查詢',
    reset: '重置',
    create: '創建',
    'export': '導出',
    'import': '導入',
    add: '新增',
    search: '搜索',
    'delete': '刪除',
    action: '操作',
    edit: '編輯',
    loginAgain: '重新登入',
    switchColumn: '隱藏/顯示列',
    detail: '詳情',
    list: '列表'
  },
  login: {
    title: '系統登錄',
    logIn: '登錄',
    username: '賬戶',
    password: '密碼',
    errorPassword: '密碼不能少於5個字符',
    errorUsername: '登入賬戶不能為空',
    success: '登入成功'
  },
  tagsView: {
    refresh: '刷新當前',
    close: '關閉當前',
    closeOthers: '關閉其它',
    closeAll: '關閉所有'
  },
  validate: {
    required: '當前項為必填項',
    radio: '請至少選擇一項',
    range: '不能少於{0}個字符或者大於{1}個字符',
    notZh: '字符不能為中文',
    email: '郵箱格式錯誤',
    mobile: '無效的手機號',
    phone: '無效的座機號碼(需包含區號)',
    dawk: '無效的郵政編碼',
    idCard: '無效的身份證號碼',
    number: '必須為數字',
    numberLe: '必須小於等於{0}',
    numberGt: '必須大於等於{0}',
    numberMax: '只能{0}位數',
    integer: '只能為整數',
    precision: '小數位後只能保留{0}位',
    maxLength: '不能大於{0}個字符',
  },
  table: {
    SerialNumber: '序號',
    total: '合計'
  },
  title: {
    basic: '基本數據',
    authorization: '授權'
  },
  system
}
