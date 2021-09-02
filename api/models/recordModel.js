const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  totalPrice: {
    type: Number,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  detail: [{
    name: {
      type: String,
      required: true,
      default: ''
    },
    imgUrl: {
      type: String,
      required: true,
      default: 'https://hbimg.huabanimg.com/978d99eb820ca34b175a823dcfae57123f5dbe7059b81f-gmUaK9_fw658/format/webp'
    },
    price: {
      type: Number,
      required: true,
      default: 0.00
    },
    selectedNum: {
      type: Number,
      required: true
    }
  }]
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record