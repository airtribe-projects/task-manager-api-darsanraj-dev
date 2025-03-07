const Task = require("../models/taskModel");
const { validateTask } = require("../utils/validation");

let tasks = [];
       
tasks.push({
       id: 1,
       title: "Set up environment",
       description: "Install Node.js, npm, and git",
       completed: true,
       priority: "medium"
     });

exports.getTasks = (req, res) => {

  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  console.log(task);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.createTask = (req, res) => {
    const {title, description, completed, priority } = req.body;
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  const finalPriority = priority || "medium";
  const newTask = { id, title, description, completed, priority : finalPriority};  
  tasks.push(newTask);
    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {title, description, completed, priority } = req.body;
  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority || task.priority;

  res.json(task);
};

exports.deleteTask = (req, res) => {

  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: "Task deleted successfully" });
};
