export default {
  data() {
    return {
      pageInfo: this.$api.getPageInfo(),
      loading: true,
      height: this.$config.clientHeight - 104 - 30
    };
  },
  mounted() {
  },
  created() {
  },
  methods: {
    //改变每页行数
    doChangePageSize(pageSize) {
      this.pageInfo.pageSize = isNaN(pageSize) ? 20 : pageSize;
      this.doPage();
    },
    //改变页码
    doChangePageIndex(pageIndex) {
      this.pageInfo.pageIndex = isNaN(pageIndex) ? 0 : pageIndex;
      this.doPage();
    },
    //列表分页查询
    doPage() {
      this.loading = true;
      let timeValues = this.$refs['timePickerPro'] ?  this.$refs['timePickerPro'].timeValues : null;
      if (timeValues && timeValues.length > 1) {
        this.queryForm.startTime = timeValues[0]
        this.queryForm.endTime = timeValues[1]
      } else {
        this.queryForm.startTime = null;
        this.queryForm.endTime = null;
      }
      //页码
      let pageIndex = this.pageInfo.pageIndex,
        //每页行数
        pageSize = this.pageInfo.pageSize;
      this.queryForm[this.$config.field.pageIndex] = pageIndex;
      this.queryForm[this.$config.field.pageSize] = pageSize;
      this.$api.get(this.url.list, this.queryForm, (res) => {
        this.list = res.data[this.$config.field.list];
        this.pageInfo.total = res.data[this.$config.field.total] * 1;
        this.loading = false;
      }, () => {
        this.loading = false
      });
    },
    //查询
    doQuery() {
      //查询，分页id要复位为第一页
      this.pageInfo.pageIndex = 0;
      this.doPage();
    },
    //刷新
    doRefresh(action, contract) {
      //刷新列表
      this.doInit();
    },
    //跳转到新增页面
    toAdd(id = 0) {
      let route = {
        name: this.addRouterName,
        params: {
          id
        }
      }
      this.$router.push(route)
    },
  }
};
