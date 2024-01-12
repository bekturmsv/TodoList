import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBaseUrl from "../../axios";

export const fetchTodos = createAsyncThunk("posts/fetchTodos", async () => {
  const { data } = await axiosBaseUrl.get("api/todo/todos");
  return data;
});

export const fetchRemoveTodo = createAsyncThunk(
  "posts/fetchRemoveTodo",
  async (id) => {
    await axiosBaseUrl.delete(`api/todo/todos/${id}`);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        (state.status = "loading"), (state.items = []);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        (state.status = "loaded"), (state.items = action.payload);
      })
      .addCase(fetchTodos.rejected, (state) => {
        (state.status = "error"), (state.items = []);
      })
      .addCase(fetchRemoveTodo.pending, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo._id !== action.meta.arg
        );
      });
  },
});

export const todoReducer = todoSlice.reducer;
