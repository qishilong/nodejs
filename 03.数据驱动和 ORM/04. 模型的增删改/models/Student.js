const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
    "Student",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sex: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true  // 从此以后，该表的数据不会真正的删除，而是增加一列deletedAt, 记录删除时间
    }
);

module.exports = Student;