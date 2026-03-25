import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, Toast } from '@/types';

interface CartStore {
  items: CartItem[];
  toasts: Toast[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      toasts: [],
      
      addItem: (item: MenuItem) => {
        const items = get().items;
        const existingItem = items.find((i) => i._id === item._id);
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
        
        get().addToast(`${item.name} added to cart!`, 'success');
      },
      
      removeItem: (id: string) => {
        const items = get().items;
        const item = items.find((i) => i._id === id);
        set({
          items: items.filter((i) => i._id !== id),
        });
        if (item) {
          get().addToast(`${item.name} removed from cart`, 'info');
        }
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, quantity } : i
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      addToast: (message: string, type: 'success' | 'error' | 'info') => {
        const id = Date.now().toString();
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        
        // Auto remove after 3 seconds
        setTimeout(() => {
          get().removeToast(id);
        }, 3000);
      },
      
      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'fun-food-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

