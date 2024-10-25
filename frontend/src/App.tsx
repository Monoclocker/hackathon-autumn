import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import usePageStyles from './hooks/usePageStyles';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  usePageStyles();

  return (
    <Routes>
      {/* Главная страница, которая будет открываться после авторизации */}
      <Route path='/' element={<MainPage />} />

      {/* Страницы для авторизации и регистрации */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/registration' element={<RegisterPage />} />
    </Routes>
  )
}

export default App
