let tasks = [
    { id: 1, title: "Buy groceries", description: "Milk, Bread, Fruits", status: "Pending" },
    { id: 2, title: "Meeting with Team", description: "Project discussion", status: "Completed" },
];

exports.getAllTasks = (req, res) => {
    res.render("index", { tasks });
};

exports.addTask = (req, res) => {
    const { title, description, status } = req.body;
    const newTask = { id: tasks.length + 1, title, description, status };
    tasks.push(newTask);
    res.redirect("/");
};

exports.getEditTask = (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    res.render("edit", { task });
};

exports.updateTask = (req, res) => {
    const { title, description, status } = req.body;
    tasks = tasks.map(task =>
        task.id == req.params.id ? { ...task, title, description, status } : task
    );
    res.redirect("/");
};

exports.deleteTask = (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    res.redirect("/");
};
