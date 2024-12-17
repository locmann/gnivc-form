import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { error, className } = props;
  return (
    <input
      className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
