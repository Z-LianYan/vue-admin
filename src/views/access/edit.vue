<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="编辑权限" center></el-page-header>
    </div>

    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类型" prop="type" v-if="ruleForm.type!=1">
        <el-select @change="selectChangeType" v-model="ruleForm.type" placeholder="请选择类型">
          <el-option label="模块" :value="1" v-if="ruleForm.type==1"></el-option>
          <el-option label="菜单" :value="2"></el-option>
          <el-option label="操作" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="模块名称" prop="module_name" v-if="ruleForm.type==1">
        <el-input v-model="ruleForm.module_name"></el-input>
      </el-form-item>

      <el-form-item
        :label="ruleForm.type==2? '菜单名称':'操作名称'"
        prop="action_name"
        v-if="ruleForm.type==2 || ruleForm.type==3"
      >
        <el-input v-model="ruleForm.action_name"></el-input>
      </el-form-item>

      <el-form-item
        :label="ruleForm.type==2? '菜单地址':'操作地址'"
        prop="url"
        v-if="ruleForm.type==2 || ruleForm.type==3"
      >
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>

      <el-form-item label="所属模块" prop="module_id" v-if="ruleForm.type!=1">
        <el-select @change="selectChangeModule" v-model="ruleForm.module_id" placeholder="请选择模块">
          <el-option
            v-for="(item,idx) in accessData"
            :label="item.module_name"
            :value="item._id"
            :key="idx"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
function paramsOption({ type = 1, module_id = 0 } = {}) {
  return {
    type: type,
    module_name: "",
    action_name: "",
    url: "",
    module_id: module_id,
    description: "",
    status: 1
  };
}
export default {
  data() {
    return {
      ruleForm: paramsOption(),
      accessData: []
    };
  },
  mounted() {
    this.getAccessList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("access/doEdit", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAccessList() {
      this.$store.dispatch("access/list", this.fetchOptions).then(res => {
        this.accessData = res.data;
        this.getSingleData();
      });
    },
    goBack() {
      history.go(-1);
    },
    selectChangeType(val) {
      if (val == 1) {

        this.ruleForm.module_id = 0;

        this.ruleForm.action_name = "";

        this.ruleForm.url = "";
        
      } else {

        this.ruleForm.module_name = "";
        
      }
    },
    getSingleData() {
      const { id } = this.$route.params;
      this.$store.dispatch("access/getSingleData", { _id: id }).then(data => {
        console.log("data---", data);
        this.ruleForm = data[0];
      });
    },
    selectChangeModule() {}
  }
};
</script>

<style lang="scss" scoped>
</style>
