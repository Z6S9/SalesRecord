const Product = require(process.cwd() + '/models/productModel')


// 添加
const createProd = postData => {
  const insertObj = new Product(postData)
  return insertObj.save()
  .then(res => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log('插入商品失败' + err)
    return false
  })
}

const create = async (req, res) => {
  let postData = req.body
  console.log(postData)
  let rs = await createProd(postData)
  if (rs) {
    res.send({
      meta :{
        state: 200,
        msg: "添加商品成功"
      },
      data: rs
    })
  } else {
    res.send({
      meta: {
        state:500, 
        msg: "添加商品失败"
      },
      data: rs
    })
  }
}

// 查找
const findAll = (req, res) => {
  Product.find()
  .then(data => {
    res.status(200).send({
      meta: {
        msg: "查询成功"
      },
      data: data
    })
    console.log(data)
  })
  .catch(err => {
    res.status(500).send({
      msg:"查找失败"
    })
  })
}

// 查找单个
const findOne = (req, res) => {
  Product.findById(req.params.prodId)
  .then(data => {
    res.status(200).send({
      meta: {
        msg: "查询成功"
      },
      data: data
    })
    console.log(data)
  })
  .catch(err => {
    res.status(500).send({
      msg:"查找失败"
    })
  })
}

// 更新
const update = (req, res) => {
  console.log(req.body)
  console.log(req.body.name)
  // if(!req.body.name) {
  //   return res.status(400).send({
  //     msg: "Name cannot be empty"
  //   })
  // }
  // Student.findById(req.params.stuId)
  // .then(stu => {
  //   console.log(stu)
  // })
  Product.findByIdAndUpdate(req.params.prodId, 
  {
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    purchasePrice: req.body.purchasePrice,
    soldNum: req.body.soldNum
  }
  , {new: true})
  .then(prod => {
    if(!prod) {
      return res.status(404).send({
        msg: "Product not found with id" + req.params.prodId
      })
    }
    res.send(prod)
  })
  .catch(err => {
    return res.status(500).send({
      msg: "Error updating product with id " + req.params.prodId + err
    })
  })
}

// 删除单个
const deleteOne = (req, res) => {
  Product.findByIdAndRemove(req.params.prodId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        msg : "Product not found with id" + req.params.prodId
      })
    }
    res.send({
      msg: "Product delete successfully!"
    })
  })
  .catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        msg: "Product not found with id" + req.params.prodId
      })
    }
    return res.status(500).send({
      msg: "Could not delete product with id " + req.params.prodId 
    })
  })
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne
}