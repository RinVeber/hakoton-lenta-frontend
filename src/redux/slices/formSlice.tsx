import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FormType from "../../types/types";
// import { URL } from "../../utils/constant";

const initialState: FormType = {
  email: "",
  password: "",
  visual: false,
  token: "",
};

export const getToken = createAsyncThunk(
  "form/getToken",
async (email, password) => {
    try {
      const response = await fetch("http://95.163.233.5/v1/api/auth/token/login/", {
        method: "POST",
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const token = response.json();
        return token;
      }
    } catch (error) {
      throw new Error("Ошибка!" + error);
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
