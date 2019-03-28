var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'dlftlsdn12',
  database : 'noticeboard'
});

connection.connect();

connection.query('SELECT * FROM board', function (error, results) {
    if (error){
        console.log(error);
    }
    console.log(results[0].num);
  });
   
  connection.end();