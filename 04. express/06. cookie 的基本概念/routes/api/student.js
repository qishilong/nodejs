const express = require("express");
const router = express.Router();
const studentServe = require("../../services/studentService");
const { asyncHandler } = require("../getSendResult");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await studentServe.getStudents(page, limit, sex, name);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    return await studentServe.getStudentById(req.params.id);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return await studentServe.addStudent(req.body);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await studentServe.deleteStudent(req.params.id);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await studentServe.updateStudent(req.params.id, req.body);
  })
);

module.exports = router;
