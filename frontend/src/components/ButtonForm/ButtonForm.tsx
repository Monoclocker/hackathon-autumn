import styles from './ButtonForm.module.scss';

interface IButtonFormProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonForm({ children, onClick }: IButtonFormProps) {
  return (
    <button className={styles['button-form']} onClick={onClick}>{children}</button>
  )
}
