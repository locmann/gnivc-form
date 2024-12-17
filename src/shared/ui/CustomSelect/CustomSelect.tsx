import { FC, useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

export type Option = {
  label: string;
  value: string | number;
};

type CustomSelectProps = {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  label?: string;
};

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    controlRef.current.setAttribute(
      'style',
      'background-color: #fff; border: 1px solid gray;'
    );
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    controlRef.current.setAttribute(
      'style',
      'background-color: #dadada; border: 1px solid #dadada;'
    );
    setIsOpen(false);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <div className={styles.labelInside}>{label}</div>
      <div className={styles.control} onClick={toggleDropdown} ref={controlRef}>
        <span>{value ? value.label : options[0].label}</span>
        <div className={styles.icons}>
          <span className={isOpen ? styles.arrowUp : styles.arrowDown} />
        </div>
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              className={
                value?.value === option.value
                  ? `${styles.option} ${styles.active}`
                  : styles.option
              }
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
