import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import usePageStyles from './utils/usePageStyles';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  usePageStyles();

  //сделай пути в виде констант

  return (
    <Routes>

      {/* Страницы для авторизации и регистрации */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/registration' element={<RegisterPage />} />
    </Routes>
  )
}

export default App
