const URL = require("node:url");
const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

// 返回文件详细信息
const getStat = async (fileName) => {
    try {
        return await fs.stat(fileName)
    } catch {
        return null
    }
}

// 返回文件内容
const getContent = async (url) => {
    const urlResult = URL.parse(url)
    // 要处理的文件目录
    let fileName;
    fileName = path.resolve(__dirname, "public", urlResult.pathname.substring(1))
    let stat = await getStat(fileName);

    // console.log(urlResult.pathname.substring(1), 111, urlResult, url)
    if (!stat) {
        // 文件不存在
        return null;
    } else if (stat.isDirectory()) {
        // 文件是一个目录
        fileName = path.resolve(__dirname, "public", urlResult.pathname.substring(1), "index.html")
        stat = await getStat(fileName);
        if (!stat) {
            return null
        } else {
            return await fs.readFile(fileName)
        }
    } else {
        return await fs.readFile(fileName)
    }
}

const handle = async (req, res) => {
    const info = await getContent(req.url);
    if (info) {
        res.write(info);
    } else {
        res.statusCode = 404;
        res.write("Resource is not exist");
    }
    res.end()
}



const serve = http.createServer(handle);

serve.listen(2000);
serve.on("listening", () => {
    console.log("serve listening 2000");
})