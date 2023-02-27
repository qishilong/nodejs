const fs = require("node:fs/promises");
const path = require("node:path");

const fileName = path.resolve(__dirname, "./myFiles");

const start = async () => {
    const result = await fs.stat(fileName);
    console.log(result)
    console.log("是否是目录:", result.isDirectory())
    console.log("是否是文件:", result.isFile())
}

start()