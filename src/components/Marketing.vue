<template>
  <div>
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
