import { ActionReducerMapBuilder, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urlForcast } from '../../utils/constant';

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
  error: '',
};

const token = localStorage.getItem('jwt') as string;

export const getDataForcast = createAsyncThunk(
  "dataSales/getDataForcast",
  async () => {
    try {
      const response = await fetch(urlForcast, {
        method: "GET",
        headers: {
          Authorization: 'Token ' + token,
          'Content-Type': 'application/json',
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

const dataForcastSlice = createSlice({
  name: 'forcast',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
      .addCase(getDataForcast.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.results;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      })
      .addCase(getDataForcast.pending, (state) => {
        state.status = 'loading';
        state.error = 'loading';
      })
      .addCase(getDataForcast.rejected, (state) => {
        state.status = 'error';
        state.error = 'error'
      });
  },
});

export const { reducer: dataForcastReducer, actions: dataForcastActions } = dataForcastSlice;

