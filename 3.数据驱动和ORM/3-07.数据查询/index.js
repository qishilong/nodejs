const bookService = require("./services/bookService")

bookService.getBooks(1, 10, "学").then(res => console.log(res))