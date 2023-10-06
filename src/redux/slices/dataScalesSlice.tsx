import { ActionReducerMapBuilder, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urlScales } from '../../utils/constant';

type DataTypeState = {
  data: [],
  total: number;
  page: number;
  size: number;
  pages: number;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

const initialState: DataTypeState = {
  data: [],
  total: 0,
  page: 1,
  size: 1,
  pages: 0,
  status: 'init',
  error: undefined,
};

export const getDataSales = createAsyncThunk(
  "dataSales/getDataSales",
  async () => {
    try {
      const response = await fetch(urlScales, {
        method: "GET",
        mode: 'no-cors',
        headers: {
          "Content-type": "application/json",
        },
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

const dataScalesSlice = createSlice({
  name: 'scales',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
      .addCase(getDataSales.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.results;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      })
      .addCase(getDataSales.pending, (state) => {
        state.status = 'loading';
        state.error = 'loading';
      })
      .addCase(getDataSales.rejected, (state) => {
        state.status = 'error';
        state.error = 'error'
      });
  },
});

export const { reducer: dataScalesReducer, actions: dataScalesActions } = dataScalesSlice;

