var fs = require('fs');
var dateFormat = require('dateformat');
const https = require('https');

const SITEMAPNAME = "./build/sitemap.xml";
const WEB_URL = "https://hotsearchviet.online/";
const HOT_SEARCH_URL = "hotsearch?id=";
const WEB_NAME = "Hot search Việt";
const DAILY = "daily-hotsearch?date=";

async function ClearFile() {
    if (fs.existsSync(SITEMAPNAME)) {
        fs.unlinkSync(SITEMAPNAME);
    }
}
exports.generateFile = (str) => {
    ClearFile();
    fs.appendFile(SITEMAPNAME, str, function (err) {
        if (err) throw err;
        const newDate = new Date();
        var time = dateFormat(newDate, "dd-mm-yyyy");
        ping();

    });
}
function ping() {
    const req = https.request("https://www.google.com/ping?sitemap=https://hotsearchviet.online/sitemap.xml", res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            console.log("Ping to google");
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

exports.getNews = (id, title, date) => {
    return `
    <url>
        <loc>${WEB_URL}${HOT_SEARCH_URL}${id}</loc>
        <lastmod>${standarFormat(new Date())}</lastmod>
        <news:news>
            <news:publication>
                <news:name>${WEB_NAME}</news:name>
                <news:language>vi</news:language>
            </news:publication>
            <news:publication_date>${date}</news:publication_date>
            <news:title>${title}</news:title>
        </news:news>
    </url>
    `;

}

exports.getDaily = (date) => {
    return `
    <url>
        <loc>${WEB_URL}${DAILY}${urlDateFormat(date)}</loc>
        <lastmod>${standarFormat(new Date())}</lastmod>
    </url>
    `;
}

exports.addHeader = (list) => {
    var str = "";
    for (let i in list) {
        item = list[i];
        str = str + item;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${str}
</urlset>
`
}

function standarFormat(date) {

    var time = dateFormat(date, "yyyy-mm-dd")+"T"+dateFormat(date,"hh:MM+07:00");
    return time;
}

function urlDateFormat(date){
    var time = dateFormat(date, "yyyy-mm-dd");

    return time;
}