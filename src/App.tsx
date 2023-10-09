import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import styles from "./styles/App.module.css";
import ForcastPage from "./pages/ForcastPage/ForcastPage";
import MainPage from "./pages/MainPage/MainPage";
import { Header, ProtectedRoute } from "./components/index";

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <>
              <ProtectedRoute component={MainPage} />
            </>
          }
        />
        <Route
          path="/forcast"
          element={
            <>
              <Header />
              <ProtectedRoute component={ForcastPage} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
