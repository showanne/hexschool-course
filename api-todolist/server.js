// const data = require('./data') // 載入 data.js 的 輸出資料 (module.exports)
// const path = require('path'); // 取得檔案與目錄路徑，詳細也可瀏覽 Node.js PATH API文件
//  __dirname 該檔案的資料夾路徑
//  __filename 該檔案的位置
// 抓目錄路徑 path.dirname('/xx/yy/zz.js') // /xx/yy
// 路徑合併 path.join(__dirname, '/xx') // 回傳 前後路徑合併 E:/GitHub/hexschool-course/.../xx
// 抓檔名 path.basename('/xx/yy/zz.js') // zz.js
// 抓副檔名 path.extname('/xx/yy/zz.js') // .js
// 分析路徑 path.parse('/xx/yy/zz.js') // 回傳 上述綜合物件 {root:'/', dir:'/xx/yy' , base:'zz.js' , ext:'.js' , name:'zz'}


const http = require('http');
const { v4: uuidv4 } = require('uuid');
// uuidv4();
const errorHandle = require('./errorHandle');

const todos = []

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }

  console.log(req.url);
  console.log(req.method);

  let reqBody = "";
  // Node.js 官網接收 buffer 教學 https://nodejs.org/api/stream.html#api-for-stream-consumers
  req.on('data', chunk=> { // 接收封包的資料
    // console.log(chunk);
    reqBody += chunk;
  })
  // req.on('end', ()=> { // 接收結束後觸發=確認有資料後才執行
  //   console.log(JSON.parse(reqBody)); // JSON.parse(reqBody).title
  // })

  if (req.url == "/" && req.method == "GET") { // 首頁
    res.writeHeader('200', headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": ""
    }));
  } else if (req.url == "/todos" && req.method == "GET") { // 取得所有代辦事項
    res.writeHeader('200', headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos
    }));
    console.log(todos);
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") { // 新增單筆代辦事項
    req.on('end', ()=> {
      try { // 正常執行
        const title = JSON.parse(reqBody).title
        if (title !== undefined) { // 如果收到的 title 有資料才繼續進行
          const todo = {
            "title": title,
            "id": uuidv4()
          };
          console.log(todo);
          todos.push(todo);
          console.log(todos);
    
          res.writeHeader('200', headers);
          res.write(JSON.stringify({
            "status": "success",
            "data": todos
          }));
          res.end();
        } else { // 如果 title沒有資料 = 錯誤格式 就執行以下程式
          errorHandle(res);
        }
      } catch (error) { // 有錯誤時執行
        errorHandle(res);
      }
    })
  } else if (req.url == "/todos" && req.method == "DELETE") { // 刪除所有待辦
    todos.length = 0 // 將陣列長度變為0 = 陣列清空
    res.writeHeader('200', headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos
    }));
    console.log(todos);
    res.end();
  } else if (req.url.startsWith("/todos") && req.method == "DELETE") { // 刪除指定待辦 / .startsWith("/todos") 找尋符合框框內文字條件的
    const id = req.url.split('/').pop(); // .split('/') 將字串以 '/' 做分割 / .pop() 抓出最後一筆
    const index = todos.findIndex(el => el.id == id) // 搜尋索引 -> 將資料裡的 id 去跟傳進來的 id 做比對， -1 代表沒有這個值
    console.log(id, index);
    if (index !== -1) { // 如果有索引到
      todos.splice(index, 1) // 將陣列第 index 起的 1 筆資料刪除
      res.writeHeader('200', headers);
      res.write(JSON.stringify({
        "status": "success",
        "data": todos
      }));
      console.log(todos);
      res.end();
    } else {
      errorHandle(res);
    }
  } else if (req.url.startsWith("/todos") && req.method == "PATCH") { // 編輯指定待辦 / .startsWith("/todos") 找尋符合框框內文字條件的
    req.on('end', () => {
      try {
        const title = JSON.parse(reqBody).title 
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el => el.id == id) // 搜尋索引

        if (title !== undefined && index !== -1) {
          todos[index].title = title // 將陣列第 index 筆的資料取代為傳進來的資料
          res.writeHeader('200', headers);
          res.write(JSON.stringify({
            "status": "success",
            "data": todos
          }));
          console.log(todos);
          res.end();
        } else {
        errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }

    })
  } else if (req.method == "OPTIONS") { // 跨網域設定 for preflight request
    res.writeHeader('200', headers);
    res.end();
  } else { // 任何其他路由都是 404
    res.writeHeader('404', headers);
    res.write(JSON.stringify({
      "status": "false",
      "message": "not found"
    }));
  }
}

const server = http.createServer(requestListener); // createServer 開啟一個伺服器
server.listen(3005); // 開啟一個監聽的 port
