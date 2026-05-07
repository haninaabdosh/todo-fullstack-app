import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

let users = [];
let todos = [];

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      success: false,
      message: "No token"
    });
  }

  try {
    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running"
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = users.find(
    (u) => u.email === email
  );

  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Email already exists"
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    email,
    password: hashed
  };

  users.push(user);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const valid = await bcrypt.compare(
    password,
    user.password
  );

  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }
  });
});

app.get("/api/auth/me", auth, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

app.get("/api/todos", auth, (req, res) => {
  const userTodos = todos.filter(
    (t) => t.user_id === req.user.id
  );

  res.json({
    success: true,
    data: {
      todos: userTodos
    }
  });
});

app.post("/api/todos", auth, (req, res) => {
  const todo = {
    id: Date.now(),
    title: req.body.title,
    is_complete: false,
    user_id: req.user.id
  };

  todos.unshift(todo);

  res.status(201).json({
    success: true,
    data: todo
  });
});

app.put("/api/todos/:id", auth, (req, res) => {
  const id = Number(req.params.id);

  todos = todos.map((todo) => {
    if (
      todo.id === id &&
      todo.user_id === req.user.id
    ) {
      return {
        ...todo,
        ...req.body
      };
    }

    return todo;
  });

  res.json({
    success: true
  });
});

app.delete("/api/todos/:id", auth, (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter(
    (todo) =>
      !(
        todo.id === id &&
        todo.user_id === req.user.id
      )
  );

  res.json({
    success: true
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    "Server running on port",
    process.env.PORT
  );
});
