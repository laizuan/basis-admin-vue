export default {
  data() {
    return {

    };
  },
  mounted() {
  },
  created() {
  },
  methods: {
    fromValidate(name, success) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          success();
        } else {
          this.$Notice.error({
            title: this.$t('notification.errorTitle'),
            desc: this.$t('message.validFailure'),
            duration: 5
          });
        }
      })
    },
    doReset(name) {
      this.$refs[name].resetFields();
    },
    idIsNull(id) {
      return !id || id === undefined || id === null || id === 0;
    }
  }
};
