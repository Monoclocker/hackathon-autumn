import ButtonForm from "../../components/ButtonForm/ButtonForm";
import styles from "./RegisterPage.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useState } from "react";
import MainLogo from "../../components/MainLogo/MainLogo";
import { URL_LOGIN } from "../../utils/urlConst";

export default function RegisterPage() {
  const location = useNavigate();

  const [registrForm, setRegistrForm] = useState({
    login: "",
    password: "",
    email: "",
  });

  const handleChangeRegistrForm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setRegistrForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBtnClick = () => {
    // отправка запроса через fetch
    // потом можно использовать useNavigate, который будет перенапрвлять нас на логин, если никаких ошибок с бека не пришло
  };

  return (
    <div className={styles["container"]}>
      <MainLogo />
      <h1>Регистрация</h1>
      <form method="POST">
        <div className={styles["registr-form"]}>
          <Input
            placeholder={"Логин"}
            id={"login"}
            type={"text"}
            name={"login"}
            value={registrForm.login}
            onChange={handleChangeRegistrForm}
            maxLength={50}
            minLength={5}
            required={true}
          />
          <Input
            placeholder={"Пароль"}
            id={"password"}
            type={"text"}
            name={"password"}
            value={registrForm.password}
            onChange={handleChangeRegistrForm}
            maxLength={50}
            minLength={5}
            required={true}
          />
          <Input
            placeholder={"Почта"}
            id={"email"}
            type={"email"}
            name={"email"}
            value={registrForm.email}
            onChange={handleChangeRegistrForm}
          />
          <ButtonForm onClick={handleBtnClick}>Создать аккаунт</ButtonForm>
        </div>
      </form>
    </div>
  );
}
