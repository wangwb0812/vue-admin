<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="left-menu">
      <breadcrumb />
    </div>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="userInfo.userImg" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span>退出</span>
          </el-dropdown-item>
          <el-dropdown
            placement="left"
            trigger="click"
            @command="handleCommand"
          >
            <el-dropdown-item>
              <span>主题</span>
            </el-dropdown-item>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="default-theme">
                <span>主题1</span>
              </el-dropdown-item>
              <el-dropdown-item command="red-theme">
                <span>主题2</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: {
    Hamburger,
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["sidebar", "userInfo"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/setSideBar");
    },
    logout() {
      this.$router.push("/login");
    },
    handleCommand(command) {
      if (command) {
        window.document.documentElement.setAttribute("data-theme", command);
      }
    },
  },
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
  .left-menu {
    float: left;
    margin-left: 10px;
  }
  .right-menu {
    float: right;
    height: 100%;
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
