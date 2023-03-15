const fs = require("node:fs");
const path = require("node:path");

const fileName = path.resolve(__dirname, "./myFiles/writeStream.txt");

const ws = fs.createWriteStream(fileName, {
    encoding: "utf8",
    highWaterMark: 16 * 1024
})

let i = 0;

// 一直写，直到到达上限或者无法写入
const write = () => {
    let flag = true;
    while (i < 1024 * 1024 * 10 && flag) {
        flag = ws.write("a");
        i++;
    }
}

write();

ws.on("drain", () => {
    write()
})