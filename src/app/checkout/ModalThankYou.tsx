import Link from 'next/link';
import { useRef, useState } from 'react';
import { IconOrderConfirmation } from '@/icons';
import { CartItemsType } from '@/context/cart.context';
import { Heading, Modal, Paragraph, ProductSmall } from '@/components';
import styles from './ModalThankYou.module.scss';

interface Props {
  items: CartItemsType;
}

export default function ModalThankYou(props: Props) {
  const { items } = props;

  const [showMoreItems, setShowMoreItems] = useState(false);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const itemKeys = Object.keys(items);
  const firstItem = items[Number(itemKeys[0])];

  return (
    <Modal className={styles.container} portal>
      <div ref={contentWrapperRef} className={styles.contentWrapper}>
        <IconOrderConfirmation className={styles.icon} />
        <Heading tagLevel="3" styleLevel="3" className={styles.heading}>
          <span>THANK YOU</span>
          <span>FOR YOUR ORDER</span>
        </Heading>
        <Paragraph className={styles.paragraph}>
          You will receive an email confirmation shortly.
        </Paragraph>

        {firstItem.data && (
          <div className={styles.details}>
            <div className={styles.items}>
              {!showMoreItems ? (
                <ProductSmall
                  data={firstItem.data}
                  quantityVariant="2"
                  quantity={firstItem.quantity}
                  imageSize={50}
                  className={styles.oneProduct}
                />
              ) : (
                itemKeys.map((key) => {
                  const item = items[Number(key)];

                  return item.data ? (
                    <ProductSmall
                      key={key}
                      data={item.data}
                      quantity={item.quantity}
                      quantityVariant="2"
                      imageSize={50}
                      className={styles.productExtended}
                    />
                  ) : (
                    <></>
                  );
                })
              )}
              {itemKeys.length > 1 && (
                <button
                  className={styles.btnMore}
                  onClick={() => setShowMoreItems((state) => !state)}
                >
                  {showMoreItems
                    ? 'View less'
                    : `and ${itemKeys.length - 1} other item(s)`}
                </button>
              )}
            </div>
            <div
              className={`${styles.grandTotal} ${
                showMoreItems ? styles.grandTotalExtended : ''
              }`}
            >
              <div className={styles.grandtotalText}>GRAND TOTAL</div>
              <div className={styles.grandtotalPrice}>$ 5,446</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.btnWrapper}>
        <Link href="/" className={`button-1 ${styles.button}`}>
          BACK TO HOME
        </Link>
      </div>
    </Modal>
  );
}
