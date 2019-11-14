<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="添加权限" center></el-page-header>
    </div>

    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >

      <el-form-item label="节点类型" prop="type">
        <el-select @change="selectChangeType" v-model="ruleForm.type" placeholder="请选择类型">
          <el-option label="模块" :value="1"></el-option>
          <el-option label="菜单" :value="2"></el-option>
          <el-option label="操作" :value="3"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="模块名称" prop="username">
        <el-input v-model="ruleForm.module_name"></el-input>
      </el-form-item>

      <el-form-item label="操作名称" prop="username">
        <el-input v-model="ruleForm.action_name"></el-input>
      </el-form-item>

      <el-form-item label="操作地址" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      
      <el-form-item label="所属模块" prop="module_id">
        <el-select @change="selectChangeModule" v-model="ruleForm.module_id" placeholder="请选择模块">
          <el-option label="模块" :value="1"></el-option>
          <el-option label="菜单" :value="2"></el-option>
          <el-option label="操作" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1" checked="true">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
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
        type:1,
        module_name:'',
        action_name:'',
        url:'',
        module_id:'',
        description:'',
        status: 1
      },
      roleList: [],
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("manager/doAdd", this.ruleForm).then(() => {
            console.log("000");
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
    getRoleList() {
      this.$store.dispatch("manager/getRoleList").then(data => {
        this.roleList = data;
        console.log("data", data);
      });
    },
    goBack() {
      history.go(-1);
    },
    selectChangeType(){
      console.log("000")
    },
    selectChangeModule(){

    }
  }
};
</script>

<style lang="scss" scoped>
</style>
