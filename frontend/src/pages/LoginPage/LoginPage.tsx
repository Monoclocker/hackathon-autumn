import styles from './LoginPage.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/ButtonForm/ButtonForm';
<<<<<<< HEAD
import { authAPI } from '../../api/authAPI';
import GetUserRequest from '../../dto/requests/auth/GetUserRequest';
=======
import MainLogo from '../../components/MainLogo/MainLogo';
>>>>>>> 5ba06309ead8ef2166321e1d8b8b6c69ab046d83

export default function LoginPage() {

  const [loginForm, setLoginForm] = useState<GetUserRequest>({
    username: "",
    password: ""
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleChangeLoginForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginForm(prev => ({ ...prev, [name]: value }));
  }

  const handleClickIconVisible = () => setIsPasswordVisible(prev => !prev);



  const handleBtnClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const api = new authAPI()
    
    if (await api.Login(loginForm) !== true){
      //вот тут сделай отображение ошибки
    }

    navigate("") // а тут маршрут

  }

  return (
    <div className={styles['container']}>
      <MainLogo />
      <h1>Авторизация</h1>
      <form method="GET">
        <div className={styles['login-form']}>
          <div className={styles["login-form__input-wrapper"]}>
            <Input className={"login-form__input"} placeholder={"Логин"} id={"login"} type={"text"} name={"login"} value={loginForm.username} onChange={handleChangeLoginForm} required={true} />
          </div>
          <div className={styles["login-form__input-wrapper"]}>
            <Input className={styles["login-form__input"]} id="password" placeholder="Пароль" type={isPasswordVisible ? "text" : "password"} name="password" value={loginForm.password} onChange={handleChangeLoginForm} required={true} />
            {
              isPasswordVisible ? <VisibilityIcon className={styles["login-form__input-icon"]} onClick={handleClickIconVisible} /> :
                <VisibilityOffIcon className={styles["login-form__input-icon"]} onClick={handleClickIconVisible} />
            }
          </div>
          <ButtonForm onClick={handleBtnClick}>Войти</ButtonForm>
        </div>
      </form>
      <div className={styles["text-for-registr"]}>
        У вас ещё нет аккаунта? <Link to="/registration">Зарегистироваться</Link>
      </div>
    </div>
  )
}
