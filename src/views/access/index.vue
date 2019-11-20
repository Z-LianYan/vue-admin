<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>权限列表</span>
      <el-button type="text" @click="doAdd" class="float-right">
        <i class="el-icon-plus"></i>添加权限
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      row-key="_id"
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column prop="module_name" label="模块名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type==1? '模块':(scope.row.type==2? "菜单":"操作")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="action_name" label="操作名称"></el-table-column>

      <el-table-column prop="url" label="操作地址"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <img src="@/assets/images/yes.gif" v-if="scope.row.status==1" alt />
          <img src="@/assets/images/no.gif" v-if="scope.row.status==0" alt />
        </template>
      </el-table-column>

      <el-table-column prop="description" label="描述"></el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doEdit(scope.row)">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button type="text" size="small" @click="doDelete(scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <br />
    <el-row>
      <mine-pagination
        :total="total"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :pageSize="fetchOptions.limit"
        :currentPage="fetchOptions.page"
      />
    </el-row>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "access",
  data() {
    return {
      loading: false,
      tableData: [],
      fetchOptions: {
        page: 1,
        limit: 20
      },
      total: 0
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    doAdd() {
      this.$router.push({ path: "/system/access/add" });
    },
    getData() {
      this.loading = true;
      this.$store.dispatch("access/list", this.fetchOptions).then(res => {
        this.tableData = res.data;
        this.total = res.count;
        console.log("res", res);
        this.loading = false;
      });
    },
    doEdit(rows) {
      this.$router.push({ path: "/system/access/edit/" + rows._id });
    },
    doDelete(rows) {
      const { _id, module_id } = rows;
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("access/doDel", { _id, module_id }).then(() => {
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
    setAccredit() {},

    handleSizeChange(limit) {
      this.fetchOptions.limit = limit;
      this.getData();
    },

    handleCurrentChange(page) {
      this.fetchOptions.page = page;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
