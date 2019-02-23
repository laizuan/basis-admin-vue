export default {
  new(t) {
    return {
      organization: [
        {required: true, message: t.$t('validate.required'), trigger: 'blur'}
      ],
      code: [
        {required: true, message: t.$t('validate.required'), trigger: 'blur'}
      ],
      principal: [
        {required: true, message: t.$t('validate.required'), trigger: 'blur'}
      ],
      sortNo: [
        {required: true, message: t.$t('validate.required'), trigger: 'blur'}
      ],
      telephone: [ {required: true,  trigger: 'blur',
          validator: function (rule, value, callback) {
            if (value) {
              if ((value)) {
                callback()
              } else {
                callback(new Error('联系方式错误'))
              }
            } else {
              callback(new Error(t.$t('validate.required')))
            }
          }
        }
      ]
    }
  }
}
