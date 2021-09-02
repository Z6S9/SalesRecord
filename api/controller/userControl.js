const User = require(process.cwd() + '/models/userModel')
const jwt = require('jsonwebtoken')
const SECRET = 'a1s2d3f4g5h6j7k8l9'

// 创建用户
const createUser = postData => {
  const insertObj = new User(postData)
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
  let postData = req.body
  console.log(postData)
  let rs = await createUser(postData)
  if (rs) {
    res.send({
      meta :{
        state: 200,
        msg: "创建成功"
      },
      data: rs
    })
  } else {
    res.send({
      meta: {
        state:500, 
        msg: "创建失败"
      },
      data: rs
    })
  }
}

// 查找用户
const login = async (req, res) => {
  const user = await User.findOne({username: req.body.username})
  if (!user) {
    return res.status(422).send({
      msg: "用户名不存在"
    })
  }
  const isPwdValid = (req.body.password === user.password)
  if(!isPwdValid) {
    return res.status(422).send({
      msg: "密码错误"
    })
  }
  // 生成 token
  const token = jwt.sign({
    _id: String(user._id), 
  }, SECRET)
  res.send({
    user,
    token: token
  })
}

module.exports = {
  create,
  login
}