<template>
  <div id="login-container">
    <div id="login-box">
        <img src="../assets/img/user.png" alt>
      <div class="basebox">
        <i slot="prefix" class="iconfont icon-user"></i>
        <input type="text" placeholder="用户名" v-model="loginForm.name">
      </div>
      <div class="basebox">
        <i slot="prefix" class="iconfont icon-3702mima"></i>
        <input type="text" placeholder="密码" v-model="loginForm.pass">
      </div>
      <div class="basebox" style="background-color:transparent">
        <input
          type="text"
          placeholder="请输入验证码"
          style="margin-right:10px;flex:2;text-align: center;"
          v-model="loginForm.code"
        >
        <input type="text" class="getcode" readonly="readonly" v-model="getcode">
        <el-row>
          <el-button type="primary" style="height:50px" @click="newkey">换一组</el-button>
        </el-row>
      </div>
      <el-row>
        <el-button type="primary" class="btn" @click="login">登 录</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    // 页面加载获取验证码
    this.getkey()
  },
  data() {
    return {
      loginForm: {
        name: 'admin',
        pass: '123456',
        code: '',
        token: '121'
      },
      getcode: ''
    }
  },
  methods: {
    // 点击登陆事件
    login() {
      this.$http
        .post(
          '/login',
          JSON.stringify(this.loginForm)
        )
        .then(res => {
          // 判断用户名或密码 真实性校验失败
          if (res.status !== 200) {
            return this.$message.error('用户名或密码不存在')
          }
          // 通过浏览器的sessionStorage记录服务器返回的token信息
          window.sessionStorage.setItem('token', res.data.token)

          // (校验成功)页面重定向到后台首页(/home)
          this.$router.push('/home')
        })
    },
    // 获取验证码
    getkey() {
      console.log(this.$qs.stringify(this.aa))
      this.$http
        .post(
          '/login',
          JSON.stringify(this.loginForm)
        )
        .then(res => {
          this.getcode = res.data.code
        })
    },
    // 重新获取验证码
    newkey() {
      this.$http
        .post(
          '/refresh_code',
          JSON.stringify(this.loginForm)
        )
        .then(res => {
          this.getcode = res.data.code
        })
    }
  }
}
</script>
<style lang="less" scoped>
// 主背景样式
#login-container {
  background: url('../assets/img/loginbgc.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
  // 登录盒子样式
  #login-box {
    width: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 160px;
      height: 160px;
      margin-left: 50%;
      margin-bottom: 10%;
      transform: translate(-50%, 0);
    }
    el-input {
      overflow: hidden;
    }
    .basebox {
      height: 50px;
      background-color: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 34px;
    }
    .getcode {
      flex: 2;
      height: 100%;
      display: inline-block;
      background-color: #fff;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
    }
    i {
      padding-right: 10px;
      padding-left: 10px;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      display: inline-block;
      height: 100%;
      text-align: center;
      line-height: 50px;
    }
    input {
      width: 100px;
      height: 32px;
      border-style: none;
      width: 100%;
      height: 100%;
      padding: 0;
      padding-left: 10px;
      font-size: 20px;
    }
    .btn {
      width: 100%;
      height: 60px;
      background-color: #57b99d;
      border-radius: 12px;
      font-size: 25px;
    }
  }
}
</style>
