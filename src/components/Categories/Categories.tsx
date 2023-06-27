import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from '@/icons';
import styles from './Categories.module.scss';

interface Props {
  className?: string;
}

export default function Categories(props: Props) {
  const { className } = props;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.categoryWrapper}>
        <div className={`${styles.imageWrapper} ${styles.imageWrapperHeadphones}`}>
          <Image
            src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
            alt=""
            width={438}
            height={422}
            className={styles.image}
          />
        </div>
        <Link href="/headphones" className={styles.category}>
          <span className={styles.categoryName}>HEADPHONES</span>
          <span className={styles.categoryShop}>
            <span>SHOP</span>
            <IconArrowRight className={styles.categoryShopIcon} />
          </span>
        </Link>
      </div>
      <div className={styles.categoryWrapper}>
        <div className={`${styles.imageWrapper} ${styles.imageWrapperSpeakers}`}>
          <Image
            src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
            alt=""
            className={styles.image}
            width={438}
            height={408}
          />
        </div>
        <Link href="/speakers" className={styles.category}>
          <span className={styles.categoryName}>SPEAKERS</span>
          <span className={styles.categoryShop}>
            <span>SHOP</span>
            <IconArrowRight className={styles.categoryShopIcon} />
          </span>
        </Link>
      </div>
      <div className={styles.categoryWrapper}>
        <div className={`${styles.imageWrapper} ${styles.imageWrapperEaphones}`}>
          <Image
            src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
            alt=""
            className={styles.image}
            width={438}
            height={380}
          />
        </div>
        <Link href="/earphones" className={styles.category}>
          <span className={styles.categoryName}>EARPHONES</span>
          <span className={styles.categoryShop}>
            <span>SHOP</span>
            <IconArrowRight className={styles.categoryShopIcon} />
          </span>
        </Link>
      </div>
    </div>
  );
}
