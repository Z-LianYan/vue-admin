<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <el-page-header @back="goBack" title="返回" content="编辑管理员" center></el-page-header>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      :status-icon="false"
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

      <el-form-item label="上传头像" prop="img_head">
        <upload-image 
        @getImgUrl="getImgUrl" 
        uploadPrefix="avatar/" 
        :staticImageUrl='ruleForm.img_head' />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1" checked="true">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-collapse>
        <el-collapse-item title="修改密码">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input :type="oldPasswordType" ref="oldPassword" v-model="ruleForm.oldPassword"></el-input>
            <span class="show-pwd" @click="showOldPwd">
              <svg-icon :icon-class="oldPasswordType === 'password' ? 'eye' : 'eye-open'"/>
            </span>
          </el-form-item>

          <el-form-item label="新密码" prop="password">
            <el-input :type="newPasswordType" ref="newPassword" v-model="ruleForm.password"></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'"/>
            </span>
          </el-form-item>

          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input :type="newPasswordType" ref="newPassword" v-model="ruleForm.confirmPassword"></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'"/>
            </span>
          </el-form-item>
        </el-collapse-item>
      </el-collapse> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import UploadImage from "@/components/UploadImage"
export default {
  name:'manager_edit',
  components:{
    UploadImage
  },
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

    // let validatePassword = (rule, value, callback) => {
    //   if (value) {
    //     value.length < 6 ? callback(new Error("请输入6位以上的字符")) : callback();;
    //   } else {
    //     callback();
    //   }
    // };

    // let validateConfirmPassword = (rule, value, callback) => {
    //   if (value) {
    //     if (value.length < 6) {
    //       callback(new Error("请输入6位以上的字符"));
    //     } else if (value !== this.ruleForm.password) {
    //       callback(new Error("两次输入密码不一致!"));
    //     }else{
    //       callback();
    //     }
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        _id:'',
        username: "",
        // oldPassword: "",
        // password: "",
        // confirmPassword: "",
        mobile: "",
        img_head:"",
        email: "",
        role_id: "",
        status: 1
      },
      roleList: [],
      rules: {
        img_head: [
          { required: true, message: "请上传头像" },
        ],
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 3, message: "长度在 3 个字符以上", trigger: "blur" }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        mobile: [
          { required: true, validator: validateMobile, trigger: "blur" }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }],
        // password: { validator: validatePassword, trigger: "blur" },
        // confirmPassword: { validator: validateConfirmPassword, trigger: "blur" }
      },
      // oldPasswordType: "password",
      // newPasswordType: "password"
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
    },
    // showOldPwd() {
    //   if (this.oldPasswordType === "password") {
    //     this.oldPasswordType = "";
    //   } else {
    //     this.oldPasswordType = "password";
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.oldPassword.focus();
    //   });
    // },
    // showPwd() {
    //   if (this.newPasswordType === "password") {
    //     this.newPasswordType = "";
    //   } else {
    //     this.newPasswordType = "password";
    //   }
    // },
    getImgUrl(imgUrl){

      console.log("上传的图片路径：",imgUrl);

      this.ruleForm.img_head = imgUrl;
      
    }
  }
};
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 2px;
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
