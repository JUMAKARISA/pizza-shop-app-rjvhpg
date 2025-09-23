
import { useState, useCallback } from 'react';
import { CartItem, Pizza, PizzaSize } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((pizza: Pizza, size: PizzaSize, quantity: number = 1, customToppings: string[] = []) => {
    const toppingPrice = customToppings.length * 1.5; // $1.50 per extra topping
    const totalPrice = (pizza.basePrice + toppingPrice) * size.multiplier * quantity;
    
    const newItem: CartItem = {
      id: `${pizza.id}-${size.id}-${Date.now()}`,
      pizza,
      size,
      quantity,
      customToppings,
      totalPrice,
    };

    setCartItems(prev => [...prev, newItem]);
    console.log('Added to cart:', newItem);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    console.log('Removed from cart:', itemId);
  }, []);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const toppingPrice = item.customToppings.length * 1.5;
        const totalPrice = (item.pizza.basePrice + toppingPrice) * item.size.multiplier * newQuantity;
        return { ...item, quantity: newQuantity, totalPrice };
      }
      return item;
    }));
    console.log('Updated quantity for item:', itemId, 'to:', newQuantity);
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    console.log('Cart cleared');
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };
};
