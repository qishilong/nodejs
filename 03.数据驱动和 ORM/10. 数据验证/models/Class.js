const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const Student = require("./Student");

const Class = sequelize.define(
    "Class",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        openDate: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true  // 从此以后，该表的数据不会真正的删除，而是增加一列deletedAt, 记录删除时间
    }
);

Class.hasMany(Student);

module.exports = Class;