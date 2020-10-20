var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://admin:ktmpwdmon@172.16.101.179:27017';
mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
  if (err) throw err;
  console.log('数据库已经建立连接');
  // 指定操作数据库和表
  const collection = client.db("dynamicform_ktm").collection("claimTaskModel");
  // 曾
/*  collection.insertOne({name:"李22四", age:19},(err,result)=>{
    console.log('插入成功');
    client.close()
  });*/

  // 删除单个
/*
  const whereStrDelete = {name: '哈哈', age: '20'};
   collection.deleteOne(whereStrDelete,(err,result)=>{
     console.log('单个删除成功');
     client.close()
   });
*/

  // 删除多个
 /* const whereStrDeleteMany = {name: '哈哈'};
   collection.deleteOne(whereStrDelete,(err,result)=>{
     console.log('单个删除成功');
     client.close()
   });*/

  // 改
  const whereStr = {name: '张三'};
  const updateStr = {$set: {name: '张叶子保镖'}};
  // 单个更新
/*  collection.updateOne(whereStr, updateStr,(err,result)=>{
    if (err) throw err;
    console.log('文档更新成功');
    client.close()
  });*/
  // 多个更新
 /* collection.updateMany(whereStr, updateStr,(err,result)=>{
    if (err) throw err;
    console.log('文档更新成功');
    client.close()
  });*/

  //查
  collection.find().toArray((err,data)=>{
    console.log(data);
    client.close();
  })

})
