<template>
  <div class="box">
    <div class="box1 same" style="margin:0;padding-top:5px;flex:3">
      <p id="samebg">广告时长单价设置</p>
      <div style="width:300px">
        <span>5秒/周：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.five"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > 元
        </span>
      </div>
      <div style="width:300px">
        <span>15秒/周：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.fifteen"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > 元
        </span>
      </div>
      <div style="width:300px">
        <span>30秒/周：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.thirty"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > 元
        </span>
      </div>
    </div>
    <div class="box1 same" style="flex:3;padding-top:10px">
      <p id="samebg">广告时长优惠设置</p>
      <div style="width:340px">
        <span>5-15秒：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.five_timeout"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > 元/秒
        </span>
      </div>
      <div style="width:340px">
        <span>15-30秒：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.fifteen_timeout"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > 元/秒
        </span>
      </div>
      <div style="width:340px">
        <span>30秒以上：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.thirty_time"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > 元/秒
        </span>
      </div>
    </div>
    <div class="box1 same" style="flex:4;padding-top:20px">
      <p id="longbg">广告投放周期优惠设置</p>
      <div style="width:360px">
        <span>4周（一个月）：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.one_month_discount"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > %
        </span>
      </div>
      <div style="width:360px">
        <span>13周（3个月）：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.three_month_discount"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > %
        </span>
      </div>
      <div style="width:360px">
        <span>27周（6个月）：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.six_month_discount"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > %
        </span>
      </div>
      <div style="width:360px">
        <span>50周（一年）：</span>
        <span>
          <input
            type="text"
            v-model="priceForm.one_year_discount"
            oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          > %
        </span>
      </div>
    </div>
    <div class="box4 same">
      <button @click="checkPrice">保 存</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getpriceList()
  },
  data() {
    return {
      // 接收价格数据
      priceForm: {
        five: '',
        fifteen: '',
        thirty: '',
        five_timeout: '',
        fifteen_timeout: '',
        thirty_time: '',
        one_month_discount: '',
        three_month_discount: '',
        six_month_discount: '',
        one_year_discount: '',
        token: window.sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    // 获取价格数据
    getpriceList() {
      this.$http
        .post('/price_list', JSON.stringify(this.priceForm))
        .then(res => {
          this.priceForm.five = res.data.five
          this.priceForm.fifteen = res.data.fifteen
          this.priceForm.thirty = res.data.thirty
          this.priceForm.five_timeout = res.data.five_timeout
          this.priceForm.fifteen_timeout = res.data.fifteen_timeout
          this.priceForm.thirty_time = res.data.thirty_time
          this.priceForm.one_month_discount = res.data.one_month_discount
          this.priceForm.three_month_discount = res.data.three_month_discount
          this.priceForm.six_month_discount = res.data.six_month_discount
          this.priceForm.one_year_discount = res.data.one_year_discount
        })
    },
    // 修改价格保存
    checkPrice() {
      this.$http
        .post('/price_control', JSON.stringify(this.priceForm))
        .then(res => {
          if (res.data.status) {
            this.$message.success('修改价格成功')
          } else {
            this.$message.error('修改价格失败')
          }
          this.getpriceList()
        })
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .same {
    background-color: #fff;
    margin-top: 10px;
    padding-bottom: 20px 0;
  }
  #samebg {
    background: url(../assets/img/price.png) no-repeat -23px -10px;
  }
  #longbg {
    background: url(../assets/img/ui.png) no-repeat 0 -9px;
    width: 400px;
  }
  .box1 {
    text-align: center;
    box-sizing: border-box;
    p {
      width: 300px;
      margin: 0 auto;
      font-size: 25px;
    }
    div {
      margin: 0 auto;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
    span {
      font-size: 16px;
    }
    input {
      height: 30px;
      text-align: center;
    }
  }
  .box4 {
    flex: 1;
    text-align: center;
    padding-bottom: 10px;
    button {
      width: 100px;
      height: 40px;
      background-color: #15a46c;
      border: 0 none;
      color: #fff;
      font-size: 15px;
      margin-top: 20px;
    }
  }
}
</style>
