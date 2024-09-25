import express from "express";

const app = express();
app.use(express.json());

const validateId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedTodoId = parseInt(id);
  if (isNaN(parsedTodoId))
    return res.status(400).send({ message: "Bad request. Invalid Id." });
  const todoId = todos.findIndex((todo) => todo.id === parsedTodoId);
  if (todoId === -1) return res.status(404).send({ message: "Todo not found" });
  req.todoId = todoId;
  next();
};

const todos = [];

const PORT = process.env.PORT || 3000;

// get all todos

app.get("/api/todos", (req, res) => {
  res.status(200).send(todos);
});

// get todo with id
app.get("/api/todos/:id", validateId, (req, res) => {
  const { todoId } = req;
  return res.status(202).send(todos[todoId]);
});

// save todo
app.post("/api/todos", (req, res) => {
  const { body } = req;
  const todo = { id: todos.length + 1, ...body };
  todos.push(todo);
  return res.status(201).send(todo);
});

// delete todo
app.delete("/api/todos/:id", validateId, (req, res) => {
  const { todoId } = req;
  todos.splice(todos[todoId], 1);
  return res.status(204).send({ message: "Todo deleted" });
});

// update todo
app.patch("/api/todos/:id", (req, res) => {
  const { body, todoId } = req;
  todos[todoId] = { ...todos[todoId], ...body };
  return res.status(202).send(todos[todoId]);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
