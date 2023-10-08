import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectOption } from "../../components/ModalFilter/Select/Select";


export type UserLoginRequestType = {
  email: string;
  password?: string;
};

const initialState = {

 city: null,
 
};



const formSearchSlice = createSlice({
  name: "formSearch",
  initialState,
  reducers: {
    handleChangeCity: (state, action) => {
      state.email = action.payload;
    },
    handleChangeTK: (state, action) => {
      state.password = action.payload;
    },
    handleChangeGroup: (state, action) => {
      state.visual = action.payload;
    },
    handleCategory: (state, action) => {
        state.visual = action.payload;
      },
      handleSubcategory: (state, action) => {
        state.visual = action.payload;
      },
      handleSKU: (state, action) => {
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

export const { handleChangeCity, handleChangeTK, handleChangeGroup, handleCategory, handleSubcategory, handleSKU } =
formSearchSlice.actions;

export default formSearchSlice.reducer;
