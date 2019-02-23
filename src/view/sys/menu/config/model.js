import constants from '@/libs/constants'
export default {
  new() {
    return {
      menuName: null,
      visible: {
        'value': constants.VisibleStateEnum.VISIBLE
      },
      menuType: {
        value: constants.MenuTypeEnum.MENU
      },
      parentName: null,
      parentId: null,
      icon: null,
      url: null,
      sortNo: null,
      permission: null,
      enable: {
        value: constants.EnableEnum.ENABLE
      }
    }
  }
}
