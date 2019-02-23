import rules from '../../../../libs/rules'


export default {
  new(t) {
    return {
      'menu.menuName': [rules.required()],
      'menu.visible': [rules.required(t.$t('validate.radio'))],
      'menu.menuType': [rules.required(t.$t('validate.radio'))],
      //'menu.url': [rules.required()],
      'menu.sortNo': [rules.required()],
      'menu.enable': [rules.required(t.$t('validate.radio'))]
    }
  }
}
