const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1], // 约束，只能是 0 或 1
    default: 0 // 默认为 0
  },
  age: Number,
  hobbies: String
})

mongoose.model('Student', studentSchema)


