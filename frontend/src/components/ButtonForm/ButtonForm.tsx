import styles from "./ButtonForm.module.scss";

interface IButtonFormProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export default function ButtonForm({
  children,
  onClick,
  className,
}: IButtonFormProps) {
  return (
    <button
      className={`${styles["button-form"]} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
