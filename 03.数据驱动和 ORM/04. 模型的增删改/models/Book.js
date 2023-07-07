const sequelize = require("./db");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define(
    "Book",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publishDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: true  // 从此以后，该表的数据不会真正的删除，而是增加一列deletedAt, 记录删除时间
    }
);