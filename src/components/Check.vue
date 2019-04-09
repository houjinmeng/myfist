<template>
  <div style="text-align:center">
    <ul>
      <li>
        手机号：
        <input>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">提交时间：</span>
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
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
    <el-card class="card-box">
      <!-- table表格数据 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="ID" width="150"></el-table-column>
        <el-table-column prop="name" label="设备名称" width="150"></el-table-column>
        <el-table-column prop="address" label="设备地点" width="300"></el-table-column>
        <el-table-column prop="address" label="设备投放人" width></el-table-column>
        <el-table-column prop="address" label="投放人手机号"></el-table-column>
        <el-table-column prop="address" label="提交审核时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="info">
            <el-button
              type="primary"
              size="mini"
              @click="resetPass"
              style="background-color:#0e9692"
            >查看</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="delUser(info.row.id)"
              style="background-color:#186fb2"
            >通多</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="showFenpeiDialog(info.row.id)"
              style="background-color:#15a46c"
            >驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 广告详情及审核流程 -->
      <div id="box">
        <div id="left">
          <!-- <div>广告素材：<input type="text"><button>预览</button></div>
          <div>投放时间：<input type="text"></div>-->
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item>
              广告素材：
              <el-input v-model="formLabelAlign.type" readonly="true"></el-input>
            </el-form-item>
            <el-form-item>
              投放时间：
              <el-input v-model="formLabelAlign.type" readonly="true"></el-input>
            </el-form-item>
            <el-form-item>
              连续播放次数：
              <el-input v-model="formLabelAlign.type" readonly="true"></el-input>
            </el-form-item>
            <el-form-item>
              每小时播放次数：
              <el-input v-model="formLabelAlign.type" readonly="true"></el-input>
            </el-form-item>
            <el-form-item>
              花费金额：<el-input v-model="formLabelAlign.type" readonly="true"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div id="right"></div>
      </div>
      <!-- 数据分页展示 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 顶部导航栏样式
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
// 底部广告详情盒子样式
#box {
  display: flex;
  justify-content: space-between;
  #left {
    flex: 1;
    .el-input {
      width: 50%;
    }
  }
  #right {
    flex: 1;
  }
}
</style>
