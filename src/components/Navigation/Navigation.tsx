import Link from 'next/link';
import styles from './Navigation.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  classNameList?: string;
}

export default function Navigation(props: Props) {
  const { className, classNameList, ...restProps } = props;

  return (
    <nav className={`${styles.navigation} ${className || ''}`} {...restProps}>
      <ul className={`${styles.list} ${classNameList}`}>
        <li className={styles.listItem}>
          <Link href="/" className={styles.listItemAnchor}>
            HOME
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/headphones" className={styles.listItemAnchor}>
            HEADPHONES
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/speakers" className={styles.listItemAnchor}>
            SPEAKERS
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/earphones" className={styles.listItemAnchor}>
            EARPHONES
          </Link>
        </li>
      </ul>
    </nav>
  );
}
