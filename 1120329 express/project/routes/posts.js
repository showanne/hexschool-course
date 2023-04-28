const express = require('express');
const router = express.Router();
const Post = require('../models/postModels')
const User = require('../models/userModels')

/* GET posts listing. */
router.get('/', async function(req, res, next) {
  console.log('getPosts');
  const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt" ; // timeSort 排序
  const q = req.query.q !== undefined ? {"content" : new RegExp(req.query.q)} : {} ; // q 關鍵字篩選
  const posts = await Post.find(q).populate({ // .populate 找到某個資料表，並建立關聯
    path: 'user', // 找 Post 裡，名為 user 的欄位
    select: 'name photo ' // 指定要顯示的欄位，以空白區隔每個值
  }).sort(timeSort); // 排序
  // asc 遞增(由小到大，由舊到新) createdAt / 預設
  // desc 遞減(由大到小、由新到舊) "-createdAt"

  // res.send('respond with a resource');
  res.status(200).json({
    "msg": "getPosts",
    "data": posts
  })
});
router.post('/', async function(req, res, next) {
  console.log('postPosts');
  // console.log(req.body); // 取得傳進來的值
  const newPost = await Post.create({
    user: req.body.user,
    content: req.body.content
  })
  res.status(200).json({
    "msg": "postPosts",
    "status": "success",
    "data": newPost
  })
});

module.exports = router;
