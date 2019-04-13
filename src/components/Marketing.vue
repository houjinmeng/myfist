<template>
  <div>
    <!-- 头部搜索区域 -->
    <ul style="margin-left:32px" class="top_search">
      <li>
        设备名称：
        <input>
      </li>
      <li class="rili">
        设备地点：
        <input type="text">
      </li>
    </ul>
    <ul class="top_search">
      <li>
        投放人手机号：
        <input>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">投放时间：</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn">搜索</el-button>
      </li>
    </ul>
    <!-- 订单表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" align="center"></el-table-column>
      <el-table-column prop="name" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="address" label="设备地点" align="center"></el-table-column>
      <el-table-column prop="address" label="投放时间" align="center"></el-table-column>
      <el-table-column prop="address" label="投放人手机号" align="center"></el-table-column>
      <el-table-column prop="address" label="营销号类型" align="center"></el-table-column>
      <el-table-column prop="address" label="营销账号" align="center"></el-table-column>
      <el-table-column prop="address" label="被扫描次数" align="center"></el-table-column>
      <el-table-column prop="address" label="投放素材" align="center"></el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <div style="width:100%;text-align:center;">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接收表格数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>
<style>
</style>
