// 导入模型
// const {
//   createModel
// } = require(process.cwd() + '/models/stuModel')

const Student = require(process.cwd() + '/models/stuModel')

// 增添数据
const createModel = postData => {
  const insertObj = new Student(postData)
  return insertObj.save()
  .then(res => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log('插入失败' + err)
    return false
  })
}


const create = async (req, res) => {
  // res.send("this is stu create")
  // 1. 接受数据
  let postData = req.body
  console.log(postData)
  // 2. 过滤（忽略
  // 3. 操作数据库
  let rs = await createModel(postData)
  // 4. 判断返回
  if (rs) {
    res.send({
      meta :{
        state: 200,
        msg: "添加成功"
      },
      data: null
    })
  } else {
    res.send({
      meta: {
        state:500, 
        msg: "添加失败"
      },
      data: null
    })
  }
}

// 查找所有数据
const findAll = (req, res) => {
  Student.find()
  .then(data => {
    res.status(200).send({
      meta: {
        msg: "查询成功"
      },
      data: data
    })
    console.log(data[1].id)
  })
  .catch(err => {
    res.status(500).send({
      msg:"查找失败"
    })
  })
}

// 更新数据
const update = (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      msg: "Name cannot be empty"
    })
  }
  Student.findById(req.params.stuId)
  .then(stu => {
    console.log(stu)
  })
  Student.findByIdAndUpdate (req.params.stuId, {
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    hobbies: req.body.hobbies
  }, {new: true})
  .then(stu => {
    if(!stu) {
      return res.status(404).send({
        msg: "Student not found with id" + req.params.stuId
      })
    }
    res.send(stu)
  })
  .catch(err => {
    return res.status(500).send({
      msg: "Error updating student with id" + req.params.stuId
    })
  })
}

// 删除数据
const deleteOne = (req, res) => {
  Student.findByIdAndRemove(req.params.stuId)
  .then(stu => {
    if(!stu) {
      return res.status(404).send({
        msg : "Student not found with id" + req.params.id
      })
    }
    res.send({
      msg: "Student delete successfully!"
    })
  })
  .catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        msg: "Student not found with id" + req.params.stuId
      })
    }
    return res.status(500).send({
      msg: "Could not delete student with id" + req.params.stuId
    })
  })
}

module.exports = {
  create,
  findAll,
  update,
  deleteOne
}