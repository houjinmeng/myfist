<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul style="margin-left:32px" class="top_search">
      <li>
        设备名称：
        <input v-model="tableList.keyword.machine_name">
      </li>
      <li class="rili">
        设备地点：
        <input type="text" v-model="tableList.keyword.address">
      </li>
    </ul>
    <ul class="top_search">
      <li>
        投放人手机号：
        <input
          v-model="tableList.keyword.phone"
          oninput="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          maxlength="11"
          @blur="test"
        >
        <div v-show="hintShow" style="color:red;padding-left:55px;font-size:14px">{{hint}}</div>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">投放时间：</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" :editable="false"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            :editable="false"
          ></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <!-- 订单表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="machine_name" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="address" label="设备地点" align="center"></el-table-column>
      <el-table-column label="投放时间" align="center">
        <template slot-scope="info">
          <span>{{info.row.start_time*1000|formatDate}}</span>-
          <span>{{info.row.end_time*1000|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="投放人手机号" align="center"></el-table-column>
      <el-table-column prop="type" label="营销号类型" align="center"></el-table-column>
      <el-table-column prop="address" label="营销账号" align="center"></el-table-column>
      <el-table-column prop="click" label="被扫描次数" align="center"></el-table-column>
      <el-table-column label="二维码" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="preview(info.row.new_code)"
          >预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
      :current-page="tableList.page"
      :page-size="10"
    ></el-pagination>
    <!-- 预览二维码对话框 -->
    <el-dialog title="二维码预览" :visible.sync="dialogTableVisible" width="20%">
      <img :src="code" alt>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getList()
  },
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy.MM.dd') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      // 限制投放结束日期
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < this.value1
        }
      },
      hintShow: false, // 提示语显示
      hint: '信息填写错误', // 提示语
      // 接收表格数据
      tableData: [],
      // 总记录数据条数
      tot: 10,
      // 获取表格数据要传的参
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
        keyword: {
          machine_name: '',
          address: '',
          phone: '',
          start_time: '',
          end_time: ''
        }
      },
      // 日历默认值
      value1: '',
      value2: '',
      // 接收素材二维码
      code: '',
      // 预览对话框显示隐藏
      dialogTableVisible: false
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
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getList()
    },
    // 获取营销号列表数据
    getList() {
      this.$http
        .post('/ad_qrcode', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data.data
          this.tot = res.data.count
        })
    },
    // 按条件搜索
    search() {
      if (this.value1.length !== 0 && this.value2.length === 0) {
        this.$message.warning('请选择结束日期')
        return false
      }
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.getList()
    },
    // 预览二维码
    preview(uid) {
      this.code = ''
      this.dialogTableVisible = true
      this.code = uid
    }
  }
}
</script>
<style>
</style>
