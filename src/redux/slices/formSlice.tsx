import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormType } from "../../types/types";
import { baseURL } from "../../utils/constant";

interface IPropType {
  password: string;
  email: string;
}

const initialState: FormType = {
  email: "",
  password: "",
  visual: false,
  token: "",
};

export const getToken = createAsyncThunk(
  "authorization/login",
  async ({ password, email }: IPropType, thunkAPI) => {
    try {
      const response = await fetch(baseURL + "api/auth/token/login/", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });
      const res = await response.json();
      return res;
    } catch (error) {
      console.log("Error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    handleChangeEmail: (state, action) => {
      state.email = action.payload;
    },
    handleChangePassword: (state, action) => {
      state.password = action.payload;
    },
    handleChangeVisual: (state, action) => {
      state.visual = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getToken.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      }
    );
  },
});

export const { handleChangeEmail, handleChangePassword, handleChangeVisual } =
  formSlice.actions;

export default formSlice.reducer;
