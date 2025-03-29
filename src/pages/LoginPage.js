import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to users page if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/users");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://reqres.in/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful! Redirecting...", { autoClose: 1500 });

      setTimeout(() => {
        setLoading(false);
        navigate("/users");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 shadow-md rounded w-96" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          placeholder="Enter email"
          required
          disabled={loading}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Enter password"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className={`w-full px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
