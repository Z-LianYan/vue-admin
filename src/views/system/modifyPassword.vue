<template>
  <el-dialog
    title="修改密码"
    :visible.sync="isDialogVisible"
    width="30%"
    :append-to-body="true"
    :before-close="close"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rulesForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          :type="oldPasswordType"
          ref="oldPasswordType"
          v-model="ruleForm.oldPassword"
        ></el-input>
        <span class="show-pwd" @click="showPwd('oldPasswordType')">
          <svg-icon
            :icon-class="oldPasswordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item label="新密码" prop="password">
        <el-input
          :type="newPasswordType"
          ref="newPasswordType"
          v-model="ruleForm.password"
        ></el-input>
        <span class="show-pwd" @click="showPwd('newPasswordType')">
          <svg-icon
            :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          :type="confirmPasswordType"
          ref="confirmPasswordType"
          v-model="ruleForm.confirmPassword"
        ></el-input>
        <span class="show-pwd" @click="showPwd('confirmPasswordType')">
          <svg-icon
            :icon-class="confirmPasswordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="doSubmitModify"
        >提交</el-button
      >
    </el-form>
  </el-dialog>
</template>

<script>
import { removeToken } from "@/common/tools";
function optionsParam(){
  return {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  }
}
export default {
  name: "Login",
  data() {
    let validateOldPassword = (rule, value, callback) => {
      if (value) {
        if (value.length < 6) {
          callback(new Error("请输入6位以上的密码"));
        }else{
          callback();
        }
      } else {
        callback();
      }
    };
    let validateNewPassword = (rule, value, callback) => {
      if (value) {
        if (value.length < 6) {
          callback(new Error("请输入6位以上的密码"));
        } else if (this.ruleForm.confirmPassword && value !== this.ruleForm.confirmPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    let validateConfirmPassword = (rule, value, callback) => {
      if (value) {
        if (value.length < 6) {
          callback(new Error("请输入6位以上的密码"));
        } else if (this.ruleForm.password && value !== this.ruleForm.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      isDialogVisible: false,
      ruleForm: optionsParam(),
      rulesForm: {
        oldPassword: { validator: validateOldPassword, trigger: "blur",required: true },
        password: { validator: validateNewPassword, trigger: "blur",required: true },
        confirmPassword: { validator: validateConfirmPassword, trigger: "blur",required: true },
      },
      loading: false,

      oldPasswordType: "password",
      newPasswordType: "password",
      confirmPasswordType:"password"
    };
  },
  computed: {
    
  },
  watch: {},
  methods: {
    close(){
      this.isDialogVisible = false;
      this.loading=false
    },
    open() {
      this.isDialogVisible = true;
    },

    showPwd(type) {
      if (this[type] === "password") {
        this[type] = "";
      } else {
        this[type] = "password";
      }
      this.$nextTick(() => {
        this.$refs[type].focus();
      });
    },

    doSubmitModify() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/doModifyPassword", this.ruleForm)
            .then((res) => {
              this.loading = false;
              this.isDialogVisible = false;
              this.ruleForm = optionsParam();
              removeToken();
              setTimeout(() => {
                this.$router.push("/login");
              }, 2000);
            }).catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" >
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 40px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.el-collapse {
  border-top: 1px solid transparent;
  margin-bottom: 30px;
}
</style>
