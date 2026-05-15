import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  gallery?: string[];
  description: string;
  isPreOrder?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  items: CartItem[];
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  deliveryLocation?: string;
  deliveryCharge?: number;
}

interface AppState {
  // Auth
  isAdminUser: boolean;
  loginAdmin: (password: string, username: string) => boolean;
  logoutAdmin: () => void;

  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Orders
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  createOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAdminUser: false,
      loginAdmin: (password, username) => {
        if (username === 'taj' && password === '1234') {
          set({ isAdminUser: true });
          return true;
        }
        return false;
      },
      logoutAdmin: () => set({ isAdminUser: false }),

      // Products
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: async (product) => {
        try {
          await setDoc(doc(db, 'products', product.id), product);
        } catch (e) { console.error('Failed to add product:', e); }
      },
      updateProduct: async (id, updatedProduct) => {
        try {
          await setDoc(doc(db, 'products', id), updatedProduct, { merge: true });
        } catch (e) { console.error('Failed to update product:', e); }
      },
      deleteProduct: async (id) => {
        try {
          await deleteDoc(doc(db, 'products', id));
        } catch (e) { console.error('Failed to delete product:', e); }
      },

      // Cart
      cart: [],
      addToCart: (product) => set((state) => {
        const existingRow = state.cart.find(c => c.id === product.id);
        if (existingRow) {
          return {
            cart: state.cart.map(c => c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c)
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(c => c.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(c => c.id === id ? { ...c, quantity: Math.max(1, quantity) } : c)
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      // Orders
      orders: [],
      setOrders: (orders) => set({ orders }),
      createOrder: async (orderData) => {
        const id = `ORD-${Math.floor(Math.random() * 10000)}`;
        const newOrder: Order = {
          ...orderData,
          id,
          status: 'Pending',
          date: new Date().toISOString(),
        };
        try {
          await setDoc(doc(db, 'orders', id), newOrder);
          set({ cart: [] });
        } catch (e) { console.error('Failed to create order:', e); }
      },
      updateOrderStatus: async (id, status) => {
        try {
          await setDoc(doc(db, 'orders', id), { status }, { merge: true });
        } catch (e) { console.error('Failed to update order:', e); }
      }
    }),
    {
      name: 'opaline-store-firebase-v1',
      // Only persist cart and admin login status locally, because products and orders come from cloud
      partialize: (state) => ({ cart: state.cart, isAdminUser: state.isAdminUser })
    }
  )
);

