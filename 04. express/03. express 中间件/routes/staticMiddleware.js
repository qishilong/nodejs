module.exports = (req, res, next) => {
    if (req.path.startsWith('/api')) {
        // 说明你请求的是以 api 开头的接口
        next()
    } else {
        // 说明你想要的是静态资源
        if (true) {
            res.send('静态资源')
        } else {
            next();
        }
    }
}