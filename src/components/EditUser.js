import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!user.first_name || !user.last_name || !user.email) {
      toast.error("All fields are required!");
      return;
    }

    setUpdating(true);
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      toast.success("User updated successfully!");
      setTimeout(() => navigate("/users"), 2000);
    } catch (err) {
      toast.error("Failed to update user. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-bold p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Edit User</h2>
      <form onSubmit={handleEdit} className="space-y-3">
        <input
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          className="border p-2 w-full rounded"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          className="border p-2 w-full rounded"
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border p-2 w-full rounded"
          placeholder="Email"
          required
        />
        <button 
          type="submit" 
          className={`w-full text-white p-2 rounded ${updating ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"}`}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
