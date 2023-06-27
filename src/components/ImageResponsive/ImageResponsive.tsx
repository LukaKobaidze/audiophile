import Image, { ImageProps } from 'next/image';
import styles from './ImageResponsive.module.scss';

interface Props extends Omit<ImageProps, 'src'> {
  desktop: { path: string };
  tablet?: { path: string; breakpoint?: number };
  mobile?: { path: string; breakpoint?: number };
}

export default function ImageResponsive(props: Props) {
  const { desktop, tablet, mobile, className, alt, sizes, ...restProps } = props;

  return (
    <picture>
      {mobile && (
        <source
          srcSet={mobile.path}
          media={`(max-width: ${mobile.breakpoint || 375}px)`}
        />
      )}
      {tablet && (
        <source
          srcSet={tablet.path}
          media={`(max-width: ${tablet.breakpoint || 768}px)`}
        />
      )}
      <Image
        src={desktop.path}
        alt={alt || ''}
        className={`${styles.image} ${className || ''}`}
        sizes="100vw"
        {...restProps}
      />
    </picture>
  );
}
