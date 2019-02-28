import system from "../models/sys/en_US";

export default {
  router: {
    doc: 'Document',
    home: 'Home',
    systemManager: 'System setting',
    userManager: 'User manager',
    roleManager: 'Role manager',
    companyManager: 'Company manager',
    dictManager: 'Dict manager',
    menuManager: 'Menu manager',
    menuManagerForm: 'Menu edit',
    userForm: 'Edit user',
    login: 'Login'
  },
  navbar: {
    logOut: 'Log out',
    screenfull: 'Screenfull',
    theme: 'Theme',
    laneSelect: 'Language Switch',
    closeAll: 'Close All',
    closeOthers: 'Close Others'
  },
  tip: {
    input: 'please enter ',
    select: 'please choose ',
    select2: 'choose ',
    required: '(required)'
  },
  message: {
    validFailure: 'Data verification failed. It has been marked as red, please correct it!',
    loadingResources: 'Loading resources for you...',
    logOutTitle: 'Determine the appropriate',
    deleteMsg: 'Are you sure you want to delete this data?',
    loginTimeOut: 'Login expired, please log in again. '
  },
  notification: {
    successMsg: 'Successful operation',
    errorTitle: 'Error',
    infoTitle: 'Warm prompt',
    warningTitle: 'Warning',
    successTitle: 'Success'
  },
  time: {
    toDay: 'Today',
    lastWeek: 'Last week',
    lastMonth: 'last month',
    lastThreeMonths: 'Last three months',
    placeholder: 'Select time range'
  },
  btn: {
    save: 'Save',
    display: 'display',
    hide: 'Hide',
    enable: 'Enable',
    disable: 'Disable',
    submit: 'Submit',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    refresh: 'Refresh',
    query: 'Query',
    search: 'Search',
    reset: 'Reset',
    create: 'Create',
    export: 'Export',
    import: 'Import',
    add: 'Add',
    edit: 'Edit',
    'delete': 'Delete',
    action: 'Action bar',
    loginAgain: 'Login again',
    switchColumn: 'Hide/Show Columns',
    detail: 'Detail',
    list: 'List'
  },
  login: {
    title: 'Welcome login',
    logIn: 'Sign in',
    username: 'Account',
    password: 'Password',
    errorPassword: 'The password must be no less than 5 characters',
    errorUsername: 'The login account cannot be empty',
    success: 'sign in suceesfully'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close others',
    closeAll: 'Close all'
  },
  validate: {
    required: 'The current item is mandatory',
    radio: 'Please select at least one',
    range: 'Not less than {0} characters or greater than {1} characters',
    notZh: 'Character cannot be Chinese',
    email: 'Mailbox format error',
    mobile: 'Invalid phone number',
    phone: 'Invalid landline number with area code',
    dawk: 'Invalid zip code',
    idCard: 'Invalid idCard number',
    number: 'Must be a number',
    numberLe: 'Must be less than or equal to {0}',
    numberGt: 'Must be greater than or equal to {0}',
    numberMax: 'Only {0} digits',
    integer: 'Can only be an integer',
    precision: 'Can only retain {0} bits after decimal place',
    maxLength: 'Cannot be greater than {0} characters',
  },
  common: {
    SerialNumber: 'Serial Number',
    total: 'Total'
  },
  title: {
    basic: 'Basic Data',
    authorization: 'Authorization'
  },
  system
}
