<template>
  <div style="text-align:center">
    <div class="topbtn">
      <el-button id="newbtn" @click="a">新建</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="260" align="center"></el-table-column>
      <el-table-column prop="name" label="管理账号" width="300" align="center"></el-table-column>
      <el-table-column prop="address" label="绑定微信号" width="300" align="center"></el-table-column>
      <el-table-column prop="address" label="账号角色" width align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            @click="resetPass(info.row.id)"
            style="background-color:#0e9692;color:#fff"
          >重置密码</el-button>
          <el-button size="mini" style="background-color:#15a46c;color:#fff">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    <!--重置密码对话框-->
    <el-dialog title="重置密码" :visible.sync="resetPssDialogVisible" width="30%" :modal="false">
      <div id="dialogcontent">
        <div>
          <span>账号：</span>
          <input type="text">
        </div>
        <div>
          <span>新密码：</span>
          <input type="text">
        </div>
        <div>
          <span>确认密码：</span>
          <input type="text">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
          style="background-color:#15a46c"
        >保 存</el-button>
      </span>
    </el-dialog>
    <!-- 点击查看弹框 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <div style="text-align:center">您好，您选择的设备时间被占用，请重新选择设备或者更改投放时间</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      ],
      resetPssDialogVisible: false,
      centerDialogVisible: false
    }
  },
  methods: {
    a() {
      this.centerDialogVisible = true
    },
    resetPass() {
      this.resetPssDialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
// 新建按钮
.topbtn {
  margin-bottom: 15px;
  overflow: hidden;
  #newbtn {
    float: right;
    width: 100px;
    height: 40px;
    background-color: #117c67;
    color: #fff;
  }
}
#dialogcontent {
  div {
    margin-top: 10px;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
      font-size: 16px;
    }
    input {
      height: 30px;
      width: 200px;
    }
  }
}
</style>
