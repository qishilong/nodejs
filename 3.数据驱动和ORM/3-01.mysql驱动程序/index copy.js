const mysql = require("mysql2");

// 创建一个数据库连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sunnyqsl",
    database: "companydb",
})

// 简单的查询语句
connection.query("SELECT * from  `company`; ", (err, result) => {
    console.log(result)
})

connection.query(
    "insert into company(`name`,location,buildDate) values('abbc', '阿萨德', curdate());",
    (err, result) => {
        console.log(result);
    }
);

connection.query(
    "update company set `name`='bcd' where id=4",
    (err, result) => {
        console.log(result);
    }
);

connection.query(
    "delete from company where id=4",
    (err, result) => {
        console.log(result);
    }
);

// connection.end()