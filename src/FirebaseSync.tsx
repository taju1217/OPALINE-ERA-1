import { useEffect } from 'react';
import { collection, onSnapshot, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useStore, Product, Order } from './store';

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

export function FirebaseSync() {
  const setProducts = useStore(state => state.setProducts);
  const setOrders = useStore(state => state.setOrders);

  useEffect(() => {
    // Seed initial products if empty
    const checkAndSeed = async () => {
      const snap = await getDocs(collection(db, 'products'));
      if (snap.empty) {
        for (const p of initialProducts) {
          await setDoc(doc(db, 'products', p.id), p);
        }
      }
    };
    checkAndSeed();

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const products: Product[] = [];
      snapshot.forEach(doc => {
        products.push(doc.data() as Product);
      });
      setProducts(products);
    }, (error) => {
      console.error('Firebase sync error products:', error);
    });

    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orders: Order[] = [];
      snapshot.forEach(doc => {
        orders.push(doc.data() as Order);
      });
      // Sort orders by newest first
      orders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(orders);
    }, (error) => {
      console.error('Firebase sync error orders:', error);
    });

    return () => {
      unsubProducts();
      unsubOrders();
    };
  }, [setProducts, setOrders]);

  return null;
}
