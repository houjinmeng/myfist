<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        手机号：
        <input
          oninput="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          v-model="tableList.keyword.phone"
          maxlength="11"
          @blur="test"
        >
        <div v-show="hintShow" style="color:red;padding-left:20px;font-size:14px">{{hint}}</div>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">提交时间：</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
            :editable="false"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
            :picker-options="pickerOptions"
            :editable="false"
          ></el-date-picker>
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
      <el-table-column label="提交审核时间" align="center">
        <template slot-scope="info">{{info.row.create_time*1000|formatDate}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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
    <!-- 数据分页展示 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
      :current-page="tableList.page"
      :page-size="5"
    ></el-pagination>
    <!-- 广告详情及审核流程 -->
    <div id="box" v-if="show">
      <div id="left">
        <div>
          <span>广告素材：</span>
          <button @click="preview">预览</button>
        </div>
        <div>
          <span>背景音乐：</span>
          <button @click="bgm_preview">预览</button>
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
      <!-- 审核流程示意图 -->
      <div id="right">
        <el-steps
          direction="vertical"
          :active="1"
          style="height:200px;margin-top:15px"
          v-if="checkShow1"
        >
          <el-step title="提交审核（已提交）"></el-step>
          <el-step title="一级审核（未审核）"></el-step>
          <el-step title="二级审核（未审核）"></el-step>
        </el-steps>
        <el-steps
          direction="vertical"
          :active="2"
          style="height:200px;margin-top:15px"
          v-if="checkShow2"
        >
          <el-step title="提交审核（已提交）"></el-step>
          <el-step title="一级审核（已审核）"></el-step>
          <el-step title="二级审核（未审核）"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- 驳回对话框 -->
    <el-dialog title="提示：请输入驳回原因" :visible.sync="centerDialogVisible" width="30%" center>
      <textarea cols="30" rows="5" v-model="rejectMessage" style="margin-left:28%"></textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false;rejectMessage=''">取 消</el-button>
        <el-button type="primary" @click="reject">驳 回</el-button>
      </span>
    </el-dialog>
    <!-- 预览素材对话框 -->
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible" @close="dialogClose">
      <img
        style="width:50%;height:50%"
        v-for="item in imgData"
        :src="item"
        :v-if="imgFlag"
        :key="item.index"
      >
      <video
        :key="item.index"
        v-for="item in videoData"
        :v-if="videoFlag"
        :src="item"
        preload
        height="300px"
        width="50%"
        controls
      ></video>
    </el-dialog>
    <!-- 背景音乐 -->
    <el-dialog title="背景音乐预览" :visible.sync="dialogTableVisible1" @close="dialogClose">
      <audio
        :key="item.index"
        v-for="item in audioData"
        :src="item"
        controls
        preload
        :v-if="audioFlag"
      ></audio>
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
      // 限制投放结束日期
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < this.value1
        }
      },
      hintShow: false, // 提示语显示
      hint: '信息填写错误', // 提示语
      // 背景音乐
      dialogTableVisible1: false,
      // 审核流程显示隐藏
      checkShow1: false,
      checkShow2: false,
      // 预览对话框显示隐藏
      dialogTableVisible: false,
      // 接收驳回用户id
      rejectId: '',
      // 接收驳回理由
      rejectMessage: '',
      // 驳回对话框显示隐藏
      centerDialogVisible: false,
      // 点击查看是否显示条件
      show: false,
      // 记录数据总条数
      tot: 10,
      // 接收审核素材详细信息
      checkMessage: [],
      // 获取表格数据要传的参
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
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
      tableData: [],
      // 接收传回的素材数据
      imgData: [],
      videoData: [],
      audioData: [],
      imgFlag: false,
      videoFlag: false,
      audioFlag: false
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
    test() {
      // 验证手机号
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (this.tableList.keyword.phone === '') {
        this.hintShow = false
        this.hint = ''
      } else if (
        this.tableList.keyword.phone.length <= 10 ||
        !reg.test(this.tableList.keyword.phone)
      ) {
        this.hintShow = true
        this.hint = '请输入正确的手机号'
        return false
      } else {
        this.hintShow = false
      }
      return true
    },
    // 对话框关闭清空内容
    dialogClose() {
      this.audioData = []
      this.videoData = []
      this.imgData = []
    },
    // 预览背景音乐
    bgm_preview() {
      this.dialogTableVisible1 = true
      this.audioData = this.audioData.concat(this.checkMessage.bgm)
      if (this.audioData === []) {
        return '无背景音乐'
      } else {
        this.audioFlag = true
      }
    },
    // 预览素材
    preview() {
      this.dialogTableVisible = true
      const data = this.checkMessage.ad
      for (let i = 0; i < data.length; i++) {
        let fileName = data[i].lastIndexOf('.')
        let fileNameLength = data[i].length
        let a = data[i].substring(fileName + 1, fileNameLength)
        if (
          a === 'jpg' ||
          a === 'png' ||
          a === 'jpeg' ||
          a === 'gif' ||
          a === 'bmp' ||
          a === 'tif' ||
          a === 'psd' ||
          a === 'dng' ||
          a === 'cr2' ||
          a === 'nef'
        ) {
          this.imgFlag = true
          this.imgData.push(data[i])
        }
        if (
          a === 'mp4' ||
          a === 'AVI' ||
          a === 'mov' ||
          a === 'rmvb' ||
          a === 'rm' ||
          a === 'FLV' ||
          a === '3GP'
        ) {
          this.videoFlag = true
          this.videoData.push(data[i])
        }
      }
    },
    // 按需搜所
    search() {
      if (this.value1.length !== 0 && this.value2.length === 0) {
        this.$message.warning('请选择结束日期')
        return false
      }
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.getcheckList()
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
          this.tableData = res.data.data
          this.tot = res.data.count
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
        if (this.checkMessage.level === 2) {
          this.checkShow2 = true
        } else {
          this.checkShow1 = true
        }
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
            this.show = false
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
  overflow: hidden;
  text-align: left;
  position: relative;
  border-top: 2px solid #ccc;
  margin-top: 20px;
  #close:hover {
    background-color: red;
    color: #fff;
  }
  #left {
    float: left;
    padding-left: 208px;
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
    float: left;
    padding-left: 570px;
  }
}
</style>
