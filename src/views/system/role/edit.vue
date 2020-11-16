<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="添加管理员" center></el-page-header>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="管理员名称" prop="title" required>
        <el-input v-model="ruleForm.title" style="width:300px;"></el-input>
      </el-form-item>
      
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="0" checked="true">操作</el-radio>
          <el-radio :label="1">游客</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1" checked="true">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" style="width:300px;"></el-input>
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
        title: "",
        description: "",
        status: 1,
        type:1//1只能预览
      },
      rules: {
        title: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getSingleRoleData();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("role/doEdit", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getSingleRoleData() {
      const { id } = this.$route.params;
      this.$store.dispatch("role/getSingleData", { _id: id }).then(data => {
        this.ruleForm = data;
      });
    },
    goBack() {
      history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
