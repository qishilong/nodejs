// 管理员初始化
// 判断数据库中是否有管理员，如果没有，自动添加一个默认管理员
const Admin = require("../models/Admin");

exports.addAdmin = async (adminObj) => {
    // 这里应该先进行一步判断用户名是否存在并且各个属性是否合理
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

    return await Admin.update(adminObj, {
        where: {
            id: adminId
        }
    })
}