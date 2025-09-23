
export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  category: 'classic' | 'specialty' | 'vegetarian';
  toppings: string[];
}

export interface PizzaSize {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export interface CartItem {
  id: string;
  pizza: Pizza;
  size: PizzaSize;
  quantity: number;
  customToppings: string[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerInfo: CustomerInfo;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
  email?: string;
}
