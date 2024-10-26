import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import usePageStyles from "./hooks/usePageStyles";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MainPage from "./pages/MainPage/MainPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage.tsx";
import MarketplacePage from "./pages/MarketplacePage/MarketplacePage.tsx";
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_MAIN,
  URL_HISTORY,
} from "./utils/urlConst.ts";

function App() {
  usePageStyles();

  return (
    <Routes>
      {/* Главная страница, которая будет открываться после авторизации */}
      <Route path={URL_MAIN} element={<MainPage />}>
        <Route index element={<MarketplacePage />} />
        <Route path={URL_HISTORY} element={<HistoryPage />} />
      </Route>

      {/* Страницы для авторизации и регистрации */}
      <Route path={URL_LOGIN} element={<LoginPage />} />
      <Route path={URL_REGISTER} element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
