const path = require("node:path");
const fs = require("node:fs/promises");

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    async getContent(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.readFile(this.filename)
            } else {
                return await fs.readFile(this.filename, "utf8")
            }
        }
        return null;
    }

    async getChildren() {
        if (this.isFile) {
            // 文件不可能有子文件
            return []
        }
        let children = await fs.readdir(this.filename);
        // console.log(children)
        children = children.map(item => {
            const result = path.resolve(this.filename, item)
            return File.getFile(result)
        })
        return Promise.all(children)
    }

    static async getFile(filename) {
        const stat = await fs.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        return new File(filename, name, ext, isFile, size, createTime, updateTime)
    }
}

const readDir = async (filename) => {
    const file = await File.getFile(filename);
    return await file.getChildren();
}

const start = async () => {
    const fileName = path.resolve(__dirname, "./myFiles")
    const result = await readDir(fileName);
    console.log(result)
    const data = await result[3].getChildren();
    console.log(data)
}

start()