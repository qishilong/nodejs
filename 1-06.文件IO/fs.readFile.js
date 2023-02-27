// const fs = require("node:fs")
const fs = require("node:fs/promises");
const path = require("node:path");

const fileName = path.resolve(__dirname, "./myFiles/readFile.txt");
// fs.readFile(fileName, "utf-8", (err, content) => {
//     console.log(content)
// })

/**
 * 直接导入 fs 模块时，可以直接使用
 * 1. 回调，fs.xxx
 * 2. 异步，fs.promises.xxx
 * 3. 同步 Sync, fs.xxxSync
 */

// Sync函数是同步的，会导致JS运行阻塞，极其影响性能
// 通常，在程序启动时运行有限的次数即可

// const content = fs.readFileSync(fileName, "utf8")
// console.log(content)



const start = async () => {
    const content = await fs.readFile(fileName, "utf8")
    console.log(content)
}

// const start = async () => {
//     const content = await fs.promises.readFile(fileName, "utf8")
//     console.log(content)
// }

start()