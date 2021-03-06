const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 创建一个模型，就是在设计数据库
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化保存 Kitty 实例
kitty.save().then(() => console.log('meow'));

for (i = 0; i < 10; i++) {
  const kitty = new Cat({ name: 'meow' + i });
  // 持久化保存 Kitty 实例
  kitty.save().then(() => console.log('meow'));
}