const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

var connection = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'phonebook'
});
  connection.connect(function (err) {
    if (!err)
     console.log('DB connection succeded.');
 else
     console.log('DB connection failed ');
  });


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + "/public"))

app.get('/', function (req,res) {
  res.sendFile('/index.html');
});

app.get('/readAll', function (req,res) {
  connection.query('select * from phonebook', function (err, result) {
    if(err){
      console.error(err);
      return;}
      res.json(result);
  })
});

app.post('/deleteOne', function (req,res) {
  var delId = req.body.id;

  connection.query( 'DELETE FROM phonebook WHERE id = ?', [delId], function (err, result) {
    if(err){
      console.error(err);
      return;}
    console.error(result);
  })
res.end();
});

app.post('/saveOne', function (req,res) {
  var phoneNumber = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    telephoneNumber:req.body.telephoneNumber
  }

  connection.query('insert into phonebook set ?', phoneNumber, function (err, result) {
    if(err){
      console.error(err);
      return;
    }
    console.error(result);
  })
  res.end();
});

app.listen(3000, function () {
  console.log('Listening port 3000!');
})
