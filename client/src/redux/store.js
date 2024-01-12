import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { todoReducer } from "./slices/todo";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;
