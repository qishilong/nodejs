const axios = require("axios").default;
const cheerio = require("cheerio");
const Book = require("../models/Book")

/**
 * 任务：抓取豆瓣读书中的数据信息，并保存到数据库
 * step 1: 获取豆瓣读书网页的源代码
 * step 2: 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍的详情页链接数组
 * step 3: 根据书籍详情页的地址，得到该书籍的详细信息
 * step 4: 获取所有的书籍信息
 * step 5: 得到书籍信息，然后保存到数据库
 */

/**
 * 获取豆瓣读书网页的源代码
 */
async function getBooksHTML(pageNumber) {
    // 第一次
    const resp = await axios.get(`https://book.douban.com/latest?subcat=%E5%85%A8%E9%83%A8&p=${pageNumber}`);
    return resp.data;
}

/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍的详情页链接数组
 */
async function getBookLinks(pageNumber) {
    const html = await getBooksHTML(pageNumber);
    const $ = cheerio.load(html);
    // console.log(html, 22)
    const bookDetailElements = $("#content .grid-16-8 .chart-dashed-list li .media__img a");
    const links = bookDetailElements.map((i, ele) => ele.attribs["href"]).get();
    console.dir(links, 222);
    return links;
}

/**
 * 根据书籍详情页的地址，得到该书籍的详细信息
 * @param {*} detailUrl
 */
async function getBookDetail(detailUrl) {
    const resp = await axios.get(detailUrl);
    const $ = cheerio.load(resp.data);
    const name = $("h1").text().trim();
    const imageUrl = $("#mainpic .nbg img").attr("src");
    const spans = $("#info span.pl");
    const authorSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("作者");
    });
    const author = authorSpan.next("a").text();
    const publishSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("出版年");
    });
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim();
    return {
        name,
        imageUrl,
        publishDate,
        author,
    };
}

/**
 * 获取所有的书籍信息
 */
async function fetchAll(pageNumber) {
    const links = await getBookLinks(pageNumber); //得到书籍的详情页地址
    const proms = links.map((link) => {
        return getBookDetail(link);
    });
    return Promise.all(proms);
}

/**
 * 得到书籍信息，然后保存到数据库
 */
async function saveToDB() {
    // 简化操作，抓取全部 14 页的数据
    for (let i = 1; i <= 14; i++) {
        const books = await fetchAll(i);
        await Book.bulkCreate(books);
        console.log("抓取数据并保存到了数据库");
    }
}

saveToDB();