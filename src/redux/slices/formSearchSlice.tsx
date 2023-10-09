import {createSlice } from "@reduxjs/toolkit";


export type UserLoginRequestType = {
  email: string;
  password?: string;
};

const initialState = {

 city: null,
 store: null,
 group: null,
 category: null,
 subcategory: null,
 sku: null,
 
};



const formSearchSlice = createSlice({
  name: "formSearch",
  initialState,
  reducers: {
    handleChangeCity: (state, action) => {
      state.city = action.payload;
    },
    handleChangeTK: (state, action) => {
      state.store = action.payload;
    },
    handleChangeGroup: (state, action) => {
      state.group = action.payload;
    },
    handleCategory: (state, action) => {
        state.category = action.payload;
      },
      handleSubcategory: (state, action) => {
        state.subcategory = action.payload;
      },
      handleSKU: (state, action) => {
        state.sku = action.payload;
      },
  },
  // // extraReducers: (builder) => {
  // //   builder.addCase(
  // //     getResultSearch.fulfilled,
  // //     (state, action: PayloadAction<string>) => {
  // //       state.data = action.payload;
  // //     }
  // //   );
  // },
});

export const { handleChangeCity, handleChangeTK, handleChangeGroup, handleCategory, handleSubcategory, handleSKU } =
formSearchSlice.actions;

export default formSearchSlice.reducer;
