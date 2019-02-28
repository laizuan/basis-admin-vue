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
    doReset(name) {
      this.$refs[name].resetFields();
    },
    idIsNull(id) {
      return !id || id === undefined || id === null || id === 0;
    }
  }
};
