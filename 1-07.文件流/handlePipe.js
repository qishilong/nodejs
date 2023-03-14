const fs = require("node:fs");
const path = require("node:path");

// 方式一
const methodOne = async () => {
    const from = path.resolve(__dirname, "./myFiles/writeStream.txt");
    const to = path.resolve(__dirname, "./myFiles/copy method1.txt");

    console.time("方式一");
    const content = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, content);
    console.timeEnd("方式一");
    console.log("方式一 复制完成")
}

methodOne()

// 方式二
const methodTwo = async () => {
    const from = path.resolve(__dirname, "./myFiles/writeStream.txt");
    const to = path.resolve(__dirname, "./myFiles/copy method2.txt")

    console.time("方式二");
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);

    rs.on("data", chunk => {
        const flag = ws.write(chunk);
        if (!flag) {
            rs.pause(); // 暂停读取
        }
    })

    ws.on("drain", () => {
        rs.resume();    // 可以继续写了
    })

    rs.on("close", () => {
        // 写完了
        ws.end();
        console.timeEnd("方式二");
        console.log("复制完成")
    })
}

methodTwo()