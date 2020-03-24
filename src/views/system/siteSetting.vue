<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      网站设置
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="网站名称" prop="site_title">
        <el-input v-model="ruleForm.site_title"></el-input>
      </el-form-item>

      <el-form-item label="网站logo" prop="site_logo">
        <upload-image 
        @getImgUrl="getImgUrl" 
        uploadPrefix="siteLogo/"
        :staticImageUrl='ruleForm.site_logo'
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import UploadImage from "@/components/UploadImage"
export default {
  name:'setting',
  components:{
    UploadImage
  },
  data() {
    return {
      ruleForm: {
        site_logo: "",
        site_title: ""
      },
      rules: {
        site_logo: [
          { required: true, message: "请上网站logo", trigger: "blur" },
        ],
        site_title: [
          { required: true, message: "请输入网站名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("siteSetting/eidtSetting", this.ruleForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fetchData(){
        this.$store.dispatch("siteSetting/getSetData").then(res=>{
            console.log("siteSetting",res);
            this.ruleForm = {
                ...res[0]
            }
        })
    },
    getImgUrl(imgUrl){
      console.log("上传的图片路径：",imgUrl);
      this.ruleForm.site_logo = imgUrl;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
