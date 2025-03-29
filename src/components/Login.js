import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("https://reqres.in/api/login", { email, password });
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful! Redirecting...", { autoClose: 1500 });
      setTimeout(() => navigate("/users"), 2000);
    } catch (err) {
      toast.error("Invalid credentials! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full rounded mb-2"
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full rounded mb-2"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className={`w-full text-white p-2 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
