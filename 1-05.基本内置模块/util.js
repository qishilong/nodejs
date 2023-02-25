const util = require("node:util");
// console.log(util)

// const delay = async (duration = 1000) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(duration)
//         }, duration)
//     })
// }

// const delayToCallback = util.callbackify(delay);
// delayToCallback(100, (err, info) => console.log(err, info))

// const callbackFn = (duration, callback) => {
//     setTimeout(() => {
//         callback(null, duration)
//     }, duration)
// }

// const callbackToAsync = util.promisify(callbackFn);
// (async () => {
//     const result = await callbackToAsync(500);
//     console.log(result)
// })()

// const obj1 = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 4,
//             g: {
//                 h: 5
//             }
//         }
//     }
// }

// const obj2 = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 4,
//             g: {
//                 h: 5,
//                 // i: {}
//             }
//         }
//     }
// }

// const judgeResult = util.isDeepStrictEqual(obj1, obj2)
// console.log(judgeResult)