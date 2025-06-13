import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, CartContextType, Product } from '../types/Product';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, packageSize: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id && item.packageSize === packageSize
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.packageSize === packageSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1, packageSize }];
    });
  };

  const removeFromCart = (productId: string, packageSize: number) => {
    setItems(prevItems =>
      prevItems.filter(
        item => !(item.product.id === productId && item.packageSize === packageSize)
      )
    );
  };

  const updateQuantity = (productId: string, packageSize: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, packageSize);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.packageSize === packageSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.product.pricePerKg * item.packageSize * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};