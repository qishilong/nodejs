const adminServe = require("./services/adminService")

adminServe.addAdmin({
    loginId: "admin1",
    loginPwd: "123qwe"
})

adminServe.deleteAdmin(2).then((res) => console.log(res));

adminServe.updateAdmin(3, { loginId: "abc" }).then((res) => console.log(res));