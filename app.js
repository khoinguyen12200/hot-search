const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const google = require('./googleApi.js');
const addSubtractDate = require("add-subtract-date");
var dateFormat = require('dateformat');
var cron = require('node-cron');
var fs = require('fs');
const sitemapGenerator = require("./sitemapGenerator");
var connectToSQL = require("./connection");

const connection = connectToSQL.connect();


function promiseQuery(sql, arr) {
  return new Promise((resolve, reject) => {
    connection.query(sql, arr, function (err, results) {
      if (err) return reject(err);
      else return resolve(results);
    })
  })
}



function writeLog(logmess) {
  fs.appendFile("./log.txt", logmess + "\n", (err) => {
    if (err) throw err;
    console.log("The file was succesfully saved!");
  });
}


app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));








const buildDirect = path.join(__dirname, 'build');
app.use(express.static(buildDirect));

app.get('/*', function (req, res) {
  res.sendFile(path.join(buildDirect, 'index.html'));
});


// dequy(0);
// function dequy(num) {
//   var dayBefore = num || 0;
//   var date = new Date();
//   date = addSubtractDate.add(date, dayBefore, 'days');
//   console.log(date);
//   if(num == -500 )return;
//   google.updateDailyTrends(promiseQuery,date);
//   setTimeout(() => {
//     dequy(num-2);
//   },15000)
// }






app.post('/api/dailyTrends', function (req, res) {
  var date = req.body.date;
  async function dailyTrends() {
    const newDate = new Date(date);
    var time = dateFormat(newDate, "yyyymmdd");

    var sql1 = 'select id,rank from `hot-search` where date = ? order by rank';
    var results = await promiseQuery(sql1, time);

    var list = [];
    for (let i in results) {
      hot_search = await getHotSearchById(results[i].id);
      list.push(hot_search);
    }


    res.statusCode = 200;
    res.json({ result: list });
    res.end;
  }
  dailyTrends();


});

app.post('/api/getHotSearchRow', function (req, res) {
  var id = req.body.id;
  async function getRow() {
    hotsearch = await getHotSearchById(id);

    res.statusCode = 200;
    res.json({ result: hotsearch });
    res.end;
  }
  getRow();


});

async function getHotSearchById(id) {
  var sql = 'select * from `hot-search` where id = ?';
  var result = await promiseQuery(sql, id);

  var sql2 = 'select * from `hs-articles` where idhotsearch = ?';
  var result2 = await promiseQuery(sql2, id);

  var hotsearch = result[0];
  hotsearch.articles = result2;

  return hotsearch;

}





app.listen(4000, () => console.log('App listening on port 4000'));