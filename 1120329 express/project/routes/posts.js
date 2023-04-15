const express = require('express');
const router = express.Router();
const Post = require('../models/postModels')


/* GET posts listing. */
router.get('/', async function(req, res, next) {
  console.log('getPosts');
  const posts = await Post.find()
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
    name: req.body.name,
    content: req.body.content
  })
  res.status(200).json({
    "msg": "postPosts",
    "status": "success",
    "data": newPost
  })
});

module.exports = router;
