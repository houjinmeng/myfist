<template>
  <div style="text-align:center">
    <ul class="top_search">
      <li>
        手机号：
        <input
          oninput="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          v-model="tableList.keyword.phone"
        >
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">提交时间：</span>
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"  value-format="timestamp"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间"  value-format="timestamp"></el-date-picker>
        </div>
      </li>
      <li>
        审核状态：
        <el-select v-model="tableList.keyword.status" placeholder="请选择">
          <el-option
            v-for="item in options"
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
    <!-- table表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="150" align="center"></el-table-column>
      <el-table-column prop="machine_name" label="设备名称" width="150" align="center"></el-table-column>
      <el-table-column prop="machine_address" label="设备地点" width="300" align="center"></el-table-column>
      <el-table-column prop="nick" label="设备投放人" align="center"></el-table-column>
      <el-table-column prop="phone" label="投放人手机号" align="center"></el-table-column>
      <el-table-column prop="creat_time" label="提交审核时间" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="showDialog(info.row.id)"
          >查看</el-button>
          <el-button
            size="mini"
            style="background-color:#186fb2;color:#fff"
            @click="passDialog(info.row.id)"
          >通过</el-button>
          <el-button
            size="mini"
            style="background-color:#15a46c;color:#fff"
            @click="rejectDialog(info.row.id)"
          >驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 广告详情及审核流程 -->
    <div id="box" v-if="show">
      <div id="left">
        <div>
          <span>广告素材：</span>
          <button>预览</button>
        </div>
        <div>
          <span>背景音乐：</span>
          <button>预览</button>
        </div>
        <div>
          <span>投放时间：</span>
          <span class="time">{{checkMessage.start_time*1000|formatDate}}</span> -
          <span class="time">{{checkMessage.end_time*1000|formatDate}}</span>
        </div>
        <div>
          <span>连续播放次数：</span>
          <span class="time">{{checkMessage.repeat_number}}</span>
        </div>
        <div>
          <span>每小时播放次数：</span>
          <span class="time">{{checkMessage.play_count}}</span>
        </div>
        <div>
          <span>花费金额：</span>
          <span class="time">¥ {{checkMessage.order_amount}}</span>
        </div>
      </div>
      <div id="right"></div>
    </div>
    <!-- 数据分页展示 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
    ></el-pagination>
    <!-- 驳回对话框 -->
    <el-dialog title="提示：请输入驳回原因" :visible.sync="centerDialogVisible" width="20%" center>
      <textarea cols="30" rows="5" v-model="rejectMessage" style="margin-left:48px"></textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false;rejectMessage=''">取 消</el-button>
        <el-button type="primary" @click="reject">驳 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    // 页面加载获取列表数据
    this.getcheckList()
  },
  data() {
    return {
      // 接收驳回用户id
      rejectId: '',
      // 接收驳回理由
      rejectMessage: '',
      // 驳回对话框显示隐藏
      centerDialogVisible: false,
      // 点击查看是否显示条件
      show: false,
      // 记录数据总条数
      tot: 0,
      // 接收审核素材详细信息
      checkMessage: [],
      // 获取表格数据要传的参
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: '',
        keyword: {
          phone: '',
          status: '',
          start_time: '',
          end_time: ''
        }
      },
      // 下拉日历的数据
      value1: '',
      value2: '',
      // 审核状态下拉框数据
      options: [
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '审核成功'
        },
        {
          value: '2',
          label: '审核失败'
        }
      ],
      value: '',
      // 接收表格数据
      tableData: []
    }
  },
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    }
  },
  methods: {
    // 按需搜所
    search() {
      console.log(this.value1)
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.$http
        .post('/check_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
        })
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getcheckList()
    },
    // 获取审核表格数据方法
    getcheckList() {
      this.$http
        .post('check_list', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
          this.tot = this.tableData.length
        })
    },
    // 查看 获取审核素材具体信息
    showDialog(uid) {
      const data = {
        token: window.sessionStorage.getItem('token'),
        check_id: uid
      }
      this.$http.post('/check_detail', JSON.stringify(data)).then(res => {
        this.show = true
        this.checkMessage = res.data
      })
    },
    // 通过审核事件
    passDialog(uid) {
      this.$confirm('确定通过审核么?', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '返回',
        type: 'success'
      })
        .then(() => {
          const data = {
            token: window.sessionStorage.getItem('token'),
            check_id: uid
          }
          this.$http.post('/check_suc', JSON.stringify(data)).then(res => {
            if (res.status !== 200) {
              return this.$message.error('通过审核失败')
            }
            this.$message.success('通过审核成功')
            this.getcheckList()
          })
        })
        .catch(() => {})
    },
    // 驳回审核事件
    rejectDialog(uid) {
      this.centerDialogVisible = true
      this.rejectId = uid
    },
    // 驳回弹窗发送驳回理由
    reject() {
      this.centerDialogVisible = false
      const data = {
        token: window.sessionStorage.getItem('token'),
        check_id: this.rejectId,
        explain: this.rejectMessage
      }
      this.$http.post('/check_err', JSON.stringify(data)).then(res => {
        if (res.status !== 200) {
          return this.$message.error('驳回审核失败')
        }
        this.$message.success('驳回审核成功')
        this.getcheckList()
        this.rejectMessage = ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
// 底部广告详情盒子样式
#box {
  display: flex;
  justify-content: space-between;
  text-align: left;
  #left {
    flex: 1;
    div {
      margin-top: 20px;
      button {
        width: 80px;
        height: 24px;
        background-color: #169bd5;
        color: #fff;
        border: 0 none;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .time {
      text-align: left;
      width: 128px;
    }
    span {
      display: inline-block;
      width: 150px;
      text-align: right;
    }
  }
  #right {
    flex: 1;
  }
}
</style>
