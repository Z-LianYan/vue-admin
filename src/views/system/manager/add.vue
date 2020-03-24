<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      添加管理员
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
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
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
        :staticImageUrl='ruleForm.img_head'
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1" checked="true">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
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
import UploadImage from "@/components/UploadImage"
export default {
  name:'manager_add',
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

    return {
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        email: "",
        role_id: "",
        img_head:"",
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在 6 个字符以上的密码", trigger: "blur" }
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
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("manager/doAdd", this.ruleForm).then(() => {
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
      });
    },
    getImgUrl(imgUrl){

      console.log("上传的图片路径：",imgUrl);

      this.ruleForm.img_head = imgUrl;

    },
    activated(){
      console.log("管理员添加activated");
    },
    deactivated(){
      console.log("管理员添加activated");
    },
    destroyed(){
      console.log("管理员添加destroyed");
    },
    beforeDestroy(){
      console.log("管理员添加beforeDestroy");
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
