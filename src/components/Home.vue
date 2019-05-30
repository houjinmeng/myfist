<template>
  <el-container>
    <el-header>
      <div id="logo-title">北京哇咔传媒广告管理后台</div>
      <el-popover placement="bottom" trigger="click" id="popover">
        <el-button type="primary" @click="logout" style="margin-left:24px">退出登录</el-button>
        <el-button slot="reference" style="background-color:#18bc9c;border:0 none;color:#fff">
          <div id="user">
            <img src="../assets/img/user.png" alt>
            <span>{{username}}</span>
          </div>
        </el-button>
      </el-popover>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div id="showuser">
          <img src="../assets/img/user.png" alt>
          <div id="left_box">
            <p>{{username}}</p>
            <p>
              <i></i>在线
            </p>
          </div>
        </div>
        <router-link :to="'/welcome'"><div class="home">首页</div></router-link>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#222d32"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in menuList" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-'+menuicon[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
              <i style="margin-right:10px"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 已登录用户名
      username: window.sessionStorage.getItem('username'),
      //  左侧导航菜单数据
      menuList: [
        {
          id: 1,
          authName: '账号管理',
          path: null,
          children: [
            {
              id: 8,
              authName: '账号列表',
              path: 'account',
              children: []
            }
          ]
        },
        {
          id: 2,
          authName: '用户管理',
          path: null,
          children: [
            {
              id: 9,
              authName: '用户列表',
              path: 'user',
              children: []
            }
          ]
        },
        {
          id: 3,
          authName: '审核管理',
          path: null,
          children: [
            {
              id: 10,
              authName: '审核列表',
              path: 'check',
              children: []
            }
          ]
        },
        {
          id: 4,
          authName: '设备管理',
          path: null,
          children: [
            {
              id: 11,
              authName: '设备列表',
              path: 'machine',
              children: []
            }
          ]
        },
        {
          id: 5,
          authName: '价格管理',
          path: null,
          children: [
            {
              id: 12,
              authName: '价格设置',
              path: 'price',
              children: []
            }
          ]
        },
        {
          id: 6,
          authName: '订单管理',
          path: null,
          children: [
            {
              id: 13,
              authName: '订单列表',
              path: 'order',
              children: []
            }
          ]
        },
        {
          id: 7,
          authName: '统计管理',
          path: null,
          children: [
            {
              id: 14,
              authName: '投放统计',
              path: 'statistics',
              children: []
            },
            {
              id: 15,
              authName: '营销号统计',
              path: 'marketing',
              children: []
            }
          ]
        }
      ],
      // 设置左侧权限的图标
      menuicon: [
        'zhanghuguanli',
        'houtaidenglu-',
        'shenheguanli',
        'shebeiguanli',
        'jiageguanli',
        'dingdanguanli',
        'tongjiguanli'
      ]
    }
  },
  methods: {
    // 退出系统
    logout() {
      // 确认退出
      // 清除token
      // 页面跳转到login
      this.$confirm('确认要退出系统么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  // 头部样式
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
      margin-top: 12px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  // 侧边导航样式
  .el-aside {
    background-color: #222d32;
    color: #333;
    width: 200px;
    overflow-y: hidden;
    .el-menu {
      border-right-width: 0;
    }
    .home {
      background-color: #151e22;
      color: #fff;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #2c3438;
      text-align: center;
      cursor: pointer;
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
}
</style>
