import styles from './ContentWrapper.module.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function ContentWrapper(props: Props) {
  const { children, className, ...restProps } = props;
  return (
    <div className={`${styles.wrapper} ${className || ''}`} {...restProps}>
      {children}
    </div>
  );
}
