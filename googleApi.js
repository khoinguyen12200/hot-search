const googleTrends = require('google-trends-api');
var dateFormat = require('dateformat');


function dailyTrends(date) {
    console.log('dailyTrends', date);
    return new Promise(function (resolve, reject) {
        googleTrends.dailyTrends({
            trendDate: date,
            geo: 'VN',
        }, function (err, results) {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                return resolve(results);
            }
        })
    })
}

exports.updateDailyTrends = async function updateDailyTrends(promiseQuery,dateHotSearch) {

    var results = await dailyTrends(dateHotSearch || new Date());

    const data = JSON.parse(results).default.trendingSearchesDays;

    var list = [];
    for (let i in data) {
        const daily = data[i];
        const date = daily.date;

        const trendingSearches = daily.trendingSearches;
        var listid = [];
        for (let j in trendingSearches) {
            const hotsearch = trendingSearches[j];
            const idhotsearch = await addHotSearch(hotsearch, date, parseInt(j) + 1);
            listid.push(idhotsearch);
        }
        var remove = await removeNotInList(date, listid);
    }

    async function removeNotInList(date, listid) {

        // var time = dateFormat(date, "yyyymmdd");
        var sql = 'select * from `hot-search` where date = ?';
        var results = await promiseQuery(sql, date);

        for (let i in results) {
            const id = results[i].id;
            if (!listid.includes(id)) {
                var sql2 = 'delete from `hot-search` where id = ?';
                var result2 = await promiseQuery(sql2, id);
            }
        }
        return true;
    }



    async function addHotSearch(hotsearch, date, rank) {
        const image = hotsearch.image.imageUrl || "";
        const title = hotsearch.title.query;
        var view = hotsearch.formattedTraffic;
        const articles = hotsearch.articles;

        var sql1 = "select * from `hot-search` where title like BINARY ? and date =?";
        var result1 = await promiseQuery(sql1, [title,date]);
        var idHotSearch = 0;
        if (result1.length == 0) {
            var sql2 = "INSERT INTO `hot-search`(`title`, `view`, `date`, `image`,`rank`)" +
                " VALUES (?,?,?,?,?)";
            var result2 = await promiseQuery(sql2, [title, view, date, image, rank]);
            idHotSearch = result2.insertId;

        } else {
            idHotSearch = result1[0].id;

            var sql2 = "UPDATE `hot-search` SET `title`=?,  `view`=?,  `date`=?, `image`=?, `rank`=?   WHERE id = ?";
            var result2 = await promiseQuery(sql2, [title, view, date, image, rank, idHotSearch]);

            var sql3 = "DELETE FROM `hs-articles` WHERE idhotsearch=?";
            var result3 = await promiseQuery(sql3, [idHotSearch]);
        }
        for (let i in articles) {
            const article = articles[i];
            const result4 = await addArticle(idHotSearch, article);
        }
        return idHotSearch;
    }
    async function addArticle(id, article) {
        const image = article.image == null ? "" : article.image.imageUrl || "";
        const title = article.title;
        const source = article.source;
        const url = article.url;
        const snippet = article.snippet;
        var sql = "INSERT INTO `hs-articles`(`idhotsearch`, `image`, `title`, `source`, `url` ,snippet) " +
            "VALUES (?,?,?,?,?,?)";
        var result = promiseQuery(sql, [id, image, title, source, url,snippet]);
        return result;
    }
}