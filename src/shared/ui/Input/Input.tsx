import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { error } = props;
  return (
    <input
      className={`${styles.input} ${error ? styles.inputError : ''}`}
      ref={ref}
      {...props}
    />
  );
});
