<template>
  <div class="navbar">

    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container"/>
    
    
    <div class="right-menu">

      <!-- <span class="showUserName" v-if="userInfo.username">Hi！{{userInfo.username}}</span> -->

      <screenfull id="screenfull" class="right-menu-item hover-effect" />


      <el-tooltip class="item" effect="dark" content="设置主题颜色" placement="top-start">
        <theme-picker style="height: 26px;margin: 0 8px 0 0;" @change="themeChange" />
      </el-tooltip>

      <el-dropdown class="avatar-container" trigger="click">
        
        <div class="avatar-wrapper">

            
            <img :src="userInfo.img_head" class="user-avatar">

            <div class="user-name">Hi！{{userInfo && userInfo.username}}</div>

            <i class="el-icon-caret-bottom"/>

        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">

          <router-link to="/">

            <el-dropdown-item>首页</el-dropdown-item>

          </router-link>

          <el-dropdown-item divided>

            <span style="display:block;" @click="modifyPassword">修改密码</span>

          </el-dropdown-item>

          <el-dropdown-item divided>

            <span style="display:block;" @click="doLogout">退出系统</span>

          </el-dropdown-item>

        </el-dropdown-menu>

      </el-dropdown>

    </div>
    <ModifyPassword ref="modify_password"/>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import Breadcrumb from "./Breadcrumb";
import Hamburger from "./Hamburger";

import Screenfull from '@/components/Screenfull/index';

import ThemePicker from '@/components/ThemePicker';

import ModifyPassword from '@/views/system/modifyPassword';

export default {
  data(){
    return {}
  },
  components: {
    Breadcrumb,
    Hamburger,
    ThemePicker,
    Screenfull,
    ModifyPassword
  },
  mounted(){
    console.log("用户信息",this.userInfo);
  },
  computed: {
    ...Vuex.mapGetters(["sidebar", "avatar","userInfo"])
  },
  methods: {

    modifyPassword(){
      this.$refs.modify_password.open();
    },


    themeChange(val){
      this.$store.dispatch("settings/changeSetting",{
        key: 'theme',
        value: val
      })
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    doLogout() {
      this.$confirm("您确定要退出系统吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("user/doLogout").then(() => {
          this.$store.state.accessMenu.routerMenu = [];
          this.$store.state.accessMenu.login_success_go_def_route = '';
        });
      }).catch(() => {

        this.$message({
          type: "info",
          message: "已取消退出系统"
        });

      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    // height: 100%;
    // line-height: 50px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      // height: 100%;
      font-size: 18px;
      color: #5a5e66;
      margin-right: 10px;
      // vertical-align: text-bottom;
      // vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        justify-items: center;

        // .showUserName{
        //   margin-bottom: 5px;
        // }


        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name{
          height:45px;
          line-height:50px;
          margin-left: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
