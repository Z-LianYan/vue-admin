<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){}
}
</script>

<style lang="scss">
/*去掉打开抽屉时自动选中标题时的蓝色边框*/
.el-drawer__header span:focus {
  outline: 0;
}
</style>
