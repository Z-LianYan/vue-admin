<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>管理员列表</span>
      <el-button type="text" @click="doAdd" class="float-right">添加管理员</el-button>
    </div>

    <el-table :data="tableData" highlight-current-row border style="width: 100%">
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role_id" label="角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <img src="@/assets/images/yes.gif" v-if="scope.row.status==1" alt>
          <img src="@/assets/images/no.gif" v-if="scope.row.status==0" alt>
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="添加时间">
        <template slot-scope="scope">{{scope.row.add_time|formatDate}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doEdit(scope.row)">编辑</el-button>
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
    doAdd(){
      this.$router.push({path:"/system/manager/add"})
    },
    getData() {
      this.$store.dispatch("manager/list").then(res => {
        this.tableData = res;
        console.log("res", res);
      });
    },
    doEdit(rows) {
      this.$router.push({ path: "/system/manager/edit/" + rows._id });
    },
    doDelete(rows) {
      const { _id } = rows;
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("manager/doDelete", { _id }).then(() => {
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
