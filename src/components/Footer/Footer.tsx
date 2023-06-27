import { Logo, IconFacebook, IconTwitter, IconInstagram } from '@/icons';
import { Navigation, Paragraph, ContentWrapper } from '@/components';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ContentWrapper className={styles.content}>
        <div className={styles.logoAndNav}>
          <Logo className={styles.logo} />
          <Navigation
            className={styles.navigation}
            classNameList={styles.navigationList}
            aria-label="footer navigation"
          />
        </div>

        <Paragraph className={styles.paragraph}>
          Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a
          small team of music lovers and sound specialists who are devoted to helping
          you get the most out of personal audio. Come and visit our demo facility -
          we&apos;re open 7 days a week.
        </Paragraph>
        <Paragraph className={`${styles.paragraph} ${styles.copyright}`}>
          Copyright 2021. All Rights Reserved
        </Paragraph>
        <div className={styles.socials}>
          <button className={styles.socialsButton} aria-label="facebook">
            <IconFacebook />
          </button>
          <button className={styles.socialsButton} aria-label="twitter">
            <IconTwitter />
          </button>
          <button className={styles.socialsButton} aria-label="instagram">
            <IconInstagram />
          </button>
        </div>
      </ContentWrapper>
    </footer>
  );
}
