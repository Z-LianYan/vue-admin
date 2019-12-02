<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      // router_menu: [
      //   {
      //     path: "/system",
      //     component: ()=>import('@/layout'),
      //     redirect: "/system/manager",
      //     meta: { title: "系统设置", icon: "el-icon-s-tools" },
      //     children: [
      //       //管理员
      //       {
      //         path: "manager",
      //         component: ()=>import('@/views/system/manager/index'),
      //         meta: { title: "管理员管理", icon: "el-icon-s-management" }
      //       }, //管理员
      //       {
      //         path: "manager/add",
      //         component: ()=>import('@/views/system/manager/add'),
      //         meta: { title: "添加管理员" },
      //         hidden: true
      //       }, //添加管理员
      //       {
      //         path: "manager/edit/:id",
      //         component: ()=>import('@/views/system/manager/edit'),
      //         meta: { title: "编辑管理员", icon: "dashboard" },
      //         hidden: true
      //       }, //编辑管理员

      //       //角色管理
      //       {
      //         path: "role",
      //         component: ()=>import('@/views/system/role/index'),
      //         meta: { title: "角色管理", icon: "el-icon-user" }
      //       },
      //       {
      //         path: "role/add",
      //         component: ()=>import('@/views/system/role/add'),
      //         meta: { title: "添加角色" },
      //         hidden: true
      //       },
      //       {
      //         path: "role/edit/:id",
      //         component: ()=>import('@/views/system/role/edit'),
      //         meta: { title: "编辑角色" },
      //         hidden: true
      //       }
      //     ]
      //   }
      // ]
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      // console.log("this.$router.options.routes", this.$router.options.routes);
      console.log("this.$router.options.routes----+++++++", this.$store.state.accessMenu.routerMenu);
      return this.$router.options.routes.concat(this.$store.state.accessMenu.routerMenu);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
