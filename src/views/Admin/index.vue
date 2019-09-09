<template>
  <div>
    <Herder title="后台管理页面">
      <!-- <i slot="left" class="iconfont icon-right" @touchstart="back"></i> -->
    </Herder>
    <el-container>
      <el-header>欢迎{{ this.$store.state.user }}来到后台管理页面！</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <router-link to="/admin/users" tag="div">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/adminmovie" tag="div">
              <el-menu-item index="2">
                <i class="el-icon-location"></i>
                <span slot="title">电影管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/admincinema" tag="div">
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">影院管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import Herder from "@/components/Header";
export default {
  name: "Admin",
  data() {
    return {
      //tabPosition: "left"
    };
  },
  methods: {
    // back() {
    //   this.$router.back();
    // }
  },
  components: {
    Herder
  },

  /**
   * 管理页面的全局守卫
   */
  beforeRouteEnter: (to, from, next) => {
    // 不能使用 this 所以得重新引入 axios
    axios.get("/api2/admin").then(res => {
      if (res.data.status === 0) {
        //能拿到用户可以进入该页面
        next();
      } else {
        //不能拿到用户则跳到登录页
        next("/mine/login");
      }
    });
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding-left: 30px;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>