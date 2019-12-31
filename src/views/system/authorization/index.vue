<template>

  <el-card class="box-card">

    <div slot="header" style="text-align:center;" class="clearfix">
      <span>角色授权管理</span>
    </div>


    <el-tabs :tab-position="roleListPosition" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  :label="item.title" :name="item._id.toString()" v-for="item in roleList" :key="item._id">

        <el-tree
        :data="accessMenuData"
        :show-checkbox="true"
        node-key="_id"
        default-expand-all
        ref="tree_menu"
        :check-strictly="true"
        :default-checked-keys='defaultAccessId'
        @check="checkClick"
        :expand-on-click-node="false"
        :props="defaultProps">
        </el-tree>


      </el-tab-pane>
    </el-tabs>

        




    <br/>

    <el-button type="primary" @click="authorizationSubmit" size="small">提交</el-button>

  </el-card>

</template>

<script>
import role from '../../../store/modules/role';
export default {
  name: "authorization",
  data() {
    return {
      roleListPosition: 'left',

      accessMenuData:[],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultAccessId:[],
      checkedAccessId:[],

      roleList:[],

      activeName:""


    };
  },
  computed: {},
  mounted() {
    this.getRoleData();
    this.getAccessMenuData();
  },
  watch: {},
  methods: {
    getRoleData() {
      const { _id } = this.$route.query;
      this.activeName = _id.toString();
      this.$store.dispatch("role/list").then(res => {
        console.log("role---",res);
        this.roleList = res;
      });
    },

    getAccessMenuData() {
      this.$store.dispatch("accessMenu/list").then(res => {
        console.log("res-",res);
        this.accessMenuData = res.data;
        this.roleAuth();
      });
    },

    checkClick(){
      this.checkedAccessId = this.$refs.tree_menu.getCheckedKeys().concat(this.$refs.tree_menu.getHalfCheckedKeys())
      console.log("checkedAccessId",this.checkedAccessId);
    },

    roleAuth(roleId) {
      console.log("+++",roleId);
      const { _id } = this.$route.query;
      this.roleId = roleId ? roleId : _id;
      this.$store.dispatch("authorization/roleAuth", { role_id: this.roleId }).then(res => {
        this.defaultAccessId = res.map(item=>item.access_id);
        console.log("defaultAccessId",this.defaultAccessId);
      });
    },

    authorizationSubmit() {
      const { _id } = this.$route.query;
      this.$store.dispatch("authorization/roleAuthorizationEdit", {
        checkedAccess: this.checkedAccessId,
        role_id: _id
      })
    },

    handleClick(val){
      console.log("val---",val);
      this.roleAuth(val.name);
    }

  }
};
</script>

<style lang="scss" scoped>
.checkbox-separator {
  margin: 20px 0 20px 30px;
}
</style>
