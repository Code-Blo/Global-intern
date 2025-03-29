import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a short delay for better UX
    setTimeout(() => {
      setToken(localStorage.getItem("token"));
      setLoading(false);
    }, 1000);

    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkToken); // Sync logout across tabs
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully!"); // 🎉 Logout toast
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="p-4 flex justify-between bg-gray-200">
        <h1 className="text-xl font-bold">User Management</h1>
        {token && (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        )}
      </div>

      <Routes>
        <Route path="/" element={token ? <Navigate to="/users" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/users" element={token ? <UsersPage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
