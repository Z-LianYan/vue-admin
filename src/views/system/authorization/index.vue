<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>角色授权</span>
    </div>

    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,idx) in roleData"
        :key="idx"
        :label="item.title"
        :name="item._id.toString()"
      />
    </el-tabs> -->

    <!-- <el-checkbox-group
      v-model="checkedAccess"
      v-for="(item,idx) in accessMenuData"
      :key="idx"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox :label="item._id">{{item.title}}</el-checkbox>

      <div class="checkbox-separator">
        <el-checkbox
          v-for="(itm,ix) in item.children"
          :key="ix"
          :label="itm._id"
        >{{itm.title}}</el-checkbox>
      </div>
    </el-checkbox-group> -->


    <el-tree
    :data="accessMenuData"
    :show-checkbox="true"
    node-key="_id"
    default-expand-all
    ref="tree_menu"
    @node-click='handleNodeClick'
    @check-change="handleCheckChange"
    :expand-on-click-node="false"
    :props="defaultProps">
    </el-tree>




    <el-button type="primary" @click="authorizationSubmit" size="small">提交</el-button>
  </el-card>
</template>

<script>
export default {
  name: "authorization",
  data() {
    return {
      activeName: "",
      roleData: [],
      accessMenuData: [],
      checkedAccess: [],
      roleId: "",
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  computed: {},
  mounted() {
    // this.getRoleData();
    this.getAccessMenuData();
  },
  watch: {},
  methods: {
    getRoleData() {
      const { _id } = this.$route.query;
      this.activeName = _id.toString();
      this.$store.dispatch("role/list").then(res => {
        this.roleData = res;
      });
    },

    getAccessMenuData() {
      this.$store.dispatch("accessMenu/list").then(res => {
        console.log("res-",res);
        this.accessMenuData = res.data;
        // this.roleAuth();
      });
    },
    handleNodeClick(data){
      console.log("handleNodeClick",data);
    },
    handleCheckChange(data,checked,node){
      console.log("handleCheckChange---",data,checked,node);
      if(checked){

        // this.$refs.tree_menu.setCheckedKeys([data._id])

        // this.checkedId = data.id;

        // this.$refs.tree_menu.setCheckedNodes([data]);

      }
    },



    roleAuth(roleId) {
      const { _id } = this.$route.query;
      this.roleId = roleId ? roleId : _id;
      this.$store
        .dispatch("authorization/roleAuth", { role_id: this.roleId })
        .then(res => {
          let accessIdArr = res.map(item => item.access_id);
          this.checkedAccess = accessIdArr;
          // console.log("checkedAccess",this.checkedAccess);
          // console.log("res",res);
        });
    },

    handleClick(tab, event) {
      // const { _id } = this.$route.query;
      // console.log(tab.name);
      this.roleAuth(tab.name);
    },

    handleCheckedCitiesChange(value) {
      console.log("0000", value, this.checkedCities);
    },

    authorizationSubmit() {
      console.log("哈哈哈");
      this.$store.dispatch("authorization/roleAuthorizationEdit", {
        checkedAccess: this.checkedAccess,
        role_id: this.roleId
      }).then(res => {
        console.log("res",res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-separator {
  margin: 20px 0 20px 30px;
}
</style>
