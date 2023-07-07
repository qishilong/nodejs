const moment = require("moment");
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
            allowNull: false,
            get() {
                return this.getDataValue("birthday").getTime();
            }
        },
        age: {
            type: DataTypes.STRING,
            get() {
                const now = moment.utc();
                const birthday = moment.utc(this.birthday);
                return now.diff(birthday, "y"); // 得到两个日期的年份差异
            }
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