const fs = require("node:fs/promises");
const path = require("node:path");

const fromFileName = path.resolve(__dirname, "./myFiles/fromCopy.jpg")

const toFileName = path.resolve(__dirname, "./myFiles/toCopy.jpg")

const start = async () => {
    const buffer = await fs.readFile(fromFileName)
    await fs.writeFile(toFileName, buffer).then(() => console.log("复制成功"));
}

start();