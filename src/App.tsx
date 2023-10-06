import "../src/index.css";
import { Route, Outlet, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainPage from "./pages/MainPage/MainPage";
import styles from './styles/App.module.css';
import ForcastPage from "./pages/ForcastPage/ForcastPage";
import { useAppDispatch } from "./redux/store";
import React from "react";
import { login } from "./redux/slices/tokenSlice";
import { getToken } from "./redux/slices/formSlice";


const App = () => {

  const dispatch = useAppDispatch();
  const email = 'frontend@lenta.com';
  const password = '061020YWGV';

  const data = {
    email: 'frontend@lenta.com',
    password: '061020YWGV',
  }

  React.useEffect(() => {
dispatch(login(data))
  })

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/forcast" element={<ForcastPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
