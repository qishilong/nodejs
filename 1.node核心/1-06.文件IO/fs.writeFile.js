const fs = require("node:fs/promises");
const path = require("node:path");
const buffer = require("node:buffer")

const fileName = path.resolve(__dirname, "./myFiles/writeFile.txt");

const writeData = "今天是个好日子\n"

const start = async () => {
    // await fs.writeFile(fileName, writeData, {
    //     encoding: "utf8",
    //     flag: "a"
    // })

    const data = buffer.Buffer.from(writeData, "utf8");
    await fs.writeFile(fileName, data, {
        encoding: "utf8",
        flag: "a"
    }).then(() => console.log("写入成功"))
}

start()