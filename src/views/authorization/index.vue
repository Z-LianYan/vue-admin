<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>角色授权</span>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
      <el-tab-pane 
      v-for="(item,idx) in roleData" 
      :key="idx" 
      :label="item.title" 
      :name="item._id.toString()" />
    </el-tabs>



  </el-card>
</template>

<script>
export default {
  name: "authorization",
  data() {
    return {
      activeName: '',
      roleData: []
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    getData() {
      const { _id } = this.$route.query;
      this.activeName = _id;
      this.$store.dispatch("role/list").then(res => {
        this.roleData = res;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
