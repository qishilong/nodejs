const fs = require("node:fs/promises");
const path = require("node:path");

const fileName = path.resolve(__dirname, "./myFiles/readDir");

const start = async () => {
    const result = await fs.readdir(fileName);
    console.log(result[0]);
}

start();