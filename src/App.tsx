import "../src/index.css";
import { Route, Outlet, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainPage from "./pages/MainPage/MainPage";
import styles from './styles/App.module.css';
import ForcastPage from "./pages/ForcastPage/ForcastPage";


const App = () => {
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
