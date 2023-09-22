import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';


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

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
//   extraReducers: (builder: ActionReducerMapBuilder<DataTypeState>) => {
//     builder
//       .addCase(getData.fulfilled, (state, action) => {
//         state.status = 'success';
//         state.data = action.payload.items;
//         state.total = action.payload.total;
//         state.page = action.payload.page;
//         state.size = action.payload.size;
//         state.pages = action.payload.pages;
//       })
//   },
});

export const { reducer: dataReducer, actions: dataActions } = dataSlice;

