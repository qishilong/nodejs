const fs = require("node:fs/promises");
const path = require("node:path");

const fileName = path.resolve(__dirname, "./myFiles/writeExists");

const isExist = async (filename) => {
    try {
        await fs.stat(filename);
        return true;
    } catch (err) {
        if (err.code === "ENOENT") {
            // 文件不存在
            /**
             * [Error: ENOENT: no such file or directory, stat '/Users/shilongqi/Code/Learn/nodejs/1-06.文件IO/myFiles/writeExists1'] {
                errno: -2,
                code: 'ENOENT',
                syscall: 'stat',
                path: '/Users/shilongqi/Code/Learn/nodejs/1-06.文件IO/myFiles/writeExists1'
                }
             */
            // console.log(err);
            return false;
        }
        throw new Error(err);
    }
};

const start = async () => {
    const result = await isExist(fileName);
    if (result) {
        console.log("目录已存在");
    } else {
        await fs.mkdir(fileName);
        console.log("目录创建成功")
    }
};

start();