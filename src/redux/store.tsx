import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { dataSalesReducer } from "./slices/dataSalesSlice";
import { dataForcastReducer } from "./slices/dataForcastSlice";
import formSlice from "./slices/formSlice";

const store = configureStore({
  reducer: {
    sales: dataSalesReducer,
    form: formSlice,
    forcast: dataForcastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
