import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res.data.data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        toast.error("Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">User List</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading users...</p>}

      {!loading && users.length > 0 && (
        <table className="table-auto w-full mt-4 border bg-white shadow-md">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="p-2 border">
                  <img src={user.avatar} alt={user.first_name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-2 border">{user.first_name}</td>
                <td className="p-2 border">{user.last_name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => navigate(`/edit/${user.id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
