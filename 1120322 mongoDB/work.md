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
``` =JavaScript
db.posts.find({"name":"Ray Xu"})
```
2. 新增一筆 document，請全部欄位皆填寫
``` =JavaScript

```
4. 新增多筆 document，請全部欄位皆填寫
``` =JavaScript

```
4. 修改一筆 document，filter 條件請用 `_id` 指定其中一筆資料，`content` 欄位調整為`測試資料`
``` =JavaScript

```
5. 修改多筆 `name` 欄位為 `"Ray Xu"` 的 document 列表，`content` 欄位都調整為`哈哈你看看你`
``` =JavaScript

```
6. 刪除一筆 document，filter 條件請用 `_id` 任意指定其中一筆資料
``` =JavaScript

```
7. 刪除多筆 document，filter 條件請用 `type` 為 `group` 的值，刪除所有社團貼文
``` =JavaScript

```
8. 刪除多筆 document，filter 條件為以下條件
a. `name`:`"Ray Xu"`
b. `likes`: 500(含) 個讚以下
``` =JavaScript

```
9. 查詢全部 `posts` 的 document 列表
``` =JavaScript

```
10. 關鍵字搜尋 `name` 裡面含有 `o` 的 document 列表
``` =JavaScript

```
11. 查詢`name` 欄位為 `"Ray Xu"` ，filter 篩選出介於 500~1000(含) 個讚（大於等於 500、小於等於 1000）

``` =JavaScript

```
12. 查詢 `comments` 有大於等於 500 以上的 document 列表

``` =JavaScript

```
13. 查詢 `tags`  欄位，有 `謎因` **或(or)** `幹話` 的 document 列表
``` =JavaScript

```
14. 查詢 `tags`  欄位，有 `幹話` 的 document 列表，需隱藏 `_id` 欄位
``` =JavaScript

```
15. 請嘗試用 Mongo Shell 指令刪除全部 Documents
``` =JavaScript

```
### 自主研究題
1. posts 所有 document 數量為？(回傳數字)
``` =JavaScript
db.posts.find().count()
```
2. 請查詢 `name` 為 `Ray Xu` 的 document 列表，排序為由新到舊

``` =JavaScript

```

3. 請查詢 `name` 為 `Ray Xu` 的 document 列表，顯示前 30 筆資料
``` =JavaScript

```
4. 請查詢 `name` 為 `Ray Xu` ，顯示100(含) 個讚以上的前 30 筆 document 列表，時間排序由新到舊
``` =JavaScript

```
5. 請查詢 `comments` 超過 `100` 的 document 列表，跳過前 30 筆資料，再顯示 30 筆資料 
``` =JavaScript

```
6. 尋找超夯熱門貼文，請查詢 `likes` **且(and)** `comments` 都 `1,500(含)`以上的 document 列表
``` =JavaScript

```
7. 尋找普通熱門貼文，請查詢 `likes` **或(or)** `comments` ， `1,000(含)`以上 的 document 列表
``` =JavaScript

```
8. 查詢 `image` 欄位為 `null` 的 document 列表
``` =JavaScript

```
9. 隨意找一筆 document 資料，將 `tags` 欄位裡的陣列，新增一個新 tags 為 `遊記`
``` =JavaScript

```
10. 將所有 `tags` 陣列裡的 `感情` 都移除

``` =JavaScript

```
