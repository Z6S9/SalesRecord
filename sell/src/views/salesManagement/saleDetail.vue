<template>
  <!-- 记录详情 -->
  <div class="header">
    <van-nav-bar
      title="记录详情"
      left-text="返回"
      @click-left="back"
    />
  </div>
  <div class="content">
    <div class="goodsSelect" v-for="(item, index) in state.pL" :key="index">
      <van-card
        left-text
        :num="item.selectedNum"
        :price="item.price"
        :title="item.name"
        :thumb="item.imgUrl"
        class="goods-cell"
        v-if="item.selectedNum"
      >
      </van-card>
    </div>
  </div>
  <div class="footer">
    <van-submit-bar :price="state.total * 100" button-text="删除记录" @submit="onSubmit" :loading="state.isLoad">
      <span style="font-size: 10px;">已选折扣: {{ state.discount }}</span>
    </van-submit-bar>
  </div>
  
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, getCurrentInstance, reactive } from 'vue'
import axios from 'axios'
import { Toast } from 'vant'

export default {
  setup() {
    const  {proxy}  = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      total: 0,
      discount: '',
      pL: [],
      productList: [],
      isLoad: false
    })
    
    onMounted(() => {
      init()
      console.log(route.query.id)
    })
    
    const init = async() => {
      await proxy.$axios.get('http://106.54.96.106:3001/api/record/' + route.query.id).then(res => {
        console.log(res.data.data)
        state.pL = res.data.data.detail
        state.discount = res.data.data.discount
        state.total = res.data.data.totalPrice
      })
    }
    
    const onSubmit = async () => {
      state.isLoad = true
      console.log(route.query.id)
      await proxy.$axios.delete('http://106.54.96.106:3001/api/record/'+ route.query.id).then(res => {
        console.log("删除记录成功")
      }).catch(err => {
        console.log("删除记录失败" + err)
      })
      await proxy.$axios.get('http://106.54.96.106:3001/api/product').then(res => {
        state.productList = res.data.data
      })
      const body = JSON.stringify(state.productList)
      // 更新已售
      var test = eval(body)
      for(var i in test) {
        if (state.pL[i].selectedNum) {
          test[i].soldNum -= state.pL[i].selectedNum
          await proxy.$axios.put('http://106.54.96.106:3001/api/product/' + test[i]._id, test[i])
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        }
        
      }
      Toast.success('删除成功')
      setTimeout(() => {
        router.push({ path: '/sales' })
      }, 1000)
      
    }
    
    return {
      state,
      onSubmit
    }
  },
  data() {
    return {
      price: 3030
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
    /deep/.van-nav-bar__text {
      color: red;
    }
  }
  .content {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    bottom: 50px;
    background-color: #f9f9f9;
    // height: calc(100vh - 50px);
    overflow: auto;
    .goods-cell {
      margin-bottom: 2px;
      /deep/ .van-card__content {
        text-align: left;
      }
      /deep/ .van-card__title {
        font-size: 16px;
      }
      /deep/ .van-card__num {
        font-size: 16px;
      }
    }
  }
.footer {
  position: fixed;
  bottom: 0;
}
</style>
