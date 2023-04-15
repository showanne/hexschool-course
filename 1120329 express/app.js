const express = require('express');
const app = express();

app.get('/todo/:id',function(req,res){
  console.log(req.params);
  // req.query 取得網址參數，會返回物件 { q: '1', r: '2' }
  // req.params 取得網址動態路由 { id: '159' }
    res.status(200).json({
        "name":"index"
    })
})
app.post('/todo',function(req,res){
  console.log(req.body);
  // req.body
    res.status(200).json({
        "msg":"success"
    })
})
app.delete('/todo',function(req,res){
    res.status(200).json({
        "msg":"delete success"
    })
})

// 監聽 port
const port = process.env.PORT || 3010;
app.listen(port); 