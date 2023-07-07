require("./init");
const studentService = require("./services/studentService");

studentService.getStudents().then((res) => console.log(res));