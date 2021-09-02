const Record = require(process.cwd() + '/models/recordModel')

// 添加
const createRec = postData => {
  const insertObj = new Record(postData)
  return insertObj.save()
  .then(res => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log('插入记录失败' + err)
    return false
  })
}

const create = async (req, res) => {
  let postData = req.body
  console.log(postData)
  let rs = await createRec(postData)
  if (rs) {
    res.send({
      meta :{
        state: 200,
        msg: "添加记录成功"
      },
      data: rs
    })
  } else {
    res.send({
      meta: {
        state:500, 
        msg: "添加记录失败"
      },
      data: rs
    })
  }
}

// 查找
const findAll = (req, res) => {
  Record.find().sort({create_time: -1})
  .then(data => {
    res.status(200).send({
      meta: {
        msg: "查询记录成功"
      },
      data: data
    })
    console.log(data)
  })
  .catch(err => {
    res.status(500).send({
      msg:"查找记录失败" + err
    })
  })
}

// 查找单个
const findOne = (req, res) => {
  Record.findById(req.params.recId)
  .then(data => {
    res.status(200).send({
      meta: {
        msg: "查询记录成功"
      },
      data: data
    })
    console.log(data)
  })
  .catch(err => {
    res.status(500).send({
      msg:"查找记录失败"
    })
  })
}

// 更新
const update = (req, res) => {
  // if(!req.body.name) {
  //   return res.status(400).send({
  //     msg: "Name cannot be empty"
  //   })
  // }
  // Student.findById(req.params.stuId)
  // .then(stu => {
  //   console.log(stu)
  // })
  Record.findByIdAndUpdate(req.params.prodId, {
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    hobbies: req.body.hobbies
  }, {new: true})
  .then(rec => {
    if(!rec) {
      return res.status(404).send({
        msg: "Record not found with id" + req.params.stuId
      })
    }
    res.send(rec)
  })
  .catch(err => {
    return res.status(500).send({
      msg: "Error updating record with id" + req.params.stuId
    })
  })
}

// 删除单个
const deleteOne = (req, res) => {
  Record.findByIdAndRemove(req.params.recId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        msg : "Record not found with id" + req.params.prodId
      })
    }
    res.send({
      msg: "Record delete successfully!"
    })
  })
  .catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        msg: "Record not found with id" + req.params.prodId
      })
    }
    return res.status(500).send({
      msg: "Could not delete record with id" + req.params.prodId
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