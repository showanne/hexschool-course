# 112.03.29 express
###### tags: `Node.js 企業專題班`
* 講義：[第三週：從 express MVC 架構建立 RESTful API](https://hackmd.io/0eXR_uEyTM2Ij4GE8p04CQ?view)

### 網址
![](https://i.imgur.com/nsUicPP.png)
![](https://i.imgur.com/L4Skz6X.png)
![](https://i.imgur.com/RN74rDT.png)

##### h5

* `req.query` 取得網址參數，會返回物件
  ```http://localhost:3010/?q=1&r=2  // { q: '1', r: '2' }```
* `req.params` 取得網址動態路由
  ```http://localhost:3010/todo/159  // { id: '159' }```
* `req.body` 取得傳進來的值

### [express generator](https://expressjs.com/zh-tw/starter/generator.html)
``` javascript
npm install express-generator -g

express -e filename
```

### [express cors](https://expressjs.com/en/resources/middleware/cors.html)
![](https://i.imgur.com/TM55N39.png)

### express 架構
![](https://i.imgur.com/fci8GQZ.png)
