import {
  ActionReducerMapBuilder,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { urlForcast } from "../../utils/constant";
import mockForecast from "../../utils/mokForecast.json";
import { SearchForm } from "../../components/ModalFilter/types/types";

type DataTypeState = {
  data: [];
  total: number;
  page: number;
  size: number;
  pages: number;
  status: "init" | "loading" | "success" | "error";
  error: string | undefined;
};

const initialState: DataTypeState = {
  data: [],
  total: 0,
  page: 1,
  size: 1,
  pages: 0,
  status: "init",
  error: "",
};

const token = localStorage.getItem("jwt") as string;

export const getDataForcast = createAsyncThunk(
  "dataForcast/getDataForcast",
  async () => {
    try {
      const response = await fetch(urlForcast, {
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
      // return mockForecast;   // мок из json
      throw new Error("Ошибка!" + error);
    }
  }
);

export const getDataForcastSearch = createAsyncThunk(
  "dataForcast/getDataForcastSearch",
  async (formData: SearchForm) => {
    try {
      const data = {
        city: formData.city?.title,
        store: formData.store?.title,
        sku: formData.store?.title,
        group: formData.group?.title,
        category: formData.category?.title,
        subcategory: formData.subcategory?.title,
      };
      const response = await fetch(
        `${urlForcast}?city=${data.city}&store=${data.store}&sku=${data.sku}&group=${data.group}&category=${data.category}&subcategory=${data.subcategory}`,
        {
          method: "GET",
          headers: {
            Authorization: "Token " + token,
            "Content-Type": "application/json",
          },
        }
      );
      debugger;
      if (response.ok) {
        const data = response.json();
        return data;
      }
    } catch (error) {
      throw new Error("Ошибка!" + error);
    }
  }
);

const dataForcastSlice = createSlice({
  name: "forcast",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
      .addCase(getDataForcastSearch.fulfilled, (state, action) => {
        state.status = "success";
        debugger;
        state.data = action.payload.results;
        state.total = action.payload.count;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      })
      .addCase(getDataForcast.pending, (state) => {
        state.status = "loading";
        state.error = "loading";
      })
      .addCase(getDataForcast.rejected, (state) => {
        state.status = "error";
        state.error = "error";
        
      })
      .addCase(getDataForcast.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.results;
        state.total = action.payload.count;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      });
      
  },
});

export const { reducer: dataForcastReducer, actions: dataForcastActions } =
  dataForcastSlice;
