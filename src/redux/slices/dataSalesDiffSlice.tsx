import {
  ActionReducerMapBuilder,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { urlSalesDiff } from "../../utils/constant";
import { SearchForm } from "../../components/ModalFilter/types/types";
import { toQuery } from "../../utils/helperFunction";



type DataTypeState = {
  dataSalesDiff: any[];
  dataSalesDiffSearch: any[],
  total: number;
  page: number;
  size: number;
  nextPage: string;
  previousPage: string;
  isExistSearchSalesDiff: boolean,
  pages: number;
  status: "init" | "loading" | "success" | "error";
  error: string | undefined;
};

const initialState: DataTypeState = {
  dataSalesDiff: [],
  dataSalesDiffSearch: [],
  total: 0,
  page: 1,
  size: 1,
  isExistSearchSalesDiff: false,
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

export const getDataSalesDiffSearch = createAsyncThunk(
  "dataSales/getDataSalesDiffSearch",
  async (formData: SearchForm) => {
    try {
      const data = {
        city: formData.city?.title == null ? "" : formData.city?.title,
        store: formData.store?.title == null ? "" : formData.store?.title,
        sku: formData?.sku == null ? [] : formData.sku.map((v) => v.title),
        group: formData.group?.title == null ? "" : formData.group?.title,
        category:
          formData.category?.title == null ? "" : formData.category?.title,
        subcategory:
          formData.subcategory?.title == null
            ? ""
            : formData.subcategory?.title,
      };
      const query = toQuery(data);

      const response = await fetch(
        //`${urlForcast}?city=${data.city}&store=${data.store}&${data.sku.map((v)=>'sku=' + v).join('&')}&group=${data.group}&category=${data.category}&subcategory=${data.subcategory}`,
        //
        // `${urlForcast}?city=${data.city}&store=${data.store}`,
        `${urlSalesDiff}?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: "Token " + token,
            "Content-Type": "application/json",
          },
        }
      );
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
  reducers: {
    handleChangeIsExistSearchSalesDiff: (state, action) => {
      state.isExistSearchSalesDiff = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
      .addCase(getDataSalesDiff.fulfilled, (state, action) => {
        state.status = "success";
        state.dataSalesDiff = Array.from(
          new Set([...state.dataSalesDiff, ...action.payload])
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
      })
      .addCase(getDataSalesDiffSearch.fulfilled, (state, action) => {
        state.status = "success";
        state.dataSalesDiffSearch = Array.from(
          new Set([...state.dataSalesDiff, ...action.payload])
        );
        state.total = action.payload.count;
        state.isExistSearchSalesDiff = true;

           // state.nextPage = action.payload.next;
        // state.previousPage = action.payload.previous;
        // state.page = action.payload.page;
        // state.size = action.payload.size;
        // state.pages = action.payload.pages;
      })
      .addCase(getDataSalesDiffSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataSalesDiffSearch.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      })
  },
});

export const { reducer: dataSalesDiffReducer, actions: dataSalesDiffActions } =
  dataSalesDiffSlice;

  export const { handleChangeIsExistSearchSalesDiff } = dataSalesDiffSlice.actions;