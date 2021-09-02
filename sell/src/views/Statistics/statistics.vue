<template>
  <div class="header">
    <van-nav-bar title="统计模块">
    </van-nav-bar>
  </div>
  <div class="content">总销售金额：{{ total.toFixed(2) }}元</div>
  <div class="content">利润：{{ (total - cost).toFixed(2) }}元</div>
  <div id="main" class="about"></div>
</template>

<script>
  import {
    reactive,
    onMounted,
    computed,
    getCurrentInstance
  } from 'vue'
  import {
    useRoute,
    useRouter
  } from 'vue-router'

  export default {
    // setup() {
    //   const router = useRouter()
    //   const {
    //     proxy
    //   } = getCurrentInstance()
    //   const state = reactive({
    //     total: 0,
    //     profit: 0,
    //     cost: 0,
    //     saledNum: []
    //   })

    //   onMounted(() => {
    //     calculate()
    //   })

    //   const calculate = async () => {
    //     await proxy.$axios.get('http://106.54.96.106:3001/api/record')
    //       .then(res => {
    //         let ret = res.data.data
    //         let detail = res.data.data.detail
    //         let tp = 0
    //         let cost = 0
    //         for (var i in ret) {
    //           tp += ret[i].totalPrice
    //         }
    //         state.total = tp
    //       })

    //     await proxy.$axios.get('http://106.54.96.106:3001/api/product')
    //       .then(res => {
    //         let ret = res.data.data
    //         let cost = 0
    //         for (var i in ret) {
    //           cost += ret[i].soldNum * ret[i].purchasePrice
    //         }
    //         state.cost = cost
    //       })

    //   }

    //   return {
    //     state
    //   }
    // },
    data() {
      return {
        prodName: [],
        soldNum: [],
        cost: 0,
        total: 0
      }
    },
    methods: {
      async getRecordList() {
        await this.$axios.get('http://106.54.96.106:3001/api/record')
          .then(res => {
            let ret = res.data.data
            let tp = 0
            for (var i in ret) {
              tp += ret[i].totalPrice
            }
            this.total = tp
          })
      },
      async getProductList() {
        await this.$axios.get('http://106.54.96.106:3001/api/product')
          .then(res => {
            console.log("获取成功")
            var list = res.data.data
            var name = []
            var num = []
            for (var i in list) {
              name[i] = list[i].name
              num[i] = list[i].soldNum
              this.cost += list[i].purchasePrice * list[i].soldNum
            }
            this.prodName = name
            this.soldNum = num
            console.log(this.prodName)
            console.log(this.soldNum)
          })
          .catch(err => {
            console.log("获取产品数据失败" + err)
          })
      },
      async chart() {
        var myChart = this.$echarts.init(document.getElementById("main"));
        console.log(this.prodName)
        // 绘制图表
        await myChart.setOption({
          title: {
            text: "销量统计",
          },
          grid: {
            left: 10,
            right: 20,
            bottom: 0,
            containLabel: true
          },
          tooltip: {},
          yAxis: {
            // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            data: this.prodName,
          },
          xAxis: {},
          series: [{
            name: "销量",
            type: "bar",
            // data: [5, 20, 36, 10, 10, 20],
            data: this.soldNum,
            itemStyle: {
              normal: {
                color: function(params) {

                  // build a color map as your need.

                  var colorList = [

                    '#c16c72', '#B5C334', '#FCCE10', '#E87C25', '#27727B',

                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',

                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'

                  ];

                  return colorList[params.dataIndex]

                },
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 12
                  }
                }
              }
            },
          }, ],
        });
      }
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.getRecordList()
      this.getProductList()
      setTimeout(() => {
        this.chart()
      }, 500)
    }
  }
</script>

<style lang="less" scoped>
  .header {
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

  #main {
    margin-top: 30px;
    height: 400px;
    width: 100%;
  }

  .content {
    text-align: left;
    font-size: 18px;
    padding: 10px;
  }
</style>
