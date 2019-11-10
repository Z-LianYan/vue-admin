<template>
  <el-card class="box-card">
    <div>编辑</div>
    
  </el-card>
</template>

<script>
export default {
  name: "manager",
  data() {
    return {
      tableData: []
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  watch: {
  },
  methods: {
    getData() {
      this.$store.dispatch("manager/list").then(res => {
        this.tableData = res;
        console.log("res", res);
      });
    },
    doEdit(rows){

    }
  }
};
</script>

<style lang="scss" scoped>
</style>
