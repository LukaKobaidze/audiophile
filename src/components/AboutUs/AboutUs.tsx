import { Heading, ImageResponsive, Paragraph } from '@/components';
import styles from './AboutUs.module.scss';

interface Props {
  className?: string;
}

export default function AboutUs(props: Props) {
  const { className } = props;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.text}>
        <Heading tagLevel="2" styleLevel="2">
          Bringing you the <span className={styles.highlight}>best</span> audio gear
        </Heading>{' '}
        <Paragraph className={styles.textParagraph}>
          Located at the heart of New York City, Audiophile is the premier store for
          high end headphones, earphones, speakers, and audio accessories. We have a
          large showroom and luxury demonstration rooms available for you to browse
          and experience a wide range of our products. Stop by our store to meet some
          of the fantastic people who make Audiophile the best place to buy your
          portable audio equipment.
        </Paragraph>
      </div>

      <div className={styles.imageWrapper}>
        <ImageResponsive
          desktop={{ path: '/assets/shared/desktop/image-best-gear.jpg' }}
          tablet={{
            path: '/assets/shared/tablet/image-best-gear.jpg',
            breakpoint: 855,
          }}
          mobile={{ path: '/assets/shared/mobile/image-best-gear.jpg' }}
          className={styles.image}
          alt=""
          fill
        />
      </div>
    </div>
  );
}
