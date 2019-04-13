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
        <el-table-column prop label="操作" align="center">
          <el-button size="medium" style="background-color:#0e9692;color:#fff">查看</el-button>
        </el-table-column>
      </el-table>
      <div id="right">
          <div class="block" style="margin-top:20px">
            <span class="demonstration">开始日期：</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"  value-format="yyyy/MM/dd"></el-date-picker>
          </div>
          <ul>
            <li><span>{{value1}}/12:00</span>至<span>{{value1}}13:00</span></li>
            <li><span>{{value1}}13:00</span>至<span>{{value1}}14:00</span></li>
            <li><span>{{value1}}14:00</span>至<span>{{value1}}15:00</span></li>
            <li><span>{{value1}}15:00</span>至<span>{{value1}}16:00</span></li>
            <li><span>{{value1}}16:00</span>至<span>{{value1}}17:00</span></li>
            <li><span>{{value1}}17:00</span>至<span>{{value1}}18:00</span></li>
            <li><span>{{value1}}18:00</span>至<span>{{value1}}19:00</span></li>
            <li><span>{{value1}}19:00</span>至<span>{{value1}}20:00</span></li>
            <li><span>{{value1}}21:00</span>至<span>{{value1}}22:00</span></li>
            <li><span>{{value1}}22:00</span>至<span>{{value1}}23:00</span></li>
            <li><span>{{value1}}23:00</span>至<span>{{value1}}00:00</span></li>
            <li><span>{{value1}}00:00</span>至<span>{{value1}}01:00</span></li>
          </ul>
      </div>
    </div>
    <!-- 数据分页展示 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
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
      value1: '',
      // 总记录数据条数
      tot: 100,
      // 获取表格数据要传的参
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: '',
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
    // 获取数据列表
    getList() {
      this.$http
        .post('/statistical_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
          this.tot = this.tableData.length
        })
    },
    // 按需搜所
    search() {
      this.$http
        .post('/statistical_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
        })
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      // console.log(arg)
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getuserList()
    }
  }
}
</script>
<style lang="less" scoped>
#box {
  display: flex;
  #right {
    width: 33%;
    background-color: #fff;
    margin-top: 16px;
  }
  li{
    list-style: none;
  }
}
</style>
