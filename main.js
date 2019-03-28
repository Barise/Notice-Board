var http = require('http');
var fs = require('fs');
var url = require('url'); 
var mysql = require('mysql');

var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'dlftlsdn12',
  database : 'noticeboard'
});

function template(form,body){
  return `
      <!DOCTYPE html>
      <html lang="ko-KR">
      <head>
        <meta charset="UTF-8">
        
        <link rel="stylesheet" href="css/style.css">
        <title>게시판</title>
      </head>
      <body>
        <!-- header -->
        <header>
          <h1>
            <a href="/">TEO's Board</a>
          </h1>
        </header>

        <!-- contents -->
        <div class="contents">
          <!-- button+function -->
        <div class="function">
          ${form}
        </div>
        <!-- notice table -->
        ${body}
        <!-- numbering -->
        <div class="numbering">페이지넘버</div>
        </div>
      <!--footer-->
        <div class="bg-footer">
          <footer class = "footer">푸터</footer>
        </div>
      </body>
      </html>
      `; 
}

db.connect();

var app = http.createServer(function(request,response){
  var _url=request.url;
  var queryData = url.parse(_url,true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(queryData);
  console.log(_url);
  
  db.query('SELECT * FROM board', function (error, results, fields) {
    var temp = template(
      `<form action="create" method="post">
      <a href="/create">create</a>
      </form>

      <form action="update" method="post">
      <a href="/update">update</a>
      </form>

      <form action="delete" method="post">
      <a href="/delete">delete</a>
      </form>`

    `<table>
      <tableHead>
      <tr>
        <th class="num">번호</th>
        <th class="title">제목</th>
        <th class="views">카운트</th>
        <th class="user">이름</th>
        <th class="date">날짜</th>
      </tr>
      </tableHead>
      <tableBody>
      <tr>
        <td class="num">${results[0].num}</td>
        <td class="title">${results[0].title}</td>
        <td class="views">${results[0].views}</td>
        <td class="user">${results[0].user}</td>
        <td class="date">${results[0].date}</td>
      </tr>
      </tableBody>
    </table>`
  );
    //home
    if(_url=='/'){
      response.end(temp);
    }
    /* create */
    else if(_url=='/create'){
      var temp=template(
        ``,
        `<p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>`);
    }
    /* board check  */
    else if(_url=='/board'){
      if(_url=='/board/update'){
        var temp=template(
          ``,
          `<p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>`);
      }
      else if(_url=='/board/delete'){
        var temp=template(
          ``,
          `<p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>`);
      }
    }
    
    else{
      response.writeHead(404);
      response.end("error")
    }
    
    response.writeHead(200);
    
    response.end(temp); //templateHTML로 변경
  });
});

// db.end();
app.listen(3000);

/* 


<p><input type="text" name="title" placeholder="title"></p>
<p>
  <textarea name="description" placeholder="description"></textarea>
</p>
<p>
  <input type="submit">
</p> */