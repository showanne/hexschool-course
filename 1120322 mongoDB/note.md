# 112.03.22 mongoDB
###### tags: `Node.js 企業專題班`
* 講義：[第一週 mongoDB 資料庫教學](https://hackmd.io/S2GgzEBmQ5Gm2ziKnWpRog?view)
* 作業：[第一週主線任務](https://hackmd.io/@hexschool/HJOX15NZ9)
* 作業繳交：[第一週主線任務 - Anne](https://hackmd.io/@showanne/r1d__JI-h)

## 安裝環境紀錄
* mongoDB 安裝路徑：`C:\Program Files\MongoDB\Server\6.0\`
* 資料存放路徑：`C:\Program Files\MongoDB\Server\6.0\data\`
* log 紀錄路徑：`C:\Program Files\MongoDB\Server\6.0\log\`

## mongoDB 資料傳遞
![](https://i.imgur.com/vfjg7yT.png)


## mongoDB 資料層級
使用物件格式 (.Bson)
可以巢狀，最多可以有32層的資料結構
![](https://i.imgur.com/Yzwf5YM.png)

## mongoDB 指令

### 常用指令
* `show dbs` 顯示資料庫

* `use dbname` 進到 dbname 資料庫 
    * 有這個 `dbname` 就會直接切換
    * 沒有這個 `dbname` 就會新建一個，並切換

* `db.collections.other...` 對 collections 資料表進行操作

* `insertOne()` 新增一筆資料
    ```json
    db.collections.insertOne(
        {
            "name":"單人房",
            "price":1000
        }
    )
    ```

* `insertMany()` 新增多筆資料
    ```json
    db.collections.insertMany(
        [
            {
                "name":"豪華單人房",
                "price":2000
            },
            {
                "name":"豪華雙人房",
                "price":3500
            }   
        ]
    )
    ```

* `updateOne()` 修改部分資料，`$set`放入修改的資料
    ```json
    db.collections.updateOne(
        {"_id":ObjectId("621edf99a20aa7506a116f9a")},
        {$set:{name:"修改雙人房"}}
    )
    ```

* `updateMany()` 修改多筆資料，第一個`{}`放入篩選條件`$set`放入修改的資料
    ```json
    db.rooms.updateMany(
        {rating:{$gt:4.5}},
        {$set:{price:300}}
    )
    ```

* `replaceOne()` 將指定id的資料的內容全部取代 = 該筆資料結構有機會會和其他筆不一樣
    ##### ★ 這種可以不用每筆資料結構都一樣的特性，只有存在在 mongoDB，應用案例：聊天室、公車時刻表...
    `db.collections.replaceOne(filter, replacement, options)`
    ```json
        db.rooms.replaceOne(
            {"_id":ObjectId("621edf99a20aa7506a116f9a")},
            {name:"yes~"}
        )
    ```

* `deleteMany({})` 刪除全部資料
* `deleteMany({條件})` 刪除符合指定條件的資料
    ```json
        db.rooms.deleteMany(
            {rating:{$gte:4.3}}
        )
    ```

### `.find()` 搜尋指令
* `.find()` 一般搜尋 = 顯示該資料庫的所有資料
* `.find().pretty()` 將顯示的資料排成好看的格式

* 尋找對應屬性：`db.collections.find({屬性名稱:屬性值})`
    ```json
    db.rooms.find({"name":"豪華單人房"})
    ```
* 模糊搜尋：`db.collections.find({"name":/關鍵字/})`
   ```json
    db.rooms.find({"name":/人/})
    ```
* 數值區間：`db.collections.find({屬性:{條件}})`
   ```json
    // 尋找超過 3000 元的房型
    db.rooms.find({"price":{$gt:3000}})
    ```
* 複合條件：`db.collections.find({屬性1:{條件1},屬性2:{條件2}})`
   ```json
    // 尋找超過 5000 元，且名稱有 "家" 的房型
    db.rooms.find({"price":{$gt:5000},"name":/家/})
    ```
* 保護欄位：`db.collections.find({屬性:{條件}},{"_id":0})`
    ```json
    // 尋找名稱有 "家" 的房型，但不將 id 欄位顯示
     db.rooms.find({"name":/人/},{"_id":0})

    // 輸出結果為
    [
      { name: '單人房', price: 2000 },
      { name: '雙人房', price: 5000 },
      { name: '三人房', price: 7000 },
      { name: '豪華單人房', price: 1500 }
    ]
    ```
* 搜尋陣列裡的字串值：`db.collections.find({"屬性":{$in:["關鍵字"]}})`
    ```json
    // 尋找該屬性的陣列值中有 「信用卡」 的房型
    db.rooms.find(
        {"payment":{$in:["信用卡"]}}
    )

    ```
* 邏輯運算子 (or、and)
    ```json
    // 尋找符合 「價格 3500 以上」 和 「名稱包含"豪華"」 的房型
    db.rooms.find(
        {$and:
            [
             {"price":{$lte:3500}},
             {"name":/豪華/}
            ]
        }
    )

    ```

#### 搜尋的常用語法
    | $eq | 等於 |
    | --- | --- |
    | $ne | 不等於 |
    | $gt | 大於 |
    | $lt | 小於 |
    | $gte | 大於等於 |
    | $lte | 小於等於 |
    | $in | 存在某個值 |
    | $nin | 不存在某個值 |
    
### 其他指令

* `count()` 回傳該資料表所有資料 (會回傳數字)
    ```json
    db.posts.find({"name": "Ray Xu"}).count() // 48
    ```
* `sort()` 排序資料
    * 正序 `.sort({屬性: 1})`
    * 倒序 `.sort({屬性: -1})`
    ```json
    // 查詢 `name` 為 `Ray Xu` 的 document 列表，排序為由新到舊
    db.posts.find({"name": "Ray Xu"}).sort({_id: -1})
    ```
* `limit(num)` 限制查詢結果筆數
    ```json
    // 顯示前 30 筆資料
    db.posts.find({"name": "Ray Xu"}).limit(30)
    ```
* `skip(num)` 跳過前幾筆資料
    ```json
    // 跳過前 30 筆資料，再顯示 30 筆資料
    db.posts.find({"comments": {$gt:100}}).skip(30).limit(30)
    ```
* `$pull` 用來從陣列中移除符合特定條件的元素的操作符
    ##### `{ $pull: { <field>: <condition> } }`
    ```json
    // 將所有 `tags` 陣列裡的 `感情` 都移除
    db.posts.updateMany({}, {$pull: {"tags": "感情"}})
    ```
* `$push` 用於修改陣列（Array）的更新操作，可以將一個元素添加到陣列的尾部
    ##### `{ $push: { <field>: <value> } }`
    ```json
    // 找一筆資料，將 tags 陣列新增一個新 tags 為 `遊記`
    db.posts.updateOne(
       { "_id": ObjectId("6429459b53474e6ed5cd1440") },
       { $push: { "tags": '遊記' } }
    )
    ```