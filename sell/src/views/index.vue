<template>
  <div>
    <div class="router-box">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar v-model="active" active-color="#fff" inactive-color="#bc657e" route style="background-color: pink;">
        <van-tabbar-item name="sales" replace to="/sales" icon="cash-on-deliver">销售</van-tabbar-item>
        <!-- <van-tabbar-item name="order" replace to="/order" icon="balance-list-o">订单</van-tabbar-item> -->
        <van-tabbar-item name="statistics" replace to="/statistics" icon="chart-trending-o">统计</van-tabbar-item>
<!--        <van-tabbar-item name="aboutMe" replace to="/aboutMe" icon="manager-o" >我的</van-tabbar-item> -->
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Index',
  setup() {
    const active = ref('sales');
    return { active };
  },
  watch: {
      '$route'(to) {
        this.setActive(to)
      }
    },
    mounted() {
      this.setActive(this.$route)
    },
    methods: {
      setActive(route) {
        let routeName = route.name;
        if(routeName && routeName.indexOf('index-')===0){
          let tab = routeName.replace('index-','');
          if(this.active != tab){
            this.active = tab
          }
        }
      }
    }
};
</script>

<style style="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
}
/deep/.van-tabbar-item {
  background-color: pink;
}
.router-box {
  position: relative;
  background-color: #ffe5e6;
  height: calc(100vh - 50px);
  -webkit-overflow-scrolling: auto;
  overflow: auto;
}
</style>
