const express = require('express');
const router = express.Router();
const adminServe = require('../../services/adminService');
const { asyncHandler } = require('../getSendResult')

router.post('/login',
    asyncHandler(async (req, res, next) => {
        const result = await adminServe.login(req.body.loginId, req.body.loginPwd);
        if (result) {
            // 登录成功
            res.header('set-cookie', `token=${result.id}; path=/; domain=localhost; max-age=3600; httponly`)
        }
        return result;
    })
)

router.post('/add', asyncHandler(async (req, res, next) => {
    const result = await adminServe.addAdmin(req.body);
    if (result) {
        // 注册成功
        next()
        return;
    }
}))

module.exports = router;