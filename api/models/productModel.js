const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proSchema = new Schema({
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
  purchasePrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  soldNum: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', proSchema)

module.exports = Product