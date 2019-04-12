<template>
  <div>
    <!-- 头部搜索区域 -->
    <ul>
      <li>
        订单号：
        <input>
      </li>
      <li>
        支付状态：
        <el-select v-model="value" placeholder="请选择">
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
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn">搜索</el-button>
      </li>
    </ul>
    <!-- 订单表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Id" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="订单编号" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="订单手机号" align="center"></el-table-column>
      <el-table-column prop="address" label="订单金额/元" align="center"></el-table-column>
      <el-table-column prop="address" label="支付状态" align="center"></el-table-column>
      <el-table-column prop="address" label="支付方式" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center"></el-table-column>
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
      // 下拉日历的数据
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      value1: '',
      value2: '',
      // 下拉框死数据
      options: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      value: '',
      // 接收订单表格数据
      tableData: []
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  display: flex;
  height: 50px;
  li {
    list-style: none;
    margin-right: 20px;
    input {
      height: 35px;
      font-size: 20px;
    }
  }
  .rili {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    background-color: #15a46c;
    color: #fff;
    width: 100px;
    height: 40px;
  }
}
</style>
