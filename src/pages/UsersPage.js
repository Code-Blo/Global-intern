import { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../api"; // Import API functions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ first_name: "", last_name: "", avatar: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.first_name || !newUser.last_name || !newUser.avatar) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      const user = await addUser(newUser);
      setUsers([...users, user]);
      toast.success("User added successfully!");
      setNewUser({ first_name: "", last_name: "", avatar: "" });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editingUser.id, {
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
      });

      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Users List</h2>

      {/* Add User Form */}
      <div className="mb-6 p-4 border rounded shadow-md bg-gray-50">
        <h3 className="text-lg font-bold mb-2">Add New User</h3>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="First Name"
            value={newUser.first_name}
            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.last_name}
            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={newUser.avatar}
            onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
        >
          Add User
        </button>
      </div>

      {/* Display Loading or Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* User List */}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border shadow-md rounded text-center bg-white">
              <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mx-auto mb-2" />
              {editingUser?.id === user.id ? (
                <>
                  <input
                    type="text"
                    value={editingUser.first_name}
                    onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                    className="border p-2 w-full mb-2 rounded"
                  />
                  <input
                    type="text"
                    value={editingUser.last_name}
                    onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                    className="border p-2 w-full mb-2 rounded"
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold">{user.first_name} {user.last_name}</p>
                  <div className="mt-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
