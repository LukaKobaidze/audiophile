import styles from './Paragraph.module.scss';

type Props = React.HTMLAttributes<HTMLParagraphElement>;

export default function Paragraph(props: Props) {
  const { className, children, ...restProps } = props;

  return (
    <p className={`${styles.paragraph} ${className || ''}`} {...restProps}>
      {children}
    </p>
  );
}
