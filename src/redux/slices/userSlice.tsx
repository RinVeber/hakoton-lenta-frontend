import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { baseURL } from "../../utils/constant";
import { userMe } from "../../types/types";

const initialState: userMe = {
  user: {
    first_name: "",
    last_name: "",
  },
  status: "init",
  error: undefined,
};

export const getUser = createAsyncThunk("userSlice/getUser", async () => {
  try {
    const token = localStorage.getItem("jwt") as string;
    const response = await fetch(baseURL + "users/me", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error get user", error);
    throw new Error("Ошибка получения данных пользователя");
  }
});

export const logOut = createAsyncThunk("userSlice/getUser", async () => {
  try {
    const token = localStorage.getItem("jwt") as string;
    const response = await fetch(baseURL + "api/auth/token/logout", {
      method: "POST",
      headers: {
        Authorization: "Token " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.status;
  } catch (error) {
    console.log("Error logout", error);
    throw new Error("Ошибка logout");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<userMe>) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = "loading";
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
