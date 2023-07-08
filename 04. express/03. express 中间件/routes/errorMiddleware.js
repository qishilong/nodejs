// 处理错误的中间件
module.exports = (err, req, res, next) => {
    if (err) {
        const obj = {
            code: 500,
            msg: err instanceof Error ? err.message : err
        }
        // 发生了错误
        res.status(500).send(obj);
    } else {
        next()
    }
}