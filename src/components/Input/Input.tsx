'use client';
import { useState } from 'react';
import styles from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  validation?: (value: string) => boolean;
  onError?: () => void;
  onValid?: () => void;
  numbersOnly?: boolean;
}

export default function Input(props: Props) {
  const {
    error,
    className,
    type,
    value,
    id,
    checked,
    validation,
    onError,
    onValid,
    numbersOnly,
    ...restProps
  } = props;

  const [focused, setFocused] = useState(false);

  const handleInputBlur = () => {
    setFocused(false);

    if (!value || !validation || !onError) return;

    if (!validation(String(value))) {
      onError();
    }
  };

  const handleInputFocus = () => {
    setFocused(true);
  };

  return type === 'radio' ? (
    <label
      className={`${styles.radioWrapper} ${
        checked ? styles['radioWrapper--checked'] : ''
      } ${focused ? styles['radioWrapper--focused'] : ''} ${className || ''}`}
      htmlFor={id}
    >
      <input
        type="radio"
        id={id}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={() => onValid && onValid()}
        {...restProps}
      />
      <span>{value}</span>
    </label>
  ) : (
    <div
      className={`${styles.inputWrapper} ${
        error ? styles['inputWrapper--error'] : ''
      }`}
    >
      <input
        className={`${styles[`input--${type}`]} ${className || ''}`}
        type={type}
        id={id}
        value={value}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...restProps}
      />
    </div>
  );
}
