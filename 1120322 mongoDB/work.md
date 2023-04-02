# 第一週主線任務 - Anne

###### tags: `Node.js 企業專題班`

### 前置作業
1. 請建立一個 database，並建立一個 `posts` collection
2. 將此 [JSON 資料](https://drive.google.com/file/d/1VCuWX2M6K-Du8pWlrcGImO_ux4Zwsa6v/view?usp=sharing)，透過 Compass 倒入到 `posts` collection

```
貼文集合欄位介紹
- name：貼文姓名
- image：貼文圖片
- content：貼文內容
- likes：按讚數
- comments：留言數
- createdAt：發文時間
- type：貼文種類[friend(摯友)、group(社團)]
- tags：貼文標籤
```


## 題庫

### 課程範圍
1. 搜尋 name 欄位為 "Ray Xu" 的 document 列表
``` json
db.posts.find({"name":"Ray Xu"})
```
2. 新增一筆 document，請全部欄位皆填寫
``` json
db.posts.insertOne(
    {
        "name":"Anne",
        "image":"https://fakeimg.pl/300x200/200",
        "content":"Lorem, ipunt voluptatetur, ipsam quas los saepe pariatur?",
        "likes":123,
        "comments":456,
        "createdAt":"2023-04-02 01:40:43 UTC",
        "type":"friend",
        "tags":["心情","雜記"]
    }
)
```
4. 新增多筆 document，請全部欄位皆填寫
``` json
db.posts.insertMany(
    [
        {
        "name":"Shoa",
        "image":"https://fakeimg.pl/300x200/ace",
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus aliquam eum e saepe pariatur?",
        "likes":789,
        "comments":46,
        "createdAt":"2023-01-02 01:40:43 UTC",
        "type":"group",
        "tags":["電影"]
        },
        {
        "name":"Anne",
        "image":"https://fakeimg.pl/300x200/200",
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus aliquam eum eaque, temporibus aspernatur magni eos unde! Nobis nihil incidunt voluptatibus et consectetur, ipsam quas laborum odio eos saepe pariatur?",
        "likes":123,
        "comments":456,
        "createdAt":"2023-04-02 01:40:43 UTC",
        "type":"friend",
        "tags":["心情"]
        }
    ]
)
```
4. 修改一筆 document，filter 條件請用 `_id` 指定其中一筆資料，`content` 欄位調整為`測試資料`
``` json
db.posts.updateOne(
    {"_id":ObjectId("64286a604b54b52e514d92df")},
    {$set:{"content":"測試資料"}}
)
// feedback
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 48,
  modifiedCount: 0,
  upsertedCount: 0
}
```
5. 修改多筆 `name` 欄位為 `"Ray Xu"` 的 document 列表，`content` 欄位都調整為`哈哈你看看你`
``` json
db.posts.updateMany(
    {"name":"Ray Xu"},
    {$set:{"content":"哈哈你看看你"}}
)

// feedback
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 48,
  modifiedCount: 48,
  upsertedCount: 0
}
```
6. 刪除一筆 document，filter 條件請用 `_id` 任意指定其中一筆資料
``` json
db.posts.deleteOne(
    {"_id":ObjectId("64286a604b54b52e514d92e1")}
)
// feedback
{ acknowledged: true, deletedCount: 1 }
```
7. 刪除多筆 document，filter 條件請用 `type` 為 `group` 的值，刪除所有社團貼文
``` json
db.posts.deleteMany(
    {"type":"group"}
)
// feedback
{ acknowledged: true, deletedCount: 793 }
```
8. 刪除多筆 document，filter 條件為以下條件
a. `name`:`"Ray Xu"`
b. `likes`: 500(含) 個讚以下
``` json
db.posts.deleteMany(
    {"name":"Ray Xu"},
    {"likes":{$lt:500}}
)
// feedback
{ acknowledged: true, deletedCount: 8 }
```
9. 查詢全部 `posts` 的 document 列表
``` json
db.posts.find().pretty();
```
10. 關鍵字搜尋 `name` 裡面含有 `o` 的 document 列表
``` json
db.posts.find({"name":/o/})
```
11. 查詢`name` 欄位為 `"Ray Xu"` ，filter 篩選出介於 500~1000(含) 個讚（大於等於 500、小於等於 1000）
``` json
db.posts.find({
    "name": "Ray Xu",
    "likes": {$gte: 500, $lte: 1000}
})

```
12. 查詢 `comments` 有大於等於 500 以上的 document 列表
``` json
db.posts.find({"comments":{$gte:500}})

```
13. 查詢 `tags`  欄位，有 `謎因` **或(or)** `幹話` 的 document 列表
``` json
// 方法1
db.posts.find(
    {$or:
        [
            {"tags":{$in:["謎因"]}},
            {"tags":{$in:["幹話"]}}
        ]
    }
)
// 方法2
db.posts.find({
    "tags":{$in:["謎因", "幹話"]}
})
```
14. 查詢 `tags`  欄位，有 `幹話` 的 document 列表，需隱藏 `_id` 欄位
``` json
db.posts.find(
    {"tags":{$in:["幹話"]}},
    {"_id":0}
)
// feedback
  {
    name: 'Bird Machans',
    tags: [ '教育', '幹話', '電影' ],
    type: 'friend',
    image: null,
    createdAt: '2022-03-09 16:14:45 UTC',
    content: 't...m',
    likes: 669,
    comments: 42
  }
...
```
15. 請嘗試用 Mongo Shell 指令刪除全部 Documents
``` json
// 方法1
db.posts.deleteMany({})
// 方法2
db.posts.drop()
// feedback
{ acknowledged: true, deletedCount: 202 }
```
### 自主研究題
1. posts 所有 document 數量為？(回傳數字)
``` json
db.posts.find().count()

db.posts.find({"name": "Ray Xu"}).count() // 48
```
2. 請查詢 `name` 為 `Ray Xu` 的 document 列表，排序為由新到舊

``` json
db.posts.find({"name": "Ray Xu"}).sort({_id: -1})
```

3. 請查詢 `name` 為 `Ray Xu` 的 document 列表，顯示前 30 筆資料
``` json
db.posts.find({"name": "Ray Xu"}).limit(30)
```
4. 請查詢 `name` 為 `Ray Xu` ，顯示100(含) 個讚以上的前 30 筆 document 列表，時間排序由新到舊
``` json
db.posts.find({
    "name": "Ray Xu",
    "likes": {$gte:100}
}).sort({"createdAt": -1}).limit(30)
```
5. 請查詢 `comments` 超過 `100` 的 document 列表，跳過前 30 筆資料，再顯示 30 筆資料 
``` json
db.posts.find({"comments": {$gt:100}}).skip(30).limit(30)
```
6. 尋找超夯熱門貼文，請查詢 `likes` **且(and)** `comments` 都 `1,500(含)`以上的 document 列表
``` json
db.posts.find(
    {$and:
        [
            {"likes":{$gte:1500}},
            {"comments":{$gte:1500}}
        ]
    }
)
// 其實可以不用 $and
db.posts.find({
    "likes": {$gte: 1500}, 
    "comments": {$gte: 1500}
})
```
7. 尋找普通熱門貼文，請查詢 `likes` **或(or)** `comments` ， `1,000(含)`以上 的 document 列表
``` json
db.posts.find(
    {$or:
        [
            {"likes":{$gte:1000}},
            {"comments":{$gte:1000}}
        ]
    }
)
```
8. 查詢 `image` 欄位為 `null` 的 document 列表
    ##### 查詢型別type [$type](https://www.mongodb.com/docs/manual/reference/operator/query/type/)
``` json
// 方法1
db.posts.find({"image":null})
// 方法2
db.posts.find({"image": {$type: 10}}) // type 10 = null
```

9. 隨意找一筆 document 資料，將 `tags` 欄位裡的陣列，新增一個新 tags 為 `遊記`
``` json
// step.1 驗證
db.posts.find({"tags":{$in:["遊記"]}}).count() // 0
// step.2 執行新增
// 方法1
db.posts.updateOne(
   { "_id": ObjectId("6429459b53474e6ed5cd1440") },
   { $push: { "tags": '遊記' } }
)
// 方法2
db.posts.updateOne(
    { "_id": ObjectId("6429459b53474e6ed5cd1440") },
    { $addToSet: 
        { "tags": '遊記' }
    }
)
// feedback
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
// step.3 再次驗證
db.posts.find({"tags":{$in:["遊記"]}}).count() // 1
```
##### 隨機的寫法 [$sample](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/)
``` json
// step.1 新隨便找一筆
let data = db.posts.aggregate(
   [ { $sample: { size: 1 } } ]
).next()
// step.2 將這筆更新
db.posts.updateOne(
    { "_id": data._id },
    { $push: { "tags": '遊記' } }
)
// step.3 驗證
// console.log(data) // 不能直接看 data ，因為 data 已經存成變數，所以要重新用 id 搜尋 再叫出資料
db.posts.find({"_id": data._id})
// feedback
{
  _id: ObjectId("6429459b53474e6ed5cd1695"),
  name: 'Rorke Andres',
  tags: [ '電影', '謎因', '遊記' ],
  type: 'friend',
  image: 'http://dummyimage.com/247x100.png/cc0000/ffffff',
  createdAt: '2022-03-19 13:32:45 UTC',
  content: 'dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at',
  likes: 1705,
  comments: 250
}
```

10. 將所有 `tags` 陣列裡的 `感情` 都移除
``` json
// step.1 驗證
db.posts.find({"tags":{$in:["感情"]}}).count() // 345
// step.2 執行移除
db.posts.updateMany({}, {$pull: {"tags": "感情"}})
// feedback
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1000,
  modifiedCount: 345,
  upsertedCount: 0
}
// step.3 再次驗證
db.posts.find({"tags":{$in:["感情"]}}).count() // 0
```
