const express = require('express')
const app = express()
var cors = require('cors')
const pool = require('./db')

app.use(express.json()) //req.body

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})



//routes/

//get all todos
app.get("/blogs",async(req,res) => {
    const allTodos = await pool.query('SELECT * FROM blogs')
    res.json(allTodos.rows)
}) 

// get a specific todo
app.get("/blogs/:id",async(req,res) => {
    const {id} = req.params;

    try {
        const todo = await pool.query("SELECT * FROM blogs WHERE todo_id = $1",[id])
        res.json(todo.rows[0]);

    } catch (error) {
        console.error(error.message)
    }
    
})

// get a specific description
/* app.get("/todos_desc/:description",async(req,res) => {
    const {description} = req.params;

    try {
        const todo = await pool.query("SELECT * FROM todo WHERE description = $1",[description])
        res.json(todo.rows[0]);

    } catch (error) {
        console.error(error.message)
    }
    
}) */


// create a todo
app.post('/blogs',async(req,res) => {
    try {
        //await
        // console.log(req.body);;
        const {title,body,author} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO blogs (title,body,author) VALUES ($1,$2,$3) RETURNING *",[title,body,author]
        );
            res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// update a todo
/* app.put('/blogs/:id',async (req,res) => {
    try {
        const {id} = req.params // WHERE
        const {description} = req.body //SET

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id])
        res.json('todo was updated');
    } catch (error) {
        console.error(error.message);
    }
})*/


// delete a todo
app.delete('/blogs/:id',async(req,res) => {
    try {
        const {id} = req.params

        const deleteTodo = await pool.query("DELETE FROM blogs WHERE todo_id = $1",[id])
        res.json('Todo was successfully deleted!');
    } catch (error) {
        console.error(error.message);
    }
})



app.listen(5000, () => {
    console.log('server is listening on port 5000');
})