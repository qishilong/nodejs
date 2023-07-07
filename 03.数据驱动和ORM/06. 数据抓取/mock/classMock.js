const Mock = require("mockjs");
const Class = require("../models/Class");

const result = Mock.mock({
    "datas|16": [
        {
            "id|+1": 1,
            name: "@id 班",
            openDate: "@date",
        },
    ],
}).datas;

Class.bulkCreate(result);
