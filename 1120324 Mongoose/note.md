# 112.03.24 mongoose
###### tags: `Node.js 企業專題班`
* 講義：[第二週 － Node.js NPM 整合 MongoDB](https://hackmd.io/wxEJSh6DTFS_SMnd62KSYw?view)

### MongoDB 資料庫傳遞流程
![](https://i.imgur.com/wEmliCW.png)

### Mongoose Model 設計
![](https://i.imgur.com/U6TOEyD.png)

### Mongoose 注意
如果是 mongoose 幫忙建立資料庫，會將 collection 名稱 **改為小寫，並加上 's'**，所以最終在資料庫會看到 'posts'。
```
const Post = mongoose.model('Post', postSchema);
```

### 指令
新增：Model.create()
刪除：Model.findByIdAndDelete()
更新：Model.findByIdAndUpdate()
查詢：Model.find()
await Post.findByIdAndUpdate(id,editContent) // 更新單筆
await Post.deleteMany({}); //刪除全部
await Post.findByIdAndDelete(id); // 刪除單筆

### 檔案拆分邏輯
![](https://i.imgur.com/QlyIGup.png)
