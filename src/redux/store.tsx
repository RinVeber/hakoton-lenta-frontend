import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { dataScalesReducer } from "./slices/dataScalesSlice";
import { dataForcastReducer } from "./slices/dataForcastSlice";
import formSlice from "./slices/formSlice";

const store = configureStore({
  reducer: {
    scales: dataScalesReducer,
    form: formSlice,
    forcast: dataForcastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
