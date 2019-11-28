<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="添加权限" center></el-page-header>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
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

      <!-- <el-form-item label="模块" prop="children">
        <el-input v-model="ruleForm.children"></el-input>
      </el-form-item> -->

      <el-form-item label="所属模块" prop="children">
        <el-select v-model="ruleForm.child" placeholder="请选择模块">
          <el-option label="顶级模块" value="0"></el-option>
          <el-option
            v-for="(item,idx) in accessMenulist"
            :label="item.title"
            :value="item._id"
            :key="idx"
          ></el-option>
        </el-select>
      </el-form-item>



      <!-- <el-form-item label="路径" prop="children">
        <el-input v-model="ruleForm.children"></el-input>
      </el-form-item> -->

      <el-form-item label="完整路径" prop="url">
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
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        path: "",
        component: "",
        redirect: "",
        name: "",
        title: "",
        icon: "",
        children: "",
        hidden: 1,
        url: ""
      },
      rules: {
        // title: [{ required: true, message: "请输入角色名称", trigger: "blur" },]
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
        console.log("res", res);
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
    goBack() {
      history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
