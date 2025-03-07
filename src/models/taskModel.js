class Task {
  static lastId = 0;
  constructor(title, description, completed = false, priority = "medium") {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
  }
}

module.exports = Task;
