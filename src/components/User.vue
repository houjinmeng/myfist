<template>
  <div style="text-align:center">
    <!-- 头部搜做区域 -->
    <ul class="top_search">
      <li>
        手机号：
        <input
          v-model="tableList.keyword.phone"
          oninput="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          maxlength="11"
          @blur="test"
        >
        <div v-show="hintShow" style="color:red;padding-left:20px;font-size:14px">{{hint}}</div>
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
      <el-table-column type="index" label="序号" width="200" align="center"></el-table-column>
      <el-table-column prop="nick" label="微信昵称" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column label="最后登录时间" align="center">
        <template slot-scope="info">{{info.row.addtime*1000|formatDate}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
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
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
      :current-page="tableList.page"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getuserList()
  },
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      hintShow: false, // 提示语显示
      hint: '信息填写错误', // 提示语
      // 总记录数据条数
      tot: 10,
      // 获取列表数据所传参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
        keyword: {
          phone: '',
          status: ''
        }
      },
      // 接收列表数据
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
      ]
    }
  },
  methods: {
    test() {
      // 验证手机号
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (this.tableList.keyword.phone === '') {
        this.hintShow = false
        this.hint = ''
      } else if (
        this.tableList.keyword.phone.length <= 10 ||
        !reg.test(this.tableList.keyword.phone)
      ) {
        this.hintShow = true
        this.hint = '请输入正确的手机号'
        return false
      } else {
        this.hintShow = false
      }
      return true
    },
    // 获取用户列表数据
    getuserList() {
      this.$http
        .post('/user_list', JSON.stringify(this.tableList))
        .then(res => {
          this.userList = res.data.data
          this.tot = res.data.count
        })
    },
    // 按需搜索
    search() {
      this.getuserList()
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      // console.log(arg)
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getuserList()
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
</style>
