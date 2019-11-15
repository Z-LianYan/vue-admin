<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="编辑管理员" center></el-page-header>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="管理员名称" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="管理员角色" prop="role_id">
        <el-select v-model="ruleForm.role_id" placeholder="请选择角色">
          <el-option
            v-for="(item,idx) in roleList"
            :key="idx"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1" checked="true">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
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
    let validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码!"));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value) {
        reg.test(value) ? callback() : callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        mobile: "",
        email: "",
        role_id: "",
        status: 1
      },
      roleList: [],
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 3, message: "长度在 3 个字符以上", trigger: "blur" }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        mobile: [
          { required: true, validator: validateMobile, trigger: "blur" }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.getRoleList();

    this.getSingleManager();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("00", this.ruleForm);
          this.$store.dispatch("manager/doEdit", this.ruleForm);
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
    //获取单个管理员信息
    getSingleManager() {
      const { id } = this.$route.params;
      this.$store.dispatch("manager/getSingleData", { _id: id }).then(data => {
        console.log("data---", data);
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
