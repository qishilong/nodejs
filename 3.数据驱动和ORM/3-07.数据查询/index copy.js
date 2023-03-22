const adminService = require("./services/adminService")

adminService.getAdminById(1).then(res => console.log(res))