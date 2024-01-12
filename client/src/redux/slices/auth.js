import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBaseUrl from "../../axios";

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axiosBaseUrl.post("/api/user/register", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axiosBaseUrl.post("/api/user/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axiosBaseUrl.get("/api/user/profile");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
