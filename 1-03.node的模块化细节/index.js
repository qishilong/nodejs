// require("./src/testMain")
// const result = require("./myModule.js");
// console.log(result)

/**
 * commonjs module 细节
 */
// function require(modulePath) {
//     1. 将modulePath转换为绝对路径：/Users/shilongqi/Code/Learn/nodejs/1-03.node的模块化细节/myModule.js
//     2. 判断是否该模块已有缓存
//     if (require.cache["/Users/shilongqi/Code/Learn/nodejs/1-03.node的模块化细节/myModule.js"]) {
//         return require.cache["/Users/shilongqi/Code/Learn/nodejs/1-03.node的模块化细节/myModule.js"].result;
//     }

//     3. 读取文件内容
//     4. 包裹到一个函数中

//     function __temp(module, exports, require, __dirname, __filename) {
//         console.log("当前模块路径：", __dirname);
//         console.log("当前模块文件：", __filename);
//         exports.c = 3;
//         module.exports = {
//             a: 1,
//             b: 2
//         };
//         this.m = 5;
//     }

//     6. 创建module对象
//     module.exports = {};
//     const exports = module.exports;

//     __temp.call(module.exports, module, exports, require, module.path, module.filename)
//     return module.exports;
// }

// require.cache = {};

