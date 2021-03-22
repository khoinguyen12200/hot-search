const cnn = require('./connection');
const google = require('./googleApi.js');
const addSubtractDate = require("add-subtract-date");
var dateFormat = require('dateformat');
const sitemapGenerator = require("./sitemapGenerator");
var fs = require('fs');


function writeLog(logmess) {
    fs.appendFile("./log.txt", logmess + "\n", (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
    });
}

var connection = cnn.connect();

function promiseQuery(sql, arr) {
    return new Promise((resolve, reject) => {
        connection.query(sql, arr, function (err, results) {
            if (err) return reject(err);
            else return resolve(results);
        })
    })
}

async function updateSiteMap() {
    var sql = "select * from `hot-search` order by date desc, rank limit 0,200";
    var results = await promiseQuery(sql);

    var list = [];
    for (let i = 0; i >= -5; i--) {
        var date = new Date();
        date = addSubtractDate.add(date, i, 'days');
        list.push(sitemapGenerator.getDaily(date));
    }


    for (let i in results) {
        const hs = results[i];
        const newDate = new Date(hs.date);
        var time = dateFormat(newDate, "yyyy-mm-dd");

        var title = `"${hs.title}" lọt Top ${hs.rank} hot search tại Việt Nam`;
        list.push(sitemapGenerator.getNews(hs.id, title, time))
    }

    var textFile = sitemapGenerator.addHeader(list);
    sitemapGenerator.generateFile(textFile);
}


function updateAll() {
    google.updateDailyTrends(promiseQuery);
    setTimeout(function() {
        updateSiteMap();
    },1000*15)
    
    writeLog("update and sitemap " + new Date()); 
}
updateAll();