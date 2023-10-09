import { ActionReducerMapBuilder, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

 const token = localStorage.getItem('jwt') as string;

 const urlShops = 'http://95.163.233.5/v1/api/shops/'

export const getShops = createAsyncThunk(
  "shops/getShops",
  async () => {
    try {
      const response = await fetch(urlShops, {
        method: 'GET',
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

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
    builder
      .addCase(getShops.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.results;
        state.total = action.payload.count;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.pages = action.payload.pages;
      })
      .addCase(getShops.pending, (state) => {
        state.status = 'loading';
        state.error = 'loading';
      })
      .addCase(getShops.rejected, (state) => {
        state.status = 'error';
        state.error = 'error'
      });
  },
});

export const { reducer: shopReducer, actions: shopActions } = shopSlice;

