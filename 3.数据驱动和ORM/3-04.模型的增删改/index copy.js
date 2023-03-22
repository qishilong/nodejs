const Admin = require("./models/Admin.js");

// 增加
/**
 * 方式一
 * step 1: build 创建一个实例
 * 使用 build 方法
 * step 2: save 在数据库中保存实例
 */

// const ins = Admin.build({
//     loginId: "123123",
//     loginPwd: "123123"
// })
// ins.loginPwd = "123456"
// ins.save().then(() => console.log("创建管理员成功"));

/**
 * 方式二
 * 使用 create 方法直接创建
 */

Admin.create({
    loginId: "admin",
    loginPwd: "123456",
}).then((res) => console.log(res.id, res.loginId, res.loginPwd))