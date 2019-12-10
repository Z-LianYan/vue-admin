<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>权限管理</span>
      <el-button type="text" @click="doAdd" class="float-right">
        <i class="el-icon-plus"></i>添加权限菜单
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      border
      row-key="_id"
      style="width: 100%"
    >
      <el-table-column prop="path" label="路由"></el-table-column>
      <el-table-column prop="name" label="路由名称"></el-table-column>
      <el-table-column prop="component" label="组件"></el-table-column>
      <el-table-column prop="redirect" label="重定向"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="hidden" label="是否隐藏">
        <template slot-scope="scope">
          <img src="@/assets/images/yes.gif" v-if="scope.row.hidden==1" alt />
          <img src="@/assets/images/no.gif" v-if="scope.row.hidden==0" alt />
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
    <menu-add ref="menu_add"/>
  </el-card>
</template>

<script>
import MenuAdd from './add'
export default {
  name: "accessMenu",
  components:{
    MenuAdd
  },
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
      this.$refs.menu_add.open();
      // this.$router.push({ path: "/system/accessMenu/add" });
    },
    getData() {
      this.loading = true;
      this.$store.dispatch("accessMenu/list",this.fetchOptions).then(res => {
        this.tableData = res.data;
        this.total = res.count;
        this.loading = false;
        console.log("res", res);
      });
    },
    doEdit(rows) {
      console.log("rows---",rows);
      this.$router.push({ path: "/system/accessMenu/edit/" + rows._id });
    },
    doDelete(rows) {
      const { _id } = rows;
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("accessMenu/doDel", { _id: rows._id })
            .then(() => {
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
