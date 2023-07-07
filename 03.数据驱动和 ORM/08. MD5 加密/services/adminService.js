const Admin = require("../models/Admin");
const md5 = require("md5")

exports.addAdmin = async (adminObj) => {
    adminObj.loginPwd = md5(adminObj.loginPwd)
    const res = await Admin.create(adminObj);
    return res.toJSON();
}

exports.deleteAdmin = async (adminId) => {
    /**
     * 方式一
     * step 1: 获取实例
     * step 2: 删除实例
     */
    // const ins = await Admin.findByPk(adminId);
    // if (ins) {
    //     await ins.destroy();
    // }

    /**
     * 方式二
     */
    return await Admin.destroy({
        where: {
            id: adminId
        }
    })
}

exports.updateAdmin = async (adminId, adminObj) => {
    /**
     * 方式一
     * step 1: 获取实例
     * step 2: 更新
     * step 3: 保存
     */

    // const ins = await Admin.findByPk(adminId);
    // ins.adminId = adminObj.loginId;
    // ins.save();

    /**
     * 方式二
     */
    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd)
    }
    return await Admin.update(adminObj, {
        where: {
            id: adminId
        }
    })
}

exports.login = async (loginId, loginPwd) => {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    })
    if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
        return result.toJSON();
    }
    return null;
}

exports.getAdminById = async function (id) {
    const result = await Admin.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

exports.getAdmins = async function () {
    const result = await Admin.findAll();
    return JSON.parse(JSON.stringify(result));
};
