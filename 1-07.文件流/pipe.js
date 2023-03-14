const fs = require('fs');
const path = require('path');

const method2 = () => {
    const from = path.resolve(__dirname, "./myFiles/writeStream.txt");
    const to = path.resolve(__dirname, "./myFiles/pipe method2.txt");

    console.time("pipe 方式二")
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to)

    rs.pipe(ws);

    rs.on("close", () => {
        console.timeEnd("pipe 方式二")
        console.log("复制完成")
    })
}

method2()