// 注册页

<template>
  <div class="login_body">
    <div>
      <input class="login_text" type="text" placeholder="Email" v-model="email" />
    </div>
    <div>
      <input class="login_text" type="text" placeholder="账户名" v-model="username" />
    </div>
    <div>
      <input class="login_text" type="password" placeholder="请输入您的密码" v-model="password1" />
    </div>
    <div>
      <input class="login_text" type="password" placeholder="请确认您的密码" v-model="password2" />
    </div>
    <div class="login_verify">
      <input
        @focus="yzpassword"
        class="login_text"
        type="text"
        placeholder="邮箱验证码"
        v-model="verify"
      />
      <input
        class="btn"
        @touchstart="verifyfun"
        type="button"
        :disabled="disabled"
        :value="verifyInfo"
      />
    </div>
    <div class="login_btn">
      <input @touchstart="register" type="submit" value="注册" />
    </div>
    <div class="login_link">
      <router-link to="/mine/login" tag="a">已有账号，现在去登录</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
import { clearInterval } from 'timers';
export default {
  name: "register",
  data() {
    return {
      email: "",
      username: "",
      password1: "",
      password2: "",
      verify: "",
      verifyInfo: "获取验证码", //验证码
      disabled: false //禁止状态
    };
  },
  methods: {
    register() {
      if (
        !this.email ||
        !this.username ||
        !this.password1 ||
        !this.password2 ||
        !this.verify
      ) {
        messageBox({
          title: "注册",
          content: "所填内容均不能为空",
          ok: "确定"
        });
        return;
      }
      if (this.password1 !== this.password2) {
        messageBox({
          title: "注册",
          content: "两次密码不一致",
          ok: "确定"
        });
        return;
      }

      this.axios
        .post("/api2/users/register/", {
          email: this.email,
          username: this.username,
          password: this.password1,
          verify: this.verify
        })
        .then(res => {
          let This = this;
          if (res.data.status === 0) {
            messageBox({
              title: "注册",
              content: "注册成功",
              ok: "确定",
              landleOk() {
                This.$router.push({ path: "/mine/center" });
              }
            });
          } else if (res.data.status === -1) {
            messageBox({
              title: "注册",
              content: "验证码错误",
              ok: "确定"
            });
          } else if (res.data.status === -2) {
            messageBox({
              title: "注册",
              content: "用户已存在",
              ok: "确定"
            });
          } else if(res.data.status === -3){
            messageBox({
              title: "注册",
              content: "验证码错误",
              ok: "确定"
            });
          }
        });
    },
    //发送验证码
    verifyfun() {
      //当点击发送验证码时 就不能再点击了
      if (this.disabled) {
        return;
      }
      if (!this.email) {
        messageBox({
          title: "验证码",
          content: "邮箱不能为空",
          ok: "确定"
        });
        return;
      }
      this.axios.get("/api2/users/verify/?email=" + this.email).then(res => {
        let This = this;
        if (res.data.status === 0) {
          messageBox({
          title: "验证码",
          content: "验证码发送成功",
          ok: "确定",
          landleOk() {
            //This.contDate();
          }
        });
        return
        }
        messageBox({
          title: "验证码",
          content: "验证码发送失败",
          ok: "确定",
        });
      });
    },
//验证码倒计时
  contDate(){
      //  this.disabled = true;
      //  let count = 60;
      // //  clearInterval(timer)
      // var timer =await setInterval(() =>{
      //     count--;
      //     this.verifyInfo = '剩余'+ count +'秒' ;

      //     if (count === 0) {
      //     this.disabled = false ;
      //     count = 60 ;
      //     this.verifyInfo = "获取验证码" ;
      //     clearInterval(timer)
      //   }
       //},1000)
        //console.log(timer)

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