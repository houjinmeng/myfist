<template>
  <div style="text-align:center">
    <ul>
      <li>
        微信号：
        <input>
      </li>
      <li>
        手机号：
        <input v-model="keyword.phone">
      </li>
      <li>
        审核状态：
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
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="index" label="序号" width="200"></el-table-column>
      <el-table-column prop="nick" label="微信昵称" width="300"></el-table-column>
      <el-table-column prop="gender" label="微信号" width="300"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="type" label="状态">
        <el-switch
          v-model="info.row.type"
          slot-scope="info"
          @change="changeState(info.row.id, info.row.type)"
        ></el-switch>
      </el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getuserList()
  },
  data() {
    return {
      keyword: {
        phone: '',
        status: '',
        token: window.sessionStorage.getItem('token')
      },
      userList: [],
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
      value: ''
    }
  },
  methods: {
    getuserList() {
      this.$http.post('/user_list').then(res => {
        this.userList = res.data
        console.log(this.userList)
      })
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  height: 50px;
  display: flex;
  li {
    list-style: none;
    flex: 1;
    input {
      height: 40px;
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
