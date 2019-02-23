<template>
  <div id="app">
    <router-view/>
    <div id="basis-loading"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
  #basis-loading {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    height: 100%;
  }
</style>
