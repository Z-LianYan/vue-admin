<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>管理员列表</span>
      <el-button type="text" @click="doAdd" class="float-right">添加管理员</el-button>
    </div>

    <el-table 
    v-loading="loading" 
    :data="tableData" 
    highlight-current-row 
    border 
    style="width: 100%">
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

    <br>
    <el-row>
      <el-pagination
        style="text-align:center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="fetchOptions.page"
        :page-sizes="limitOptions"
        :page-size="fetchOptions.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

    </el-row>


  </el-card>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "manager",
  data() {
    return {
      loading: false,
      tableData: [],
      fetchOptions: {
        page: 1,
        limit: 20
      },
      limitOptions: [20, 30, 50, 100],
      total: 0,
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    doAdd() {
      this.$router.push({ path: "/system/manager/add" });
    },
    getData() {
      this.loading = true;
      this.$store.dispatch("manager/list", this.fetchOptions).then(res => {
        this.tableData = res.data;
        this.total = res.count;
        console.log("res", res);
        this.loading = false;
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
    },

    handleSizeChange(limit) {
      console.log("size")
      this.fetchOptions.limit = limit;
      this.getData();
    },

    handleCurrentChange(page) {
      console.log("Current")
      this.fetchOptions.page = page;
      this.getData();
    }

  }
};
</script>

<style lang="scss" scoped>
</style>
