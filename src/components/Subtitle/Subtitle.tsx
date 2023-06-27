import styles from './Subtitle.module.scss';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export default function Subtitle(props: Props) {
  const { className, children, ...restProps } = props;

  return (
    <span className={`${styles.subtitle} ${className || ''}`} {...restProps}>
      {children}
    </span>
  );
}
