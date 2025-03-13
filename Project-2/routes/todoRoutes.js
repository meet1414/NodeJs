const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getAllTasks);
router.post("/add", todoController.addTask);
router.get("/edit/:id", todoController.getEditTask);
router.post("/update/:id", todoController.updateTask);
router.post("/delete/:id", todoController.deleteTask);

module.exports = router;
