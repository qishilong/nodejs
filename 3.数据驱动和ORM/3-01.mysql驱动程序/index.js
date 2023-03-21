const mysql = require("mysql2/promise");

// 创建一个数据库连接
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sunnyqsl",
    database: "companydb",
    multipleStatements: true
})

const start = async (id) => {
    const sql = `SELECT * FROM employee where \`name\` like concat("%", ?, "%")`
    const [result] = await pool.execute(sql, [id])
    console.log(result)
    // pool.end()
}

start("戚");