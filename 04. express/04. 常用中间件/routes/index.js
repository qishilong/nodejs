const express = require('express');
const app = express();
const path = require('path');
const staticPath = path.resolve(__dirname, '../public')

/* 
    `app.use(express.static(staticPath));` 是 Express 中的一个中间件函数，用于提供指定目录中的静态文件。在本例中，它提供来自 `staticPath`目录的静态文件，该目录使用 `path.resolve()` 方法解析。这意味着客户端可以通过在 URL 中指定相对路径来访问“staticPath”目录中的任何文件。
    下面这一段代码的作用是：
    当请求是，会根据请求路径(req.path)，从指定的目录中寻找是否存在该文件，如果存在，则直接响应该文件，不再交给后续的中间件处理
    如果不存在，则直接交给后续的中间件处理
    默认情况下，如果映射的结果是一个目录，则会自动返回 index.html 文件，自动返回文件可配置
*/
// app.use('/static', express.static(staticPath));

// app.use("/static", (req, res) => {
//     console.log(req.baseUrl, req.path);
//     res.send({
//         'baseUrl': req.baseUrl,
//         'path': req.path,
//     });
//     res.end()
// });

// app.use('/static', express.static(staticPath, {
//     // index: false
// }));

// app.use(express.urlencoded({ extended: true }));

// app.use(express.urlencoded({
//     extended: true
// }))
// app.get('/', (req, res) => {
//     console.log(req.body);
// })

// app.use(express.json());
// app.post('/api/student', (req, res) => {
//     console.log(req.body)
// })

// app.use(require('./staticMiddleware'))
// app.get('/', (req, res) => {
//     console.log(req.body);
// })

const port = 3000;
app.listen(port, () => {
    console.log(`server listen ${port}`);
})