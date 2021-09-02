const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const session = require('express-session')
const userController = require(process.cwd() + '/controller/userControl')
const prodController = require(process.cwd() + '/controller/productControl')
const recController = require(process.cwd() + '/controller/recordControl')

// 2. 创建 app 对象，通过语法 express() 底层原理是 http 模块的 createServer
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(session({
//   secret: "secret",
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 3
//   }
// }))

// 连接数据库
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

// mongoose.connect('mongodb://shop2:shop2@localhost:27017/shop', {useNewUrlParser: true, useUnifiedTopology: true},
//                 err=>{
//   if(err) {
//     console.log('数据库连接失败')
//   }
//   console.log('数据库连接成功')
// })
mongoose.connect('mongodb+srv://shop2:shop2@cluster0.htyq6.mongodb.net/shop?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},
                err=>{
  if(err) {
    console.log('数据库连接失败')
  }
  console.log('数据库连接成功')
})

app.get('/api', (req, res) => {
  res.send('api works')
})
app.post('/api/register', userController.create)

app.post('/api/login', userController.login)

// 商品添加
app.post('/api/product', prodController.create)

// 商品查询
app.get('/api/product', prodController.findAll)
app.get('/api/product/:prodId', prodController.findOne)

// 修改商品信息
app.put('/api/product/:prodId', prodController.update)

// 删除商品
app.delete('/api/product/:prodId', prodController.deleteOne)

// 添加记录
app.post('/api/record', recController.create)

// 查询记录
app.get('/api/record', recController.findAll)
app.get('/api/record/:recId', recController.findOne)

// 删除记录
app.delete('/api/record/:recId', recController.deleteOne)


app.listen(3001, () => {
  console.log( 'http://localhost:3001')
})
