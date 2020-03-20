<template>
  <el-drawer
    :title="isAdd? '添加权限菜单': '编辑权限菜单'"
    :visible.sync="isDrawer"
    size="45%"
    @close="drawerClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属模块" prop="module_id">
        <el-cascader
          :options="accessMenulist"
          :props="{ 
            checkStrictly: true,
            emitPath:false,
            value: '_id', 
            label: 'title',
          }"
          v-model="ruleForm.module_id"
          placeholder="请选择所属模块"
        ></el-cascader>

      </el-form-item>

      <el-form-item label="路由" prop="path">
        <el-input v-model="ruleForm.path"></el-input>
      </el-form-item>

      <el-form-item label="组件" prop="component">
        <el-input v-model="ruleForm.component" placeholder="请引入views下的组件"></el-input>
      </el-form-item>

      <el-form-item label="重定向" prop="redirect">
        <el-input v-model="ruleForm.redirect"></el-input>
      </el-form-item>

      <el-form-item label="路由名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>

      <el-form-item label="是否缓存页面" prop="keep_alive">
        <el-radio-group v-model="ruleForm.keep_alive">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否显示菜单" prop="hidden">
        <el-radio-group v-model="ruleForm.hidden">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import _ from "lodash";
function ruleForm() {
  return {
    module_id: "",
    path: "",
    component: "",
    redirect: "",
    name: "",
    title: "",
    icon: "",
    keep_alive:0,
    hidden: 0,//0显示，1隐藏
  };
}
export default {
  data() {
    return {
      isDrawer: false,
      isAdd: true,
      ruleForm: ruleForm(),
      rules: {
        module_id: [
          { required: true, message: "请选择所属模块", trigger: "blur" }
        ],
        path: [{ required: true, message: "请输入路径", trigger: "blur" }],
        component: [
          { required: true, message: "请引入views下的组件", trigger: "blur" }
        ]
      },
      accessMenulist: [],
    };
  },
  mounted() {
    this.$store
      .dispatch("accessMenu/list", {
        page: 1,
        limit: 20000
      })
      .then(res => {

        res.data.unshift({_id: "0",title: "顶级模块"});

        this.accessMenulist = res.data;

        console.log("resadd", res);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this.$store.dispatch("accessMenu/doAdd", this.ruleForm).then(() => {
              this.$emit("on-getData");
              this.resetForm("ruleForm");
            });
          } else {
            this.$store.dispatch("accessMenu/doEdit", this.ruleForm).then(() => {
              this.$emit("on-getData");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open(val) {
      if (val) {
        this.isAdd = false;
        var rows = _.clone(val);
        console.log("val哈哈哈哈😄", rows);
        rows.module_id = Number(rows.module_id);
        delete rows.children;
        this.ruleForm = {
          ...this.ruleForm,
          ...rows
        };
      }
      this.isDrawer = true;
    },
    drawerClose() {
      if (!this.isAdd) {
        this.ruleForm = ruleForm();
      }
      this.isAdd = true;
    }
  }
};
</script>

<style lang="scss">
.el-drawer__body {
  padding-right: 10px;
}
</style>
