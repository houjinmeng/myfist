<template>
  <div style="text-align:center">
    <ul>
      <li>
        微信号：
        <input>
      </li>
      <li>
        手机号：
        <input>
      </li>
      <li>
        用户状态：
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
      <el-table-column prop="date" label="序号" width="200"></el-table-column>
      <el-table-column prop="name" label="微信昵称" width="300"></el-table-column>
      <el-table-column prop="address" label="微信号" width="300"></el-table-column>
      <el-table-column prop="address" label="手机号"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
ul {
  padding-left: 5px;
  display: inline-block;
  height: 50px;
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
