# SalesRecord
## 项目介绍

### 技术栈

前端：vue3 + vant-ui + axios + echarts

后端：nodejs + express + mongodb

### 应用场景及实现功能

移动端网页应用，用于小型促销活动的销售记录以及总销售额、利润、各商品销售情况的统计。

实现功能：添加销售记录，查看记录列表，查看记录详情，统计销售额及利润，展示各商品销售情况（图表）。

## 项目结构

api - 服务端接口

sell - 前端移动端项目

## 项目预览

### 线上地址

http://106.54.96.106/#/sales

### 例图

1. 销售记录列表

   <img src="https://i.loli.net/2021/09/02/mGShnNJaU7KADrw.jpg" alt="KA8_YW0@_MNCEISYAR8YC7J.jpg" style="zoom:25%;" />

2. 销售记录详情

   <img src="https://i.loli.net/2021/09/02/KzR1lh6PtZC3na5.jpg" alt="_P7LU2DHOB20YU__YVL6W5D.jpg" style="zoom:25%;" />

3. 添加销售记录

   <img src="https://i.loli.net/2021/09/02/CjogbweW5XVqrz9.jpg" alt="NE4RH4GHL___@D_2K_K_R_Y.jpg" style="zoom:25%;" />

4. 统计模块（包含销售额，利润，各商品销售情况）

   <img src="https://i.loli.net/2021/09/02/Ocf9h1Wsv85QKUy.jpg" alt="K52HQ_M_5S_4M_GLG2W9Q_F.jpg" style="zoom:25%;" />

## 改进空间

- 部署数据库到服务器上 -- 当前数据库使用的是免费的远程 mongodb 数据库，网络连接慢，造成数据渲染延迟
- 使用预加载页面解决数据渲染闪烁问题
- 销售金额和利润数据使用后台接口返回 -- 当前这两项数据使用前端计算，当记录多时前端计算速度慢，影响页面渲染
- 添加用户登录认证功能
- 添加后台管理，修改商品信息
- 优化界面 UI

