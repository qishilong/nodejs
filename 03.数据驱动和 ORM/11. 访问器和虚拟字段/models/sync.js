require("./Admin.js");
require("./Book.js");
require("./Class.js");
require("./Student.js");

const sequelize = require("./db.js")

sequelize.sync({ alert: true }).then(() => console.log("所有模型同步完成"))