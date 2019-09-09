<template>
  <div class="login_body">
    <div>
      <input class="login_text" type="text" placeholder="账户名/手机号/Email" v-model="username" />
    </div>
    <div>
      <input class="login_text" type="password" placeholder="请输入您的密码" v-model="password" />
    </div>
    <div>
      <input class="login_text" type="text" placeholder="请输入图片验证码" v-model="verifyImgs" />
    </div>
    <div>
      <iframe id="my-iframe" width="120px" height="60px" src="/api2/users/verifyImgs" type="image/svg+xml" />
    </div>
    <div class="login_btn">
      <input @touchstart="login" type="submit" value="登录" />
    </div>
    <div class="login_link">
      <router-link to="/mine/register" tag="a">立即注册</router-link>
      <router-link to="/mine/findpassword" tag="a">找回密码</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      verifyImgs:''
    };
  },
  methods: {
    login() {
      //判断用户名和密码不能为空
      if (!this.username && !this.password) {
        messageBox({
              title: "登录",
              content: "账号或密码不能为空",
              ok: "确定"
            });
        return;
      }
      //发送请求
      this.axios
        .post("/api2/users/login/", {
          username: this.username,
          password: this.password,
          Imgverify: this.verifyImgs
        })
        .then(res => {
          let This = this; //this指向问题
          if (res.data.status === -1) {
            messageBox({
              title: "登录",
              content: "账号或密码错误",
              ok: "确定"
            });
          } else if (res.data.status === 0) {
            messageBox({
              title: "登录",
              content: "登录成功",
              ok: "确定",
              landleOk() {
                This.$router.push({ path: "/mine/center" });
              }
            });
          }else if (res.data.status === -3) {
             messageBox({
              title: "登录",
              content: "图片验证码错误",
              ok: "确定",
              });
          } else {
            messageBox({
              title: "登录",
              content: "账号已被冻结",
              ok: "确定"
            });
          }
        });
    },
  }
};
</script>

<style scoped>
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
#my-iframe{
  margin: 0;
  padding: 0;
  border: none
}
</style>
