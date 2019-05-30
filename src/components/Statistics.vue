<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul style="margin-left:32px" class="top_search">
      <li>
        设备名称：
        <input v-model="tableList.keyword.machine_name">
      </li>
      <li>
        设备地点：
        <input type="text" v-model="tableList.keyword.address">
      </li>
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <div id="box">
      <!-- 订单表格数据展示 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="200" align="center"></el-table-column>
        <el-table-column prop="machine_name" label="设备名称" align="center"></el-table-column>
        <el-table-column prop="address" label="设备地点" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="info">
            <el-button
              size="medium"
              style="background-color:#0e9692;color:#fff"
              @click="look(info.row.machine_id)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 点击查看选择日期 -->
      <div id="right" v-if="show">
        <span id="clock" @click="show=false">X</span>
        <div class="block" style="margin-top:20px">
          <span class="demonstration">选择日期：</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"></el-date-picker>
        </div>
        <ul @click="lookList(this)">
          <li>
            <span>{{value1}}/12:00</span>至
            <span>{{value1}}/13:00</span>
          </li>
          <li>
            <span>{{value1}}/13:00</span>至
            <span>{{value1}}/14:00</span>
          </li>
          <li>
            <span>{{value1}}/14:00</span>至
            <span>{{value1}}/15:00</span>
          </li>
          <li>
            <span>{{value1}}/15:00</span>至
            <span>{{value1}}/16:00</span>
          </li>
          <li>
            <span>{{value1}}/16:00</span>至
            <span>{{value1}}/17:00</span>
          </li>
          <li>
            <span>{{value1}}/17:00</span>至
            <span>{{value1}}/18:00</span>
          </li>
          <li>
            <span>{{value1}}/18:00</span>至
            <span>{{value1}}/19:00</span>
          </li>
          <li>
            <span>{{value1}}/19:00</span>至
            <span>{{value1}}/20:00</span>
          </li>
          <li>
            <span>{{value1}}/21:00</span>至
            <span>{{value1}}/22:00</span>
          </li>
          <li>
            <span>{{value1}}/22:00</span>至
            <span>{{value1}}/23:00</span>
          </li>
          <li>
            <span>{{value1}}/23:00</span>至
            <span>{{value1}}/00:00</span>
          </li>
          <li>
            <span>{{value1}}/00:00</span>至
            <span>{{value1}}/01:00</span>
          </li>
        </ul>
      </div>
      <!-- 查看具体时间段的列表 -->
      <el-dialog :visible.sync="lookTableVisible">
        <div v-for="item in lookMessage" :key="item.index" id="timeList">
          <span>投放人: {{item.key}}</span>
          <span v-for="(item2,k) in item.value" :key="k">素材{{k+1}}播放次数：{{item2.play_count}}次</span>
        </div>
      </el-dialog>
    </div>
    <!-- 数据分页展示 -->
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
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      // 接收查看具体时间段列表数据
      lookMessage: [],
      // 接收点击查看当前id
      Id: '',
      // 点击查看显示隐藏
      show: false,
      lookTableVisible: false,
      // 日历默认值
      value1: '',
      // 总记录数据条数
      tot: 10,
      // 获取表格数据要传的参
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
        keyword: {
          machine_name: '',
          address: ''
        }
      },
      // 接收表格数据
      tableData: []
    }
  },
  methods: {
    // 获取查看具体时间段数据
    lookList(ele) {
      // var e = ''
      // e = e || window.event
      // var target = e.target || e.srcElement
      // var li = document.querySelectorAll('li')
      // for (var i in li) {
      //   if (target === li[i]) {
      //     var value = (parseInt(i) - 6) * 3600
      //   }
      // }
      // var date = new Date(this.value1)
      // var time = Date.parse(date) / 1000 + value
      const data = {
        token: window.sessionStorage.getItem('token'),
        machine_id: this.Id,
        timestamp: 1554699600
      }
      this.$http.post('/statistical_detail', JSON.stringify(data)).then(res => {
        this.lookMessage = Object.keys(res.data).map((item, index) => ({
          key: Object.keys(res.data)[index],
          value: res.data[item]
        }))
        this.lookTableVisible = true
      })
    },
    // 点击查看按钮
    look(uid) {
      this.show = true
      this.Id = uid
      this.getDate()
    },
    // 获取数据列表
    getList() {
      this.$http
        .post('/statistical_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data.data
          this.tot = res.data.count
        })
    },
    // 按需搜所
    search() {
      this.getList()
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      // console.log(arg)
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getList()
    },
    // 获取当前日期
    getDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      this.value1 = year + '/' + month + '/' + day
    }
  }
}
</script>
<style lang="less" scoped>
// 查看具体时间素材弹框
#timeList{
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  span{
    margin-right: 30px
  }
}
// 点击查看日期列表
#box {
  display: flex;
  #right {
    width: 28%;
    background-color: #fff;
    margin-top: 16px;
    position: relative;
  }
  #clock {
    position: absolute;
    right: 20px;
    top: 10px;
    color: #000;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  #clock:hover {
    background-color: red;
    color: #fff;
  }
  li {
    list-style: none;
    cursor: pointer;
    margin-top: 10px;
    span {
      pointer-events: none;
    }
  }
}
</style>
