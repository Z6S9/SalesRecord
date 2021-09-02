// 1. 引入 express 模块
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const stuController = require(process.cwd() + '/controller/stuControl')
const prodController = require(process.cwd() + '/controller/productControl')

// 2. 创建 app 对象，通过语法 express() 底层原理是 http 模块的 createServer
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 连接数据库
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb+srv://shop2:shop2@cluster0.htyq6.mongodb.net/shop?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},
                err=>{
  if(err) {
    console.log('数据库连接失败')
  }
  console.log('数据库连接成功')
})

// 3. 路由，语法 app.http请求方式(路径, 回调函数)
app.get('/', (req, res) => {
  // send 是 express 用来响应数据的方法
  res.send('hello, world')
})

// 学生添加
app.post('/stu', stuController.create)

// 学生查询
app.get('/prod', prodController.findAll)
app.get('/stu/:stuId', (req, res) => {
  res.send(req.params)
})

// 修改学生信息
app.put('/stu/:stuId', stuController.update)

// 删除学生信息
app.delete('/stu/:stuId', stuController.deleteOne)


// 4. 启动服务监听端口
app.listen(3031, () => {
  console.log('http://localhost:3031')
})