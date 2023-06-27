import { AboutUs, Categories, ContentWrapper } from '@/components';
import styles from './layout.module.scss';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ContentWrapper>
        <Categories className={styles.categories} />
        <AboutUs className={styles.aboutUs} />
      </ContentWrapper>
    </>
  );
}
