const mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 2. 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是保证数据的完整性，不要有脏数据
const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: String
  })
  
// 3. 将文档结构发布为模型
// 方法：mongoose.model
// 第一个参数：传入一个大写名词单数字符串用来表示数据库名称
// mongoose 会自动将大写名词的字符串生成小写复数的集合名称
// 如 User -> users 集合
// 第二个参数：架构 Schema
// 返回值：模型构造函数
var User = mongoose.model('User', userSchema)


// 新增数据
// var admin = new User({
//   username: 'admin2', 
//   password: '1234564',
//   email: 'amdin2@163.com'
// })

// admin.save(function (err, ret) {
//   if(err) {
//     console.log('保存失败')
//     console.log(err)
//   } else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })


// 查询数据
// User.findOne({username: 'admin2'}, function (err, ret) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// }) 

// 删除数据
// User.remove({
//   username: 'admin2'
// }, function (err, ret) {
//   if (err) {
//     console.log('删除失败')
//   } else {
//     console.log('删除成功')
//     console.log(ret)
//   }
// })

// 更新数据
User.findByIdAndUpdate('609f7304d1248d6d8432bd3b', {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
    console.log(ret)
  }
})

User.find(function (err, ret) {
  if(err) {
    console.log('查询失败')
  } else {
    console.log('查询成功')
    console.log(ret)
  }
})