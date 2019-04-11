<template>
  <div style="text-align:center">
    <ul>
      <li>
        手机号：
        <input v-model="tableList.keyword.phone">
      </li>
      <li>
        审核状态：
        <el-select v-model="tableList.keyword.status" placeholder="全部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="200"></el-table-column>
      <el-table-column prop="nick" label="微信昵称" width="300"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="300"></el-table-column>
      <el-table-column prop="addtime" label="最后登录时间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <el-switch
          v-model="info.row.status"
          :active-value="0"
          :inactive-value="1"
          slot-scope="info"
          @change="changeState(info.row.id)"
        ></el-switch>
      </el-table-column>
    </el-table>
    <!--数据分页展示-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querycdt.pagenum"
      :page-sizes="[3, 5, 10, 20]"
      :page-size="querycdt.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="querycdt.tot"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getuserList()
  },
  data() {
    return {
      // 获取列表数据所传参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        keyword: {
          phone: '',
          status: ''
        }
      },
      userList: [],
      // 审核状态下拉框
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '禁用'
        },
        {
          value: '0',
          label: '未禁用'
        }
      ],
      // 给获取用户数据设置查询条件
      querycdt: {
        // 查询关键字
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页获取记录条数
        pagesize: 3,
        // 总记录条数
        tot: 0
      }
    }
  },
  methods: {
    // 获取用户列表数据
    getuserList() {
      this.$http
        .post('/user_list', JSON.stringify(this.tableList))
        .then(res => {
          this.userList = res.data
        })
    },
    // 按需搜索
    search() {
      this.$http
        .post('/user_list', JSON.stringify(this.tableList))
        .then(res => {
          this.userList = res.data
        })
    },
    /**  数据分页相关1 */
    // 每条记录条数变化的回调处理
    handleSizeChange(arg) {
      // arg: 变化后的记录条数
      // console.log(arg)
      this.querycdt.pagesize = arg
      // 重新根据条件获得数据
      this.getUserInfos()
    },
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      // console.log(arg)
      this.querycdt.pagenum = arg
      // 根据变化后的页码重新获得数据
      this.getUserInfos()
    },
    // 修改用户状态的方法
    changeState(uid) {
      const data = {
        token: window.sessionStorage.getItem('token'),
        id: uid
      }
      this.$http.post('/user_status', JSON.stringify(data)).then(res => {
        if (res.status !== 200) {
          return this.$message.error('修改状态失败')
        }
        this.$message.success('修改状态成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  display: flex;
  height: 50px;
  li {
    list-style: none;
    margin-right: 20px;
    input {
      height: 35px;
      font-size: 20px;
    }
  }
  .btn {
    background-color: #15a46c;
    color: #fff;
    width: 80px;
    height: 40px;
  }
}
</style>
