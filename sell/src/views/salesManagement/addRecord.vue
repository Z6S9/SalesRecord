<template>
  <div class="header">
    <van-nav-bar
      title="添加记录"
      left-text="返回"
      @click-left="back"
    />
  </div>
  <div class="content">
    <div class="goodsSelect" v-for="(item, index) in productList" :key="index">
      <van-card
        left-text
        :num="state.selected[index].num"
        :price="item.price.toFixed(2)"
        :desc="'已售' + item.soldNum + '个'"
        :title="item.name"
        :thumb="item.imgUrl"
        class="goods-cell"
      >
        <template #footer>
          <van-stepper v-model="state.selected[index].num" theme="round" button-size="22" min="0" default-value="0"/>
        </template>
      </van-card>
    </div>
    <div style="text-align: left;margin-top: 20px;">
      <span>选择折扣</span>
    </div>
    <div class="discount-select">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="state.value" :options="discount"/>
      </van-dropdown-menu>
    </div>
  </div>
  <div class="footer">
    <van-submit-bar :price="total * 100" button-text="提交记录" @submit="onSubmit" :loading="state.isLoad">
      <span style="font-size: 10px;">已选折扣: {{ discount[state.value].text }}</span>
      <!-- <span>金额：{{ total }}</span> -->
    </van-submit-bar>
  </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs, getCurrentInstance } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'

export default {
  setup() {
    const router = useRouter()
      const { proxy } = getCurrentInstance()
      const state = reactive({
        value: 0,
        selected: [
          { num: 0 },
          { num: 0 },
          { num: 0 },
          { num: 0 },
          { num: 0 },
          { num: 0 },
          { num: 0 }
        ],
        pL: [],
        result: [],
        isLoad: false
      });
      const discount = [
        { text: '原价', value: 0, times: 1 },
        { text: '九五折', value: 1, times: 0.95 },
        { text: '九折', value: 2, times: 0.9 },
        { text: '八五折', value: 3, times: 0.85 },
        { text: '八折', value: 4, times: 0.8 },
      ];
      
      onMounted(() => {
        init()
      })
      
      const init = async () => {
        await proxy.$axios.get('http://106.54.96.106:3001/api/product').then(res => {
          state.pL = res.data.data
        })
      }
      
      const total = computed(() => {
        let sum = 0
        let list = state.pL
        for(var i in list) {
          sum += list[i].price * state.selected[i].num * discount[state.value].times
        }
        return sum
      })
      
      const onSubmit = async () => {
        state.isLoad = true
        const body = JSON.stringify(state.pL)
        var test = eval(body)
        for(var i in test) {
          test[i].selectedNum = state.selected[i].num
        }
        // 生成订单
        var ntest = {}
        ntest.detail = test
        ntest.discount = discount[state.value].text
        ntest.totalPrice = total.value.toFixed(2)        
        await proxy.$axios.post('http://106.54.96.106:3001/api/record', ntest)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        // 更新已售
        var test2 = eval(body)
        for(var i in test2) {
          if(state.selected[i].num) {
            test2[i].soldNum += state.selected[i].num
            await proxy.$axios.put('http://106.54.96.106:3001/api/product/' + test2[i]._id, test2[i])
            .then(res => {
              console.log("提交成功")
            })
            .catch(err => {
              console.log(err)
            })
          }
        }
        Toast.success('提交成功')
        setTimeout(() => {
          router.push({ path: '/sales' })
        }, 500)
      }
      
      return {
        state,
        discount,
        total,
        onSubmit
      };
    },
  data() {
    return {
      totalPrice: 0,
      productList: []
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getProductList() {
      const self = this
      self.$axios({
        url: 'http://106.54.96.106:3001/api/product',
        method: "GET",
      })
        .then(function (res) {
          self.productList = res.data.data
          console.log("获取商品列表成功")
          console.log(self.productList)
        })
        .catch(function (err) {
          alert("获取商品列表失败" + err)
        })
    },
  },
  created() {
    this.getProductList()
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
  }
}
</style>
