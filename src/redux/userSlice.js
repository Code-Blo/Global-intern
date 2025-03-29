import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users with pagination
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return {
      users: response.data.data,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message || "Error fetching users");
  }
});

// Update user details
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, first_name, last_name, email }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, { first_name, last_name, email });
      return { id, first_name, last_name, email };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message || "Error updating user");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message || "Error deleting user");
  }
});

// Add new user
export const addUser = createAsyncThunk("users/addUser", async (newUser, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://reqres.in/api/users`, newUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message || "Error adding user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
