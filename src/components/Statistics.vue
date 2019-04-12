<template>
  <div>
    <!-- 头部搜索区域 -->
    <ul style="margin-left:32px">
      <li>
        设备名称：
        <input>
      </li>
      <li class="rili">
        设备地点：
        <input type="text">
      </li>
    </ul>
    <ul>
      <li>
        投放人手机号：
        <input>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">投放时间：</span>
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn">搜索</el-button>
      </li>
    </ul>
    <!-- 订单表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="180" align="cneter"></el-table-column>
      <el-table-column prop="name" label="设备名称" width="100" align="center"></el-table-column>
      <el-table-column prop="address" label="设备地点" align="center"></el-table-column>
      <el-table-column prop="address" label="投放时间" align="center"></el-table-column>
      <el-table-column prop="address" label="投放人手机号" align="center"></el-table-column>
      <el-table-column prop="address" label="播放次数/天" align="center"></el-table-column>
      <el-table-column prop="address" label="播放素材" align="center"></el-table-column>
      <el-table-column prop="address" label="素材比例" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center"></el-table-column>
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
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value6: ''
    }
  }
}
</script>
<style lang="less" scoped>
// 头部搜索区域样式
ul {
  display: flex;
  height: 50px;
  li {
    list-style: none;
    margin-right: 40px;
    input {
      height: 35px;
      font-size: 20px;
    }
  }
  .btn {
    background-color: #15a46c;
    color: #fff;
    width: 100px;
    height: 40px;
  }
}
</style>
