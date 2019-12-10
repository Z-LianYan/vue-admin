<template>
  <el-drawer
  title="添加权限菜单"
  :visible.sync="isDrawer"
  size="45%">
    <!-- <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="添加权限" center></el-page-header>
    </div> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >

      <el-form-item label="所属模块" prop="module_id">
        <el-select v-model="ruleForm.module_id" placeholder="请选择模块">
          <el-option label="顶级模块" value="0"></el-option>
          <el-option
            v-for="(item,idx) in accessMenulist"
            v-if="item.title"
            :label="item.title"
            :value="item._id"
            :key="idx"
          ></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="路径" prop="path">
        <el-input v-model="ruleForm.path"></el-input>
      </el-form-item>

      <el-form-item label="组件" prop="component">
        <el-input v-model="ruleForm.component"></el-input>
      </el-form-item>

      <el-form-item label="重定向" prop="redirect">
        <el-input v-model="ruleForm.redirect"></el-input>
      </el-form-item>

      <el-form-item label="路由名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>

      <el-form-item label="访问路径" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>

      <el-form-item label="是否隐藏" prop="hidden">
        <el-radio-group v-model="ruleForm.hidden">
          <el-radio :label="1" checked="true">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      isDrawer:false,
      ruleForm: {
        module_id: "",
        path: "",
        component: "",
        redirect: "",
        name: "",
        title: "",
        icon: "",
        hidden: 1,
        url: ""
      },
      rules: {
        module_id: [{ required: true, message: "请选择所属模块", trigger: "blur" }],
        path: [{ required: true, message: "请输入路径", trigger: "blur" }],
        component: [{ required: true, message: "请引入views下的组件", trigger: "blur" }]
      },
      accessMenulist:[]
    };
  },
  mounted() {
      this.$store.dispatch("accessMenu/list",{
        page: 1,
        limit: 20000
      }).then(res => {
        this.accessMenulist = res.data;
        console.log("resadd", res);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("accessMenu/doAdd", this.ruleForm).then(() => {
            this.resetForm("ruleForm");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open(){
      this.isDrawer = true;
    }
  }
};
</script>

<style lang="scss">
  .el-drawer__body {
    padding-right: 10px;
}
</style>
