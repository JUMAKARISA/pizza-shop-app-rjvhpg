
import { Pizza, PizzaSize } from '../types';

export const pizzaSizes: PizzaSize[] = [
  {
    id: 'small',
    name: 'Small (10")',
    multiplier: 1.0,
    description: 'Perfect for 1-2 people',
  },
  {
    id: 'medium',
    name: 'Medium (12")',
    multiplier: 1.3,
    description: 'Great for 2-3 people',
  },
  {
    id: 'large',
    name: 'Large (14")',
    multiplier: 1.6,
    description: 'Ideal for 3-4 people',
  },
  {
    id: 'xlarge',
    name: 'X-Large (16")',
    multiplier: 2.0,
    description: 'Perfect for sharing',
  },
];

export const pizzas: Pizza[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    basePrice: 12.99,
    category: 'classic',
    toppings: ['mozzarella', 'tomato sauce', 'basil'],
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Traditional pepperoni with mozzarella cheese and tomato sauce',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    basePrice: 14.99,
    category: 'classic',
    toppings: ['pepperoni', 'mozzarella', 'tomato sauce'],
  },
  {
    id: 'quattro-stagioni',
    name: 'Quattro Stagioni',
    description: 'Four seasons pizza with mushrooms, artichokes, ham, and olives',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    basePrice: 18.99,
    category: 'specialty',
    toppings: ['mushrooms', 'artichokes', 'ham', 'olives', 'mozzarella'],
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian Supreme',
    description: 'Fresh vegetables with bell peppers, mushrooms, onions, and tomatoes',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop',
    basePrice: 16.99,
    category: 'vegetarian',
    toppings: ['bell peppers', 'mushrooms', 'onions', 'tomatoes', 'mozzarella'],
  },
  {
    id: 'hawaiian',
    name: 'Hawaiian',
    description: 'Ham and pineapple with mozzarella cheese',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
    basePrice: 15.99,
    category: 'specialty',
    toppings: ['ham', 'pineapple', 'mozzarella'],
  },
  {
    id: 'meat-lovers',
    name: 'Meat Lovers',
    description: 'Pepperoni, sausage, ham, and bacon with extra cheese',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    basePrice: 19.99,
    category: 'specialty',
    toppings: ['pepperoni', 'sausage', 'ham', 'bacon', 'mozzarella'],
  },
];

export const availableToppings = [
  'pepperoni', 'sausage', 'ham', 'bacon', 'chicken',
  'mushrooms', 'bell peppers', 'onions', 'tomatoes', 'olives',
  'pineapple', 'jalapeños', 'spinach', 'artichokes', 'extra cheese'
];
