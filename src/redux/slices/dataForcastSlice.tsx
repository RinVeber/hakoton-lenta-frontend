import {
  ActionReducerMapBuilder,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { urlForcast } from "../../utils/constant";
// import mockForecast from "../../utils/mokForecast.json";
import { SearchForm } from "../../components/ModalFilter/types/types";
import { toQuery } from "../../utils/helperFunction";

export type DataState = {
  category: string;
  forecast: [];
  group: string;
  sku: string;
  store: string;
  subcategory: string;
};

type DataTypeState = {
  dataForcast: DataState[];
  searchData: DataState[];
  total: number;
  page: number;
  nextPage: string;
  previousPage: string;
  size: number;
  pages: number;
  isExistSearch: boolean;
  status: "init" | "loading" | "success" | "error";
  error: string | undefined;
};

const initialState: DataTypeState = {
  dataForcast: [],
  searchData: [
    {
      category: "initial",
      forecast: [],
      group: "string",
      sku: "string",
      store: "string",
      subcategory: "string",
    },
  ],
  total: 0,
  isExistSearch: false,
  page: 1,
  size: 1,
  nextPage: "",
  previousPage: "",
  pages: 0,
  status: "init",
  error: "",
};

const token = localStorage.getItem("jwt") as string;

export const getDataForcast = createAsyncThunk(
  "dataForcast/getDataForcast",
  async (urlNextOrPrevious: string | null) => {
    try {
      const response = await fetch(urlNextOrPrevious || urlForcast, {
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
        `${urlForcast}?${query}`,
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

const dataForcastSlice = createSlice({
  name: "forcast",
  initialState,
  reducers: {
    handleChangeIsExistSearch: (state, action) => {
      state.isExistSearch = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
     
      .addCase(getDataForcastSearch.fulfilled, (state, action) => {
        state.status = "success";
        state.searchData = action.payload.results;
        state.total = action.payload.count;
        state.isExistSearch = true;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      })
      .addCase(getDataForcastSearch.pending, (state) => {
        state.status = "loading";
      })
   
      .addCase(getDataForcastSearch.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      })
      .addCase(getDataForcast.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      })
      .addCase(getDataForcast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataForcast.fulfilled, (state, action) => {
        state.status = "success";
        // TODO

        state.dataForcast = Array.from(
          new Set([
            ...state.dataForcast,
            ...action.payload.results,
            // {
            //   category: "string " + new Date().toLocaleTimeString(),
            //   forecast: action.payload.results[0].forecast,
            //   group: "string " + new Date().toLocaleTimeString(),
            //   sku: "string " + new Date().toLocaleTimeString(),
            //   store: "string " + new Date().toLocaleTimeString(),
            //   subcategory: "string " + new Date().toLocaleTimeString(),
            // },
          ])

        );

        state.total = action.payload.count;
        state.page = action.payload.page;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      });
  },
});

export const { reducer: dataForcastReducer, actions: dataForcastActions } =
  dataForcastSlice;

export const { handleChangeIsExistSearch } = dataForcastSlice.actions;
