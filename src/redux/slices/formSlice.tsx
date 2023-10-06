import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FormType from "../../types/types";
import { URL } from "../../utils/constant";

const initialState: FormType = {
  email: "",
  password: "",
  visual: false,
  token: "",
};

export const getToken = createAsyncThunk(
  "form/getToken",
  async ({ password, email }) => {
    try {
      const response = await fetch(URL + "/api/auth/token/login", {
        // mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });
      if (response.ok) {
        console.log(response);
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
