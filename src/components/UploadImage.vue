<template>
  <div class="upload-container" :style="{height:setHeight,width:setWidth}">
    <el-upload
      ref="addupload"
      drag
      :action="upload_qiniu_url"
      :on-success="handleAddUploadSuccess"
      :on-error="handleUploadError"
      :auto-upload="true"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :data="qiniuData"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img
        v-if="imgUrl"
        :style="{width:setWidth,height:setHeight}"
        :src="imgUrl"
        class="avatar"
      />
      <i class="el-icon-plus upload-icon" :style="{'line-height':setLineHeight}"></i>
    </el-upload>
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
// import dayjs from 'dayjs';
export default {
  name: "UploadImage",
  props: {
    setWidth:{
      type:String,
      default:'200px'
    },
    setHeight:{
      type:String,
      default:'200px'
    },
    setLineHeight:{
      type:String,
      default:'200px'
    },
    getImgUrl:{
      type:Function
    },
    staticImageUrl:{
      type:String
    },
    uploadPrefix:{
      type:String,
    }
  },
  data() {
    return {
      qiniuData: {
        key: "",
        token: ""
      },
      upload_qiniu_url: "",
      upload_qiniu_addr: "",
      imgUrl:this.staticImageUrl
    };
  },
  mounted() {
    this.getUploadQiNiuToken();
  },
  computed:{
    
  },
  watch:{
    staticImageUrl(){
      this.imgUrl = this.staticImageUrl;
    }
  },
  methods: {
    getUploadQiNiuToken() {

      this.$store.dispatch("sourceManager/getUploadQiNiuToken").then(res => {

        this.upload_qiniu_addr = res.static_host;

        qiniu.getUploadUrl({ useCdnDomain: true, region: qiniu.region.z2 },res.upload_token).then(res => {

          this.upload_qiniu_url = res;

        }); // res 即为上传的 url
      });
    },

    beforeUpload(file) {

      return new Promise((resolve, reject) => {

        qiniu.compressImage(file, {quality: 0.5,maxWidth: 720}).then(compress_res => {

          this.$store.dispatch("sourceManager/getUploadQiNiuToken").then(res => {

            this.qiniuData.token = res.upload_token;

            this.qiniuData.key =this.uploadPrefix+dayjs().format("YYYYMMDDHHmmss") +file.name;

            this.upload_qiniu_addr = res.static_host;

            resolve(compress_res.dist);

          });
        });
      });
      
    },
    handleAddUploadSuccess(res, file) {

      this.imgUrl = this.upload_qiniu_addr + res.key;

      console.log("res.key",res)
      
      this.$emit("getImgUrl",this.imgUrl);

    },
    handleUploadError(err, file, fileList) {
      console.log("err", err);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove() {}
  }
};
</script>

<style lang="scss" scoped>
.upload-container {
  // width: 180px;
  // height: 180px;
  .upload-icon {
    // line-height: 100px;
    font-size: 30px;
  }
}
</style>