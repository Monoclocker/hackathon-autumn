import styles from "./MarketplacePage.module.scss";
import Input from "../../components/Input/Input";
import { useState } from "react";
import ButtonForm from "../../components/ButtonForm/ButtonForm";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function MarketplacePage() {
  const [valueSearch, setValueSearch] = useState<string>("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  const handleClickBtnSearch = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log("a");
  };

  const handleClickBtnClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setValueSearch("");
  };

  return (
    <section className={styles["marketplace"]}>
      <form className={styles["marketplace-form"]}>
        <Input
          className={styles["marketplace__input-search"]}
          placeholder="Поиск"
          id={"search"}
          value={valueSearch}
          onChange={handleChangeInput}
        />
        <ButtonForm
          onClick={handleClickBtnSearch}
          className={styles["marketplace__input-btn"]}
        >
          <SearchIcon />
        </ButtonForm>
        <ButtonForm
          onClick={handleClickBtnClose}
          className={styles["marketplace__input-btn"]}
        >
          <CloseIcon />
        </ButtonForm>
      </form>
      MarketplacePage
    </section>
  );
}
