// 修改密码

<template>
    <div class="login_body">
      <div>
        <input class="login_text" type="text" placeholder="Email" v-model="email" />
      </div>
      <div>
        <input class="login_text" type="password" placeholder="请输入您的新密码" v-model="password1" />
      </div>
      <div>
        <input class="login_text" type="password" placeholder="请确认您的新密码" v-model="password2" />
      </div>
      <div class="login_verify">
        <input
          @focus="yzpassword"
          class="login_text"
          type="text"
          placeholder="邮箱验证码"
          v-model="verify"
        />
        <input class="btn" @touchstart="verifyfun" type="button" value="获取验证码" />
      </div>
      <div class="login_btn">
        <input @touchstart="findfun" type="submit" value="立即找回" />
      </div>
      <div class="login_link">
      <router-link to="/mine/register" tag="a">立即注册</router-link>
      <router-link to="/mine/login" tag="a">立即登录</router-link>
    </div>
    </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "FindPassword",
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      verify: ""
    };
  },
  methods: {
    findfun() {
         this.axios.post("/api2/users/findpassword/",
         {
          email : this.email,
          password : this.password1,
          verify : this.verify
         })
         .then(res => {
             let This = this
          if (res.data.status !== 0) {
              messageBox({
              title: "修改密码",
              content: "密码修改失败",
              ok: "确定"
              });
              return
          }
          messageBox({
          title: "修改密码",
          content: "密码修改成功",
          ok: "确定",
          landleOk(){
            This.$router.push('/mine/center')
          }
      });
    })
    },
    verifyfun() {
      if (!this.email) {
        messageBox({
          title: "验证码",
          content: "邮箱不能为空",
          ok: "确定"
        });
        return;
      }
      this.axios.get("/api2/users/verify/?email=" + this.email).then(res => {
        messageBox({
          title: "验证码",
          content: "验证码发送成功",
          ok: "确定"
        });
      });
    },
    //密码框失去焦点 验证码获得焦点时验证密码是否一致
    yzpassword() {
      if (this.password1 !== this.password2) {
        messageBox({
          title: "注册",
          content: "两次密码不一致",
          ok: "确定"
        });
        return;
      }
    }
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
.login_body .login_verify {
  display: flex;
  justify-content: space-between;
}
.login_body .login_verify .btn {
  width: 50%;
  height: 40px;
  font-size: 12px;
  color: #e54847;
}
</style>