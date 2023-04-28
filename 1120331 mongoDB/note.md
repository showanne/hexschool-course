# 112.03.31 mongoDB
###### tags: `Node.js 企業專題班`
* 講義：[第四週：期中考：打造全端 (FULL STACK) 網站架構](https://hackmd.io/LcmGF6XrR-ChjsGQxDAigQ?view)

### 直接 mongoDB 操作，出現結果
mongoDB -> DB -> collections -> Aggregations -> select 選語法 -> 貼上語法
![](https://i.imgur.com/Ls2moQx.png)
![](https://i.imgur.com/RRSCkk4.png)

### 資料庫關聯設計
![](https://i.imgur.com/xOPvUP1.png)

### mongoDB embedded 嵌入作法
#### room collection
``` =JSON
{
    "_id":"6268b81991f46a33636be563",
    "roomName":"標準單人房",
    "users":[
        {"name":"洧杰","age":28},
        {"name":"Ray","age":29}
    ]
}
```
使用 mongoDB **嵌入式作法**的情境，**寫入:讀取**比率差很多時，適用 mongoDB 設計

優點：
- 不常被修正
- 讀取率很高
- 可以嵌套很多層 (最多36層)

應用案例：
- 時刻表 (火車、飛機 ...)
- 訂票的票種資訊 -> 有細項中的細項
- 系統儀錶板 -> 許多不同格式的資訊
- 聊天室
- 股票

### mongoDB references 引用作法
#### room collection
``` =JSON
{
    "_id":ObjectId("6268b90091f46a33636be58f"),
    "roomName":"標準單人房",
    "users": [
        "6268b89591f46a33636be56a",
        "6268b8b591f46a33636be56b"
    ]
}
```
#### user collection
``` =JSON
[
    {
        "_id": ObjectId("6268b89591f46a33636be56a"),
        "name":"洧杰",
        "age":28
    },
    {
        "_id": ObjectId("6268b8b591f46a33636be56b"),
        "name":"Ray",
        "age":29
    }
]
```

