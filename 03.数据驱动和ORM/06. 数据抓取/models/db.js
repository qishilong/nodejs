const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("myschooldb", "root", "sunnyqsl", {
    host: "localhost",
    dialect: "mysql",
    // logging: null
})

module.exports = sequelize;