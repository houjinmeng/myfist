<template>
  <div>
    <ul>
      <li>
        订单号：
        <input>
      </li>
      <li>
        可用状态：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-button class="btn">搜索</el-button>
      </li>
    </ul>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Id" width="180"></el-table-column>
      <el-table-column prop="name" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="address" label="订单手机号"></el-table-column>
      <el-table-column prop="address" label="订单金额/元"></el-table-column>
      <el-table-column prop="address" label="支付状态"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <div style="width:100%;text-align:center;margin-top:400px">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
<style lang="less" scoped>
ul {
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
  li {
    float: left;
    list-style: none;
    margin-right: 120px;
    height: 50px;
    input {
      height: 40px;
      font-size: 20px;
    }
  }
  .rili {
    display: flex;
    justify-content: space-between;
  }
  li:last-child {
    margin-right: 0;
  }
  .btn {
    background-color: #15a46c;
    color: #fff;
    width: 100px;
    height: 40px;
  }
}
</style>
