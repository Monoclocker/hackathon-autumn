import styles from "./MainPage.module.scss";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <div className={styles["container"]}>
      <Header />
      <Outlet />
    </div>
  );
}
