import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { URL_HISTORY, URL_MAIN } from "../../utils/urlConst";

export default function Navbar() {
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["navbar__menu"]}>
        <li className={styles["navbar__item"]}>
          <NavLink
            to={URL_MAIN}
            className={({ isActive }) =>
              isActive ? styles["navbar__item_active"] : ""
            }
            end
          >
            Площадки
          </NavLink>
        </li>
        <li className={styles["navbar__item"]}>
          {" "}
          <NavLink
            to={URL_HISTORY}
            className={({ isActive }) =>
              isActive ? styles["navbar__item_active"] : ""
            }
            end
          >
            История
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
