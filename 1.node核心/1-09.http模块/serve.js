const http = require("node:http");
const url = require("node:url");

const handleReq = (req) => {
    console.log("有请求来了");
    const urlResult = url.parse(req.url);
    console.log("请求路径:", urlResult);
    console.log("请求方法: ", req.method);
    console.log("请求头: ", req.headers);

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString("utf-8");
    })

    req.on("end", () => {
        console.log("请求体: ", body)
    })

}

const serve = http.createServer((req, res) => {
    handleReq(req);
    res.setHeader("a", "1");
    res.setHeader("b", "2");
    res.statusCode = 404;
    res.write("你好！");
    res.end();
})

serve.listen(9000);
serve.on("listening", () => {
    console.log("serve listening 9000")
})