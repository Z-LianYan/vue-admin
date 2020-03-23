<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>管理员列表</span>
      <el-button type="text" @click="getData" class="float-right">
        <i class="el-icon-refresh"></i>刷新
      </el-button>
    </div>

    <el-form label-width="90px">
      <el-form-item label="关键字搜索" style="display:inline-block">
        <el-input
          v-model="fetchOptions.keywords"
          style="width:200px;"
          @keyup.enter.native="getData()"
          placeholder="请输入关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间" style="display:inline-block">
        <el-date-picker
          @change="getData()"
          v-model="fetchOptions.start_time"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" style="display:inline-block">
        <el-date-picker
          @change="getData()"
          v-model="fetchOptions.end_time"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="getData">筛选</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="title" label="角色"></el-table-column>
      <el-table-column prop="img_head" label="头像">
        <template slot-scope="scope">
          <el-image 
            v-if="scope.row.img_head"
            style="width: 100px; height: 100px"
            :src="scope.row.img_head" 
            :preview-src-list="[scope.row.img_head]">
          </el-image> 
        </template>
      </el-table-column>
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
          <el-button type="text" size="small" @click="doEdit(scope.row)">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button type="text" size="small" @click="doDelete(scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
      
    </el-table>

    <br>
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
export default {
  name: "manager",
  data() {
    return {
      loading: false,
      tableData: [],
      fetchOptions: {
        page: 1,
        limit: 20,
        keywords: "",
        start_time: "",
        end_time: ""
      },
      total: 0,
      currentView:""
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      this.$store.dispatch("manager/list", this.fetchOptions).then(res => {
        this.tableData = res.data;
        this.total = res.count;
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
      console.log("limit", limit);
      this.fetchOptions.limit = limit;
      this.getData();
    },

    handleCurrentChange(page) {
      console.log("page", page);
      this.fetchOptions.page = page;
      this.getData();
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.name == "ManagerAdd" || to.name == "ManagerEdit"){
      this.$route.meta.keep_alive = true;
    }else{
      this.$route.meta.keep_alive = false;
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>
