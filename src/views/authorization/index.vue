<template>
  <el-card class="box-card">
    <div slot="header" style="text-align:center;" class="clearfix">
      <span>角色授权</span>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,idx) in roleData"
        :key="idx"
        :label="item.title"
        :name="item._id.toString()"
      />
    </el-tabs>

    <el-checkbox-group
      v-model="checkedAccess"
      v-for="(item,idx) in accessData"
      :key="idx"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox :label="item._id">{{item.module_name}}</el-checkbox>

      <div class="checkbox-separator">
        <el-checkbox
          v-for="(itm,ix) in item.children"
          :key="ix"
          :label="itm._id"
        >{{itm.action_name}}</el-checkbox>
      </div>
    </el-checkbox-group>
  </el-card>
</template>

<script>
export default {
  name: "authorization",
  data() {
    return {
      activeName: "",
      roleData: [],
      accessData: [],
      checkedAccess: []
    };
  },
  computed: {},
  mounted() {
    this.getRoleData();
    this.getAccessData();
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

    getAccessData() {
      this.$store.dispatch("access/list").then(res => {
        this.accessData = res.data;
      });
    },

    handleClick(tab, event) {
      const { _id } = this.$route.query;
      // console.log(tab.name,_id);
    },

    handleCheckedCitiesChange(value) {
      console.log("0000", value, this.checkedCities);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-separator {
  margin: 20px 0 20px 30px;
}
</style>
