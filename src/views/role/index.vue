<template>
  <el-card class="box-card">
    <div>管理员列表</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <img src="@/assets/images/yes.gif" v-if="scope.row.status==1" alt />
          <img src="@/assets/images/no.gif" v-if="scope.row.status==0" alt />
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="添加时间">
        <template slot-scope="scope">{{scope.row.add_time|formatDate}}</template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doEdit(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="doDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
import dayjs from "dayjs";
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
  watch: {},
  methods: {
    getData() {
      this.$store.dispatch("role/list").then(res => {
        this.tableData = res;
        console.log("res", res);
      });
    },
    doEdit(rows) {
      this.$router.push({ path: "/system/manager/edit/" + rows._id });
    },
    doDelete(rows){
      this.$store.dispatch("manager/doDelete",{_id:rows._id}).then(()=>{
        this.getData();
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
