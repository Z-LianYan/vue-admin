<template>
  <div class="upload-container" :style="{height:setHeight,width:setWidth}">
    <el-upload
      :style="{height:setHeight}"
      class="upload-demo"
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
import moment from "moment";
import * as qiniu from "qiniu-js";
export default {
  name: "UploadImage",
  props: {
    setWidth:{
      type:String,
      default:'180px'
    },
    setHeight:{
      type:String,
      default:'180px'
    },
    setLineHeight:{
      type:String,
      default:'180px'
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
    this.gotUploadToken();
  },
  computed:{
    
  },
  watch:{
    staticImageUrl(){
      this.imgUrl = this.staticImageUrl;
    }
  },
  methods: {
    gotUploadToken() {
      this.$store.dispatch("GET_UPLOAD_TOKEN").then(res => {
        console.log("res---",res);
        this.upload_qiniu_addr = res.site_static_host;
        qiniu
          .getUploadUrl(
            { useCdnDomain: true, region: qiniu.region.z2 },
            res.upload_token
          )
          .then(res => {
            this.upload_qiniu_url = res;
          }); // res 即为上传的 url
      });
    },

    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        qiniu
          .compressImage(file, {
            quality: 0.5,
            maxWidth: 720
          })
          .then(compress_res => {
            console.log(compress_res);
            this.$store.dispatch("GET_UPLOAD_TOKEN").then(res => {
              this.qiniuData.token = res.upload_token;
              this.qiniuData.key =this.uploadPrefix+'-'+moment().format("YYYYMMDDHHmmss") +file.name;
              this.upload_qiniu_addr = res.site_static_host;
              resolve(compress_res.dist);
            });
          });
      });
    },
    handleAddUploadSuccess(res, file) {
      this.imgUrl = this.upload_qiniu_addr + res.key;
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