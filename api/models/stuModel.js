const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongoose.connect('mongodb://shop2:shop2@localhost:27017/shop', {useNewUrlParser: true, useUnifiedTopology: true},
//                 err=>{
//   if(err) {
//     console.log('数据库连接失败')
//   }
//   console.log('数据库连接成功')
// })

const db = mongoose.connection

// var studentSchema = new Schema({
//   name: {
//     type: String,
//     // required: true
//   },
//   gender: {
//     type: Number,
//     enum: [0, 1], // 约束，只能是 0 或 1
//     default: 0 // 默认为 0
//   },
//   age: {type: Number},
//   hobbies: {type: String}
// })

const Student = mongoose.model('student', {
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1], // 约束，只能是 0 或 1
    default: 0 // 默认为 0
  },
  age: {type: Number},
  hobbies: {type: String}
})

// 方法
// const createModel = postData => {
//   const insertObj = new Student(postData)
//   return insertObj.save()
//   .then(res => {
//     console.log(res)
//     return res
//   })
//   .catch(err => {
//     console.log('插入失败' + err)
//     return false
//   })
// }

// module.exports = {
//   createModel
// }

module.exports = Student