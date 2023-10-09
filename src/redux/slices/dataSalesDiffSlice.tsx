import {
  ActionReducerMapBuilder,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { urlSalesDiff } from "../../utils/constant";

type DataTypeState = {
  dataSalesDiff: any[];
  total: number;
  page: number;
  size: number;
  nextPage: string;
  previousPage: string;
  pages: number;
  status: "init" | "loading" | "success" | "error";
  error: string | undefined;
};

const initialState: DataTypeState = {
  dataSalesDiff: [],
  total: 0,
  page: 1,
  size: 1,
  nextPage: "",
  previousPage: "",
  pages: 0,
  status: "init",
  error: undefined,
};

const token = localStorage.getItem("jwt") as string;

export const getDataSalesDiff = createAsyncThunk(
  "dataSales/getDataSalesDiff",
  async (urlNextOrPrevious: string | null) => {
    try {
      const response = await fetch(urlNextOrPrevious || urlSalesDiff, {
        method: "GET",
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = response.json();
        return data;
      }
    } catch (error) {
      throw new Error("Ошибка!" + error);
    }
  }
);

const dataSalesDiffSlice = createSlice({
  name: "salesDiff",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
      .addCase(getDataSalesDiff.fulfilled, (state, action) => {
        state.status = "success";

        state.dataSalesDiff = [
          ...state.dataSalesDiff,
          ...action.payload,
        ].filter(
          (value, index, array) =>
            array.map((v) => v.sku).indexOf(value.sku) === index
        );
        // state.nextPage = action.payload.next;
        // state.previousPage = action.payload.previous;

        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      })
      .addCase(getDataSalesDiff.pending, (state) => {
        state.status = "loading";
        state.error = "loading";
      })
      .addCase(getDataSalesDiff.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

export const { reducer: dataSalesDiffReducer, actions: dataSalesDiffActions } =
  dataSalesDiffSlice;
