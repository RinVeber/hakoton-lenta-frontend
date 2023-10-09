import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { baseURL } from "../../utils/constant";
import { DateChange } from "../../types/types";

const initialState: DateChange = {
  changeDate: [],
  error: undefined,
  status: "init",
};

export const getDate = createAsyncThunk(
  "date/getDate",
  async ({ currentDate }:any, thunkAPI) => {
    const { start, end } = currentDate;
    const token = localStorage.getItem("jwt") as string;
    try {
      const response = await fetch(
        baseURL + `api/newforecast?${start}&${end}`,
        {
          method: "GET",
          headers: {
            Authorization: "Token " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log("Error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DateChange>) => {
    builder
      .addCase(getDate.fulfilled, (state, action) => {
        state.changeDate = action.payload;
      })
      .addCase(getDate.rejected, (state) => {
        state.error = "error";
      })
      .addCase(getDate.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const {} = dateSlice.actions;

export default dateSlice.reducer;
