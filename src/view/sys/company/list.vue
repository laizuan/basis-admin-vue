<template>
  <div class="app-container" v-loading="loading">

  </div>
</template>


<script>
  import rules from './config/rules'
  export default {
    name: "sys-company-list",
    watch: {

    },
    data() {
      return {
        rules: rules.new(this),
        url: {
          addOrUpdate: '',
          'delete': 'sys/org/delete',
          list: 'sys/org/list'
        },
        loading: true,
      }
    },
    mounted() {
    },
    methods: {

    }
  }
</script>

<style scoped >

</style>
