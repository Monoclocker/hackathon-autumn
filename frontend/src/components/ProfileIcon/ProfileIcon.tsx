import styles from "./ProfileIcon.module.scss";

export default function ProfileIcon() {
  return (
    <div className={styles["profile-icon"]}>
      <img
        src="./profile-default.png"
        alt="profile-logo"
        className={styles["profile-icon__image"]}
      />
    </div>
  );
}
