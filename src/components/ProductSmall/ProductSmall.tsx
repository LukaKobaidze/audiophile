import Link from 'next/link';
import Image from 'next/image';
import { CartProductInterface } from '@/types';
import { Quantity } from '@/components';
import styles from './ProductSmall.module.scss';

interface PropsShared {
  data: CartProductInterface | null;
  quantity: number;
  imageSize?: number;
  className?: string;
}

type PropsQuantity =
  | {
      quantityVariant: '1';
      onQuantityChange: (quantity: number) => void;
    }
  | {
      quantityVariant: '2';
    };

type Props = PropsShared & PropsQuantity;

export default function ProductSmall(props: Props) {
  const { data, quantity, quantityVariant, imageSize = 64, className } = props;

  const imgAnchorStyle = { '--size': imageSize + 'px' } as React.CSSProperties;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {data ? (
        <Link
          href={'/product/' + data.slug}
          className={styles.imgAnchor}
          style={imgAnchorStyle}
        >
          <Image
            src={'/' + data.image}
            alt=""
            className={styles.img}
            width={150}
            height={150}
          />
        </Link>
      ) : (
        <div className={styles.imgLoading} />
      )}
      <div className={styles.textAndQuantity}>
        {data ? (
          <div>
            <Link
              href={'/product/' + data.slug}
              className={styles.name}
              tabIndex={-1}
            >
              {data.name}
            </Link>
            <div className={styles.price}>$ {data.price.toLocaleString()}</div>
          </div>
        ) : (
          <div className={styles.textLoading} />
        )}

        {quantityVariant === '1' ? (
          <Quantity
            quantity={quantity}
            onChange={props.onQuantityChange}
            className={styles.quantity1}
          />
        ) : (
          <div className={styles.quantity2}>x{quantity}</div>
        )}
      </div>
    </div>
  );
}
