<template>
  <div style="text-align:center">
    <div class="top">
      <el-button>新建</el-button>
    </div>
    <el-card class="card-box">
      <el-table :data="idInfos" stripe style="width: 100%">
        <el-table-column prop="date" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="管理账号" width="180"></el-table-column>
        <el-table-column prop="address" label="绑定微信号" width="180"></el-table-column>
        <el-table-column prop="address" label="账号角色"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
      <!-- 数据分页展示 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idInfos: []
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 15px;
  overflow: hidden;
  button {
    float: right;
    width: 100px;
    height: 40px;
    background-color: #117c67;
    color: #fff;
  }
}
</style>
