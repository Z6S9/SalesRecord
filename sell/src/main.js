import { createApp } from "vue"
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'

import {
  Tabbar,
  TabbarItem,
  Form,
  Button,
  Field,
  NavBar,
  Cell,
  CellGroup,
  Card,
  Stepper,
  SubmitBar,
  DropdownMenu,
  DropdownItem,
  GridItem,
  Grid,
  SwipeCell,
  Dialog,
  Toast,
  PullRefresh
} from 'vant';

import "vant/lib/index.css"

const app = createApp(App)

app.use(router)
// app.use(axios, VueAxios)
// app.use(Vant);
app.use(Tabbar)
app.use(TabbarItem)
app.use(Form)
app.use(Button)
app.use(Field)
app.use(NavBar)
app.use(Cell)
app.use(CellGroup)
app.use(Card)
app.use(Stepper)
app.use(SubmitBar)
app.use(DropdownMenu)
app.use(DropdownItem)
app.use(GridItem)
app.use(Grid)
app.use(SwipeCell)
app.use(Dialog)
app.use(Toast)
app.use(PullRefresh)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$echarts = echarts

app.mount('#app')
