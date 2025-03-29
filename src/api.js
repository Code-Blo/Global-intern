import axios from "axios";

const API_URL = "https://reqres.in/api/users";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.data; // Returning only the user data
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const res = await axios.post(API_URL, user);
    return res.data;
  } catch (error) {
    throw new Error("Error adding user");
  }
};

// Update a user
export const updateUser = async (id, updatedUser) => {
  try {
    await axios.put(`${API_URL}/${id}`, updatedUser);
    return updatedUser; // Returning the updated user data
  } catch (error) {
    throw new Error("Error updating user");
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Returning the deleted user ID
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
