'use client';
import { createContext, useEffect, useState } from 'react';
import { CartProductInterface } from '@/types';
import { useLocalStorageState } from '@/hooks';

type CartItem = { quantity: number; data: CartProductInterface | null };
export type CartItemsType = { [key: number]: CartItem };

type CartContextType = {
  items: CartItemsType;
  addToCart: (id: number, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  items: {},
  addToCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export function CartProvider(props: Props) {
  const { children } = props;

  const [items, setItems] = useLocalStorageState<CartItemsType>(
    'audiophile-cart',
    {}
  );
  const itemKeys = Object.keys(items);

  const addToCart = (id: number, quantity: number) => {
    setItems((state) => {
      const item = state[id];

      return {
        ...state,
        [id]: { ...item, quantity: (item?.quantity || 0) + quantity },
      };
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    const item = items[id];

    if (!item) return;

    setItems((state) => {
      if (quantity < 1 || isNaN(quantity)) {
        const stateCopy = { ...state };
        delete stateCopy[id];
        return stateCopy;
      }

      return { ...state, [id]: { ...item, quantity: quantity } };
    });
  };

  const clearCart = () => {
    setItems({});
  };

  useEffect(() => {
    itemKeys.forEach((id) => {
      if (items[Number(id)]?.data) return;
      fetch(`http://localhost:3000/api/cart/${id}`)
        .then((response) => response.json())
        .then(({ data }) =>
          setItems((state) => ({
            ...state,
            [id]: { ...state[Number(id)], data },
          }))
        );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemKeys]);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
