import styles from './Overline.module.scss';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export default function Overline(props: Props) {
  const { className, children, ...restProps } = props;

  return (
    <span className={`${styles.overline} ${className || ''}`} {...restProps}>
      {children}
    </span>
  );
}
