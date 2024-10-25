import styles from './LoginPage.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/ButtonForm/ButtonForm';

export default function LoginPage() {

  const [loginForm, setLoginForm] = useState({
    login: "",
    password: ""
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleChangeLoginForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginForm(prev => ({ ...prev, [name]: value }));
  }

  const handleClickIconVisible = () => setIsPasswordVisible(prev => !prev);



  const handleBtnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // Тут fetch
  }

  return (
    <div className={styles['container']}>
      <h1>Авторизация</h1>
      <form method="GET">
        <div className={styles['login-form']}>
          <div className={styles["login-form__input-wrapper"]}>
            <Input className={"login-form__input"} placeholder={"Логин"} id={"login"} type={"text"} name={"login"} value={loginForm.login} onChange={handleChangeLoginForm} required={true} />
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
