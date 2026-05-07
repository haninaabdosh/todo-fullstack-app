import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, Pencil, Check, LogOut } from "lucide-react";

const API = "http://localhost:3001/api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  async function auth() {
    try {
      const endpoint = isLogin ? "login" : "register";

      const res = await axios.post(`${API}/auth/${endpoint}`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.token);
      setToken(res.data.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  }

  async function fetchTodos() {
    try {
      const res = await axios.get(`${API}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(res.data.data.todos);
    } catch {
      alert("Failed to fetch todos");
    }
  }

  async function addTodo() {
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        `${API}/todos`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos([res.data.data.todo, ...todos]);
      setTitle("");
    } catch {
      alert("Failed to add todo");
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${API}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      alert("Delete failed");
    }
  }

  async function toggleTodo(todo) {
    try {
      const res = await axios.put(
        `${API}/todos/${todo.id}`,
        {
          is_complete: !todo.is_complete,
          title: todo.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(
        todos.map((t) =>
          t.id === todo.id ? res.data.data.todo : t
        )
      );
    } catch {
      alert("Update failed");
    }
  }

  async function saveEdit(id) {
    try {
      const res = await axios.put(
        `${API}/todos/${id}`,
        {
          title: editingText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(
        todos.map((t) =>
          t.id === id ? res.data.data.todo : t
        )
      );

      setEditingId(null);
    } catch {
      alert("Edit failed");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setTodos([]);
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
            Todo App
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Beautiful Full Stack Task Manager
          </p>

          <input
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border border-gray-300 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={auth}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-semibold transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p className="text-center mt-6 text-gray-600">
            {isLogin ? "No account?" : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 ml-2 font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Todo Dashboard
          </h1>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-100 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex gap-3 mb-8">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
            />

            <button
              onClick={addTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {todos.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No todos yet. Create your first one above!
            </div>
          )}

          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleTodo(todo)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${
                      todo.is_complete
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-400"
                    }`}
                  >
                    {todo.is_complete && <Check size={16} />}
                  </button>

                  {editingId === todo.id ? (
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border rounded-lg p-2 flex-1"
                    />
                  ) : (
                    <span
                      className={`text-lg ${
                        todo.is_complete
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {editingId === todo.id ? (
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl"
                    >
                      <Check size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditingText(todo.title);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl"
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
