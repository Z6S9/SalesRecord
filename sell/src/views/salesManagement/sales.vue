<template>
  <div class="header">
    <van-nav-bar title="销售记录" right-text="添加" right-arrow @click-right="goAddRecord">
    </van-nav-bar>
  </div>
  <div class="content">
      <van-cell-group v-for="(item, index) in recordsList">
        <van-cell>
          <van-cell :title="name" :value="item.totalPrice.toFixed(2) + '元'" :label="dateFormat('YYYY-mm-dd HH:MM', item.create_time)" @click="goSaleDetail(item._id)"/>
        </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
  
export default {
   setup() {
     const router = useRouter()
     const { proxy } = getCurrentInstance()
      
      const goSaleDetail = (recId) => {
        router.push({
          path: '/saleDetail',
          query: {
            id: recId
          }
        })
      }
      
      return { 
        goSaleDetail,
      };
    },
  data() {
    return {
      name: "粽子",
      recordsList: [],
    }
  },
  methods: {
    goAddRecord() {
      console.log('添加记录')
      this.$router.push({path:'/addRecord'})
    },
    getRecordsList() {
      const self = this
      self.$axios({
        url: 'http://106.54.96.106:3001/api/record',
        method: "GET",
      })
        .then(function(res) {
          self.recordsList = res.data.data
          console.log(self.recordsList)
        })
        .catch(function(err) {
          alert("获取记录列表失败" + err)
        })
    },
    dateFormat(fmt, dat) {
        let date = new Date(dat)
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }
  },
  created() {
    this.getRecordsList()
  }
}
</script>

<style lang='less' scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  /deep/.van-nav-bar__text {
    color: red;
  }
  /deep/.van-nav-bar {
    background-color: pink;
  }
  /deep/.van-nav-bar__title {
    color: #bc657e;
  }
}
.content {
  margin-top: 46px;
  overflow: scroll;
  /deep/.van-cell__title {
    text-align: left;
  }
  /deep/.van-cell__label {
    text-align: left;
  }
  /deep/.van-button--danger {
    height: 65.5px;
  }
}
.doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }
</style>
