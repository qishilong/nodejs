const mysql = require("mysql2/promise");

const start = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sunnyqsl",
        database: "companydb",
    })

    const [result] = await connection.query("SELECT * FROM `company`");
    console.log(result)
    connection.end()
}

start();