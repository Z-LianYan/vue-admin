<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>角色列表</span>
      <!-- <el-button type="text" @click="doAdd" class="float-right">
        <i class="el-icon-plus"></i>添加角色
      </el-button> -->
    </div>
    <el-table :data="tableData" highlight-current-row border style="width: 100%">
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

      <el-table-column prop="add_time" label="类型">
        <template slot-scope="scope">
          {{scope.row.type==1?'游客':'操作'}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="setAccredit(scope.row)">授权</el-button>
          <el-button type="text" size="small" @click="doEdit(scope.row)">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button type="text" size="small" @click="doDelete(scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "role",
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
    // doAdd() {
    //   this.$router.push({ path: "/system/role/add" });
    // },
    getData() {
      this.$store.dispatch("role/list").then(res => {
        this.tableData = res;
      });
    },
    doEdit(rows) {
      this.$router.push({ path: "/system/role/edit/" + rows._id });
    },
    doDelete(rows) {
      const { _id } = rows;
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("role/doDel", { _id: rows._id }).then(() => {
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
    setAccredit(rows) {
      const { _id } = rows;
      this.$router.push({ path: "/system/authorization", query: { _id } });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
