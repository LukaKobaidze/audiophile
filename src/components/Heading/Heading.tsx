import styles from './Heading.module.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  tagLevel: '1' | '2' | '3' | '4' | '5' | '6';
  styleLevel: '1' | '2' | '3' | '4' | '5' | '6';
}

export default function Heading(props: Props) {
  const { tagLevel, styleLevel, children, className, ...restProps } = props;

  const DynamicElement: keyof JSX.IntrinsicElements = `h${tagLevel}`;

  return (
    <DynamicElement
      className={`${styles.heading} ${styles[`heading--${styleLevel}`]} ${
        className || ''
      }`}
      {...restProps}
    >
      {children}
    </DynamicElement>
  );
}
