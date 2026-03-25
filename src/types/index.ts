// Types for The Fun Food Application

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isAvailable: boolean;
  createdAt?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  grandTotal: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'cash' | 'upi';
  upiId?: string;
  status: OrderStatus;
  statusHistory: StatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'received' 
  | 'preparing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered';

export interface StatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Admin {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

