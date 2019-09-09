
// 个人中心页

<template>
  <div>
    <el-row class="tac">
      <el-col style="width:100%" :span="12">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <img class="imgs" :src="this.$store.state.userHead" />
            <span>用户名:{{ this.$store.state.user}}</span>
            身份:
            <span v-if="this.$store.state.isAdmin">管理员</span>
            <span v-else>普通会员</span>
            <input type="file" name="file" @click="uploadingHead" value="上传头像" />
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span @touchstart="logout" slot="title">退出登录</span>
          </el-menu-item>
          <!-- 身份是管理员才能显示的导航 -->
          <el-menu-item index="3" v-if="this.$store.state.isAdmin">
            <i class="el-icon-menu"></i>
            <!-- <router-link to="/admin" tag="span">管理页面</router-link> -->
            <a href="/admin" target=" _blank" style="text-decoration:none;">管理页面</a>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";

import axios from "axios";
export default {
  name: "center",
  data() {
    return {};
  },
  methods: {
     uploadingHead(ev) {
    //   let file = ev.target.files[0];
    //   let param = new FormData(); //把文件存起来
    //   param.append("file", file, file.name); //参数
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   };
    //   axios.post("/api2/users/loadUserhead", param, config).then(res => {
    //     //let This = this; //this指向
    //     if (res.data.status === 0) {
    //       messageBox({
    //         title: "上传头像",
    //         content: "上传头像成功",
    //         ok: "确定",
    //         landleOk() {
    //           this.$store.dispatch("UserName", {
    //             userHead: res.data.data.userHead
    //           });
    //         }
      //      });
      //   } else {
      //     messageBox({
      //       title: "上传头像",
      //       content: "上传头像失败",
      //       ok: "确定"
      //     });
      //   }
      // });
    },
    logout() {
      axios.get("/api2/users/logout").then(res => {
        let This = this; //this指向
        if (res.data.status === 0) {
          //退出登录时将清除用户信息 将本地数据也删除
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("isAdmin");
          This.$store.dispatch("UserName", {
            username: "",
            isAdmin: false,
            userHead: ""
          });
          //跳到登录页面
          This.$router.push("/mine/login");
          messageBox({
            title: "退出",
            content: "退出成功",
            ok: "确定",
            landleOk() {
              //点击确定跳到登录页面
              This.$router.push("/mine/login");
            }
          });
        } else {
          messageBox({
            title: "退出",
            content: "退出失败",
            ok: "确定"
          });
        }
      });
    }
  },

  /**
   * 个人用户页面的全局守卫
   */
  beforeRouteEnter: (to, from, next) => {
    // 不能使用 this 所以得重新引入 axios
    axios.get("/api2/users/getUser").then(res => {
      if (res.data.status === 0) {
        //能拿到用户可以执行下一步 保存登录状态
        next(vm => {
          //将用户名字和用户身份存储到本地
          window.localStorage.setItem("username", res.data.data.username);
          window.localStorage.setItem("isAdmin", res.data.data.isAdmin);
          vm.$store.dispatch("UserName", {
            username: res.data.data.username,
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead
          });
        });
      } else {
        //不能拿到用户则跳到登录页
        next("/mine/login");
      }
    });
  }
};
</script>

<style scoped>
.imgs {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: inline;
}
</style>
