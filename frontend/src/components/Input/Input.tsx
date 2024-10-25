import styles from './Input.module.scss';

interface IInputProps {
  className?: string;
  placeholder: string;
  id?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
}

export default function Input({ placeholder, id, type = 'text', className, value, onChange, name, required, maxLength, minLength }: IInputProps) {
  return (
    <input className={`${styles['input']} ${className || ''}`} placeholder={placeholder} {...(id ? { id } : {})}
      {...(name ? { name } : {})} type={type} value={value} onChange={onChange} required={required} maxLength={maxLength} minLength={minLength}></input>
  )
}
