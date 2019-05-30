<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        订单号：
        <input
          oninput="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入订单号"
          v-model="tableList.keyword.check_id"
        >
      </li>
      <li>
        支付状态：
        <el-select placeholder="请选择" v-model="tableList.keyword.status">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">提交时间：</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" :editable='false'></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            :editable='false'
          ></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <!-- 订单表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%" ref="table">
      <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
      <el-table-column prop="id" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="phone" label="订单手机号" align="center"></el-table-column>
      <el-table-column prop="order_amount" label="订单金额/元" align="center"></el-table-column>
      <el-table-column prop="is_pay" label="支付状态" align="center"></el-table-column>
      <el-table-column prop="pay_type" label="支付方式" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="toogleExpand(info.row)"
          >订单详情</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" width="5">
        <template slot-scope>
          <div class="bottom_content">
            <span>
              <i>设备ID：</i>
              {{machine_id}}
            </span>
            <span>
              <i>连续播放次数：</i>
              {{data.repeat_number}} 次
            </span>
            <span style="margin-right:0">
              <i>设备地点：</i>
              {{address}}
            </span>
          </div>
          <div class="bottom_content" style="margin-top:20px">
            <span>
              <i>设备名称：</i>
              {{machine_name}}
            </span>
            <span>
              <i>每小时播放次数：</i>
              {{data.play_count}} 次
            </span>
            <span style="margin-right:0">
              <i>投放时间：</i>
              {{data.start_time*1000|formatDate}} 至 {{data.end_time*1000|formatDate}}
            </span>
            <span class="right" style="width:170px">
              投放素材：
              <el-button
                size="small"
                style="background-color: #15a46c;color: #fff;width:80px"
                @click="preview"
              >预览</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="tableList.page"
      :page-size="10"
      :total="tot"
    ></el-pagination>
    <!-- 预览素材 -->
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible1">
      <img
        style="width:50%;height:50%"
        v-for="item in imgData"
        :src="item"
        :v-if="imgFlag"
        :key="item.index"
      >
      <video
        :key="item.index"
        v-for="item in videoData"
        :v-if="videoFlag"
        :src="item"
        preload
        height="300px"
        width="50%"
        controls
      ></video>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getcheckList()
  },
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy/MM/dd') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
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
      // 预览素材
      videoData: [],
      imgData: [],
      imgFlag: false,
      videoFlag: false,
      dialogTableVisible1: false,
      // 记录数据总条数
      tot: 10,
      // 获取表格数据要传的参
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
        keyword: {
          check_id: '',
          status: '',
          start_time: '',
          end_time: ''
        }
      },
      // 下拉日历的数据
      value1: '',
      value2: '',
      // 下拉框死数据
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '已支付'
        },
        {
          value: '0',
          label: '未支付'
        }
      ],
      // 接收订单表格数据
      tableData: [],
      // 接收订单详情数据
      data: [],
      machine_id: '',
      machine_name: '',
      address: ''
    }
  },
  methods: {
    // 预览
    preview() {
      this.imgData = []
      this.videoData = []
      this.dialogTableVisible1 = true
      const data = this.data.ad
      for (let i = 0; i < data.length; i++) {
        let fileName = data[i].lastIndexOf('.')
        let fileNameLength = data[i].length
        let a = data[i].substring(fileName + 1, fileNameLength)
        if (a === 'jpg' || a === 'pang') {
          this.imgFlag = true
          this.imgData.push(data[i])
        }
        if (a === 'mp4') {
          this.videoFlag = true
          this.videoData.push(data[i])
        }
      }
    },
    // 订单详情
    toogleExpand(row) {
      const data = {
        token: window.sessionStorage.getItem('token'),
        check_id: row.check_id
      }
      this.$http.post('/order_detail', JSON.stringify(data)).then(res => {
        this.data = res.data
        this.machine_id = res.data.machine_id.join(';')
        this.machine_name = res.data.machine_name.join(';')
        this.address = res.data.address.join(';')
        // 展开订单详情
        let table = this.$refs.table
        this.tableData.map(item => {
          if (row.id !== item.id) {
            table.toggleRowExpansion(item, false)
          }
        })
        table.toggleRowExpansion(row)
      })
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getcheckList()
    },
    // 获取订单表格数据方法
    getcheckList() {
      this.$http
        .post('/order_list', JSON.stringify(this.tableList))
        .then(res => {
          const data = res.data.data
          data.forEach(e => {
            e.is_pay = e.is_pay === 1 ? '已支付' : '未支付'
            if (e.pay_type === 1) {
              e.pay_type = '支付宝支付'
            } else if (e.pay_type === 2) {
              e.pay_type = '微信支付'
            } else {
              e.pay_type = '无'
            }
          })
          this.tableData = data
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
      this.getcheckList()
    }
  }
}
</script>
<style lang="less" scoped>
// 订单详情
.bottom_content {
  font-size: 16px;
  margin-left: 50px;
  span {
    display: inline-block;
    width: 400px;
    i {
      font-style: normal;
      display: inline-block;
      // width: 130px;
      // text-align: right
    }
  }
}
</style>
