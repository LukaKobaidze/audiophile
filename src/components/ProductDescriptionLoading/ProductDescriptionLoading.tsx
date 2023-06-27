import styles from './ProductDescriptionLoading.module.scss';

interface Props {
  className?: string;
  classNameImg?: string;
  classNameDescription?: string;
}

export default function ProductDescriptionLoading(props: Props) {
  const { className, classNameImg, classNameDescription } = props;

  return (
    <div className={`${styles.loadingSkeleton} ${className || ''}`}>
      <div className={`${styles.loadingSkeletonImg} ${classNameImg}`} />
      <div
        className={`${styles.loadingSkeletonDescription} ${classNameDescription}`}
      >
        <div className={styles.loadingSkeletonOverline} />
        <div className={styles.loadingSkeletonHeading}>
          <div />
          <div />
        </div>
        <div className={styles.loadingSkeletonParagraph}>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className={styles.loadingSkeletonButton} />
      </div>
    </div>
  );
}
