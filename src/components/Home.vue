<template>
  <el-container>
    <el-header>
      <div id="logo-title">北京快乐平方广告管理后台</div>
      <div id="user">
        <img src="../assets/img/user.png" alt>
        <span>Admin</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div id="showuser">
          <img src="../assets/img/user.png" alt>
          <div id="left_box">
            <p>Admin</p>
            <p>
              <i></i>在线
            </p>
          </div>
        </div>
        <div class="home">首页</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#222d32"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item>
              <el-menu-item index="1-1">账号管理</el-menu-item>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  mounted() {
    this.getMenuList()
  },
  data() {
    return {
      // 接收的后端返回的 左侧显示的权限信息
      menuList: []
    }
  },
  methods: {
    // 获得用于显示的左侧导航权限信息
    getMenuList() {
      this.$http.get('/left_com').then(res => {
        console.log(res)
        // 把权限数据赋予给menuList
        this.menuList = res.data
        console.log(this.menuList)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #18bc9c;
    color: #fff;
    line-height: 60px;
    padding: 0;
    padding-right: 40px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-title {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
    }
    #user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }

  .el-aside {
    background-color: #222d32;
    color: #333;
    width: 200px;
    .el-menu {
      border-right-width: 0;
    }
    .home {
      background-color: #151e22;
      color: #fff;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #2c3438;
      text-align: center
    }
    #showuser {
      height: 60px;
      width: 100%;
      background-color: #151e22;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        float: left;
        margin-left: 10px;
        margin-right: 20px;
      }
      #left_box {
        float: left;
        p {
          color: #fff;
          font-size: 14px;
          margin: 0;
          margin-top: 5px;
          i {
            display: inline-block;
            height: 12px;
            width: 12px;
            background-color: #18bc9c;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
      }
    }
  }

  .el-main {
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #18bc9c;
  }
}
</style>
