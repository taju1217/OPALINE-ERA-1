import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  gallery?: string[];
  description: string;
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
}

interface AppState {
  // Auth
  isAdminUser: boolean;
  loginAdmin: (password: string, username: string) => boolean;
  logoutAdmin: () => void;

  // Products
  products: Product[];
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
  createOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const initialProducts: Product[] = [
  {
    id: "p1",
    title: "The Eternal Grace Ring",
    price: 4500,
    category: "Rings",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605100804763-247f6615b364?auto=format&fit=crop&q=80&w=800",
    description: "A timeless diamond ring crafted with 18k white gold, featuring a brilliant-cut center stone.",
  },
  {
    id: "p2",
    title: "Opaline Signature Bracelet",
    price: 2800,
    category: "Bracelets",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    description: "Elegant matte gold bracelet with subtle diamond accents, perfect for luxury evening wear.",
  },
  {
    id: "p3",
    title: "Midnight Star Necklace",
    price: 6200,
    category: "Necklaces",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1599643478514-4a520239b940?auto=format&fit=crop&q=80&w=800",
    description: "A stunning pendant necklace representing the night sky, featuring a sapphire center and diamond halo.",
  },
  {
    id: "p4",
    title: "Aura Drop Earrings",
    price: 1950,
    category: "Earrings",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1535632066927-ab7e8f54b664?auto=format&fit=crop&q=80&w=800",
    description: "Delicate silver drop earrings carrying a subtle glow, highlighting perfect symmetry and grace.",
  },
  {
    id: "p5",
    title: "Chronos Tourbillon Watch",
    price: 12500,
    category: "Watches",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
    description: "Masterpiece of horology, featuring a sapphire crystal face and an exposed tourbillon mechanism.",
  },
  {
    id: "p6",
    title: "Lumina Diamond Band",
    price: 3200,
    category: "Rings",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=800",
    description: "A continuous band of brilliant diamonds set in pure platinum.",
  }
];

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

  products: initialProducts,
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
  })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),

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

  orders: [
    {
      id: "ORD-1001",
      customerName: "Jane Doe",
      customerPhone: "01700000000",
      customerAddress: "123 Elegance Blvd, NY",
      total: 7300,
      items: [],
      status: "Pending",
      date: new Date().toISOString()
    }
  ],
  createOrder: (orderData) => set((state) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      status: 'Pending',
      date: new Date().toISOString(),
    };
    return { orders: [newOrder, ...state.orders], cart: [] };
  }),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  }))
}), {
  name: 'opaline-store'
}));
