const net = require("node:net");
const fs = require("node:fs");
const path = require("node:path");

const serve = net.createServer()

serve.listen(1000);

serve.on("listening", () => {
    console.log("serve listening 1000")
})

serve.on("connection", (socket) => {
    console.log("有客户端连接到服务器")

    socket.on("data", async chunk => {
        const fileName = path.resolve(__dirname, "./pic.jpg");
        const bodyBuffer = await fs.promises.readFile(fileName);
        const headerBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpg

`,
            "utf8"
        )
        const result = Buffer.concat([headerBuffer, bodyBuffer])
        socket.write(result);
        socket.end();
    })

    socket.on("end", () => {
        console.log("连接关闭了")
    })

})