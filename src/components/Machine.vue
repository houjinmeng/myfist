<template>
  <div>
    <ul>
      <li>
        <input placeholder="名称、区域" v-model="tableList.keyword.name">
      </li>
      <li>
        可用状态：
        <el-select v-model="tableList.keyword.is_online" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        禁用状态：
        <el-select v-model="tableList.keyword.is_disable" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="machine_id" label="Id" width="180" align="center"></el-table-column>
      <el-table-column prop="machine_name" label="设备名称" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="设备地点" align="center"></el-table-column>
      <el-table-column prop="is_online" label="可用状态" align="center"></el-table-column>
      <el-table-column prop="count_down" label="剩余时长/s" align="center"></el-table-column>
      <el-table-column prop="is_disable" label="禁用告白" align="center">
        <el-switch
          v-model="info.row.is_disable"
          :active-value="1"
          :inactive-value="2"
          slot-scope="info"
          @change="changeState(info.row.machine_id)"
        ></el-switch>
      </el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <div style="width:100%;text-align:center">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="tot"
      ></el-pagination>
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
      // 总记录数据条数
      tot: 10,
      // 获取列表数据所传参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: '',
        keyword: {
          name: '',
          is_online: '',
          is_disable: ''
        }
      },
      // 可用状态下拉框
      options1: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '2',
          label: '可投放'
        },
        {
          value: '1',
          label: '不可投放'
        }
      ],
      // 禁用状态下拉框
      options2: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '2',
          label: '未禁用'
        },
        {
          value: '1',
          label: '已禁用'
        }
      ],
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
          this.tot = this.tableData.length
        })
    },
    // 按条件搜索
    search() {
      this.$http
        .post('/machine_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
        })
    },
    // 修改用户状态的方法
    changeState(uid) {
      const data = {
        token: window.sessionStorage.getItem('token'),
        machine_id: uid
      }
      this.$http.post('/machine_is_disable', JSON.stringify(data)).then(res => {
        if (res.status !== 200) {
          return this.$message.error('修改状态失败')
        }
        this.$message.success('修改状态成功')
      })
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      // console.log(arg)
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getmachineList()
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
      height: 36px;
      font-size: 18px;
      text-align: center;
      border: 1px solid #dcdfe6;
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
