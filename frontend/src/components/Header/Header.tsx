import styles from "./Header.module.scss";
import Navbar from "../Navbar/Navbar";
import MainLogo from "../MainLogo/MainLogo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        <MainLogo />
        <Navbar />
        <ProfileIcon />
      </div>
    </header>
  );
}
