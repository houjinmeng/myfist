<template>
  <div>
    <ul>
      <li>
        <input placeholder="名称、区域">
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
      <el-table-column prop="machine_id" label="Id" width="180"></el-table-column>
      <el-table-column prop="machine_name" label="设备名称" width="180"></el-table-column>
      <el-table-column prop="address" label="设备地点"></el-table-column>
      <el-table-column prop="is_online" label="可用状态"></el-table-column>
      <el-table-column prop="count_down" label="剩余时长"></el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <div style="width:100%;text-align:center;margin-top:400px">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getmachineList()
  },
  data() {
    return {
      // 获取列表数据所传参数
      tableList: {
        token: window.sessionStorage.getItem('token')
        // keyword: {
        //   phone: '',
        //   status: ''
        // }
      },
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
      // 接收设备列表数据
      tableData: []
    }
  },
  methods: {
    // 获取设备列表数据
    getmachineList() {
      this.$http
        .post('/machine_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
        })
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
      text-align: center;
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
