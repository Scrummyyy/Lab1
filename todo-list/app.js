const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let tasks = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const filter = req.query.filter;
    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'notcompleted') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    res.render('index', { tasks: filteredTasks });
});

app.post('/add', (req, res) => {
    const newTask = { name: req.body.task, completed: false };
    tasks.push(newTask);
    res.redirect('/');
});

app.get('/complete/:index', (req, res) => {
    const index = req.params.index;
    tasks[index].completed = !tasks[index].completed;
    res.redirect('/');
});

app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    res.render('edit', { task: tasks[index], index });
});

app.post('/edit/:index', (req, res) => {
    const index = req.params.index;
    tasks[index].name = req.body.task;
    res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
