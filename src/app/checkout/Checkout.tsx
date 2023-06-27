'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useContext, useEffect, useState } from 'react';
import { CartContext, CartItemsType } from '@/context/cart.context';
import { Heading, ProductSmall, ContentWrapper } from '@/components';
import ModalThankYou from './ModalThankYou';
import Form from './Form';
import styles from './Checkout.module.scss';

const SHIPPING_COST = 50;

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalItems, setModalItems] = useState<CartItemsType>({});
  const formSubmitRef = useRef<HTMLInputElement>(null);

  const itemKeys = Object.keys(items);

  useEffect(() => {
    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, []);

  useEffect(() => {
    if (!showModal && itemKeys.length === 0) {
      router.push('/');
    }
  }, [itemKeys, showModal, router]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  }, [showModal]);

  const totalPrice = itemKeys.reduce((acc, key) => {
    const item = items[Number(key)];

    return acc + item.quantity * (item.data?.price || 0);
  }, 0);

  const handleFormSubmitSuccess = () => {
    setShowModal(true);
    setModalItems(items);
    clearCart();
  };

  return (
    <div className={styles.container}>
      <ContentWrapper className={styles.wrapper}>
        <Link href="/" className={`button-3 ${styles.goBack}`}>
          Go Back
        </Link>

        <div className={styles.content}>
          <div className={styles.checkout}>
            <Heading tagLevel="1" styleLevel="3" className={styles.checkoutHeading}>
              Checkout
            </Heading>

            <Form
              submitRef={formSubmitRef}
              onFormSubmitSuccess={handleFormSubmitSuccess}
            />
          </div>

          <div className={styles.summary}>
            <Heading tagLevel="2" styleLevel="6">
              Summary
            </Heading>

            <div>
              <div className={styles.summaryItemsWrapper}>
                {itemKeys.map((key) => {
                  const item = items[Number(key)];

                  return (
                    <ProductSmall
                      key={key}
                      data={item.data}
                      quantity={item.quantity}
                      quantityVariant="2"
                      className={styles.summaryItem}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.summaryPrice}>
              <span>TOTAL</span>
              <span>$ {totalPrice.toLocaleString()}</span>
            </div>
            <div className={styles.summaryPrice}>
              <span>SHIPPING</span>
              <span>$ {SHIPPING_COST}</span>
            </div>
            <div className={styles.summaryPrice}>
              <span>VAT (INCLUDED)</span>
              <span>$ {Math.round(totalPrice * 0.2)}</span>
            </div>
            <div
              className={`${styles.summaryPrice} ${styles.summaryPriceGrandTotal}`}
            >
              <span>GRAND TOTAL</span>
              <span>$ {(totalPrice + SHIPPING_COST).toLocaleString()}</span>
            </div>
            <div className={styles.summaryButtonWrapper}>
              <button
                className={`button-1 ${styles.summaryButton}`}
                onClick={() => formSubmitRef.current?.click()}
              >
                CONTINUE & PAY
              </button>
            </div>
          </div>
        </div>
      </ContentWrapper>

      {showModal && <ModalThankYou items={modalItems} />}
    </div>
  );
}
