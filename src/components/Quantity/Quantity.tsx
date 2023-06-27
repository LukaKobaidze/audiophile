import styles from './Quantity.module.scss';

interface Props {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function Quantity(props: Props) {
  const { quantity, onChange, min, max, className } = props;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <button
        className={`button-3 ${styles.button}`}
        onClick={() => onChange(min ? Math.max(quantity - 1, min) : quantity - 1)}
        aria-label="minus"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className={`button-3 ${styles.button}`}
        onClick={() => onChange(max ? Math.min(quantity + 1, max) : quantity + 1)}
        aria-label="plus"
      >
        +
      </button>
    </div>
  );
}
