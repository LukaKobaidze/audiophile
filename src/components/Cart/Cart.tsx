'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CartContext } from '@/context/cart.context';
import { IconCart } from '@/icons';
import {
  AlertOutsideClick,
  Backdrop,
  Heading,
  Paragraph,
  ProductSmall,
} from '@/components';
import styles from './Cart.module.scss';

export default function Cart() {
  const pathname = usePathname();
  const { items: cartItems, updateQuantity, clearCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [showCartTotalQuantity, setShowCartTotalQuantity] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const cartItemsKeys = Object.keys(cartItems);

  const getTotalPrice = () => {
    return cartItemsKeys.reduce((acc, key) => {
      const id = Number(key);
      const item = cartItems[id];

      return acc + item.quantity * (item.data?.price || 0);
    }, 0);
  };

  const cartItemsQuantity = useMemo(
    () => {
      return cartItemsKeys.reduce((acc, key) => {
        return acc + (cartItems[Number(key)]?.quantity || 0);
      }, 0);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems]
  );

  useEffect(() => {
    setShowCartTotalQuantity(true);
    const timeout = setTimeout(() => {
      setShowCartTotalQuantity(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [cartItems]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showCart]);

  useEffect(() => {
    setShowCart(false);
  }, [pathname]);

  return (
    <>
      {showCart && <Backdrop />}
      <div className={styles.cartButtonWrapper}>
        <button
          className={styles.cartButton}
          onClick={() => setShowCart((state) => !state)}
          ref={cartButtonRef}
          aria-label="cart button"
        >
          {!showCart && (
            <span
              className={`${styles.cartButtonQuantity} ${
                showCartTotalQuantity && cartItemsQuantity !== 0 ? styles.show : ''
              }`}
            >
              {cartItemsQuantity}
            </span>
          )}
          <IconCart />
        </button>
      </div>
      {showCart && (
        <AlertOutsideClick
          shouldHandle={showCart}
          onOutsideClick={() => setShowCart(false)}
          ignore={[cartButtonRef]}
          className={styles.cart}
          aria-label="cart"
        >
          <div className={styles.cartHeader}>
            <Heading tagLevel="3" styleLevel="6">
              Cart {cartItemsQuantity !== 0 && `(${cartItemsQuantity})`}
            </Heading>

            {cartItemsKeys.length !== 0 && (
              <button
                className={`button-3 ${styles.cartBtnRemoveAll}`}
                onClick={clearCart}
              >
                Remove all
              </button>
            )}
          </div>
          <div className={styles.cartItemsWrapper}>
            <ul className={styles.cartItemsList}>
              {cartItemsKeys.length !== 0 ? (
                cartItemsKeys.map((key) => {
                  const id = Number(key);
                  const item = cartItems[id];

                  return (
                    <li key={key} className={styles.cartItem}>
                      <ProductSmall
                        data={item.data}
                        quantity={item.quantity}
                        quantityVariant="1"
                        onQuantityChange={(quantity) => updateQuantity(id, quantity)}
                      />
                    </li>
                  );
                })
              ) : (
                <span className={styles.cartEmpty}>Cart Is Empty</span>
              )}
            </ul>
          </div>

          <div className={styles.cartFooter}>
            {cartItemsKeys.length !== 0 && (
              <div className={styles.cartTotal}>
                <Paragraph className={styles.cartTextTotal}>TOTAL</Paragraph>
                <span className={styles.cartPrice}>
                  $ {getTotalPrice().toLocaleString()}
                </span>
              </div>
            )}

            <Link
              href="/checkout"
              className={`button-1 ${styles.cartCheckoutAnchor} ${
                cartItemsKeys.length === 0 ? 'button-disable' : ''
              }`}
            >
              CHECKOUT
            </Link>
          </div>
        </AlertOutsideClick>
      )}
    </>
  );
}
