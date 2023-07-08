const express = require('express');
const app = express();


// app.use(require('./staticMiddleware'))

app.get('/news/abc', (req, res, next) => {
    console.log('handle1');
    // throw new Error('abc');
    // 相当于下面这样写
    next(new Error('abc'))
})


//能匹配  /news  /news/abc   /news/123   /news/ab/adfs
//不能匹配  /n   /a   /   /newsabc
app.use("/news", require("./errorMiddleware"));

const port = 3000;
app.listen(port, () => {
    console.log(`server listen ${port}`)
})