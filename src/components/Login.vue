<template>
  <div id="login-container">
    <div id="login-box">
      <img src="../assets/img/user.png" alt>
      <div class="basebox">
        <i slot="prefix" class="iconfont icon-yonghu" style="margin:0"></i>
        <input type="text" placeholder="用户名" v-model="loginForm.name">
      </div>
      <div class="basebox">
        <i slot="prefix" class="iconfont icon-mima" style="margin:0"></i>
        <input type="text" placeholder="密码" v-model="loginForm.pass">
      </div>
      <div class="basebox" style="background-color:transparent">
        <input
          type="text"
          placeholder="请输入验证码"
          style="margin-right:6px;flex:2;text-align: center;font-size:14px;padding:0"
          v-model="loginForm.code"
        >
        <input type="text" class="getcode" readonly="readonly" v-model="getcode" style="width:50px">
        <i class="newcode el-icon-refresh-right" @click="newkey"></i>
        <!-- <el-row>
          <el-button type="primary" style="height:50px" @click="newkey">换一组</el-button>
        </el-row> -->
      </div>
      <el-row>
        <el-button type="primary" class="btn" @click="login">登 录</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.randomString(8)
  },
  mounted() {
    // 页面加载获取验证码
    this.getkey()
    // 回车事件
    this.keyupSubmit()
  },
  data() {
    return {
      loginForm: {
        name: 'admin',
        pass: '123456',
        code: '',
        token: ''
      },
      getcode: ''
    }
  },
  methods: {
    // 生成随机字符串
    randomString(len) {
      len = len || 32
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = $chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      this.loginForm.token = pwd
    },
    // 回车登录事件
    keyupSubmit() {
      document.onkeydown = e => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.login()
        }
      }
    },
    // 点击登陆事件
    login() {
      this.$http.post('/login', JSON.stringify(this.loginForm)).then(res => {
        // 验证码不能为空
        if (this.loginForm.code === '') {
          this.getcode = res.data.code
          return this.$message.error('验证码不能为空')
        }
        // 判断验证码是否正确
        if (res.data.status === -1) {
          return this.$message.error('验证码不正确')
        } else if (res.data.status === -2) {
          // 判断用户名或密码 真实性校验失败
          return this.$message.error('用户名或密码不正确')
        } else if (res.data.status === 1) {
          // 通过浏览器的sessionStorage记录服务器返回的token信息
          window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('username', this.loginForm.name)
          // (校验成功)页面重定向到后台首页(/home)
          this.$router.push('/home')
          document.onkeydown = undefined
        }
      })
    },
    // 获取验证码
    getkey() {
      this.$http.post('/login', JSON.stringify(this.loginForm)).then(res => {
        this.getcode = res.data.code
      })
    },
    // 重新获取验证码
    newkey() {
      this.$http
        .post('/refresh_code', JSON.stringify(this.loginForm))
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
  background: url('../assets/img/loginbgc.jpg') no-repeat fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
  // 登录盒子样式
  #login-box {
    width: 300px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    img {
      width: 80px;
      height: 80px;
      margin-left: 50%;
      margin-bottom: 10%;
      transform: translate(-50%, 0);
    }
    el-input {
      overflow: hidden;
    }
    .basebox {
      height: 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 34px;
      position: relative;
    }
    .getcode {
      flex: 1;
      height: 100%;
      display: inline-block;
      background-color: #fff;
      padding-left: 40px;
      line-height: 40px;
      font-size: 16px;
    }
    .iconfont {
      padding-right: 10px;
      padding-left: 10px;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      height: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 24px;
      color: #555555;
    }
    input {
      width: 100px;
      height: 32px;
      border-style: none;
      width: 100%;
      height: 100%;
      padding: 0;
      padding-left: 10px;
      font-size: 14px;
      outline: none
    }
    .newcode{
      position: absolute;
      right: 10px;
      font-size: 25px;
      cursor: pointer;
    }
    .btn {
      width: 100%;
      height: 40px;
      background-color: #57b99d;
      border-radius: 12px;
      font-size: 14px;
    }
  }
}
</style>
