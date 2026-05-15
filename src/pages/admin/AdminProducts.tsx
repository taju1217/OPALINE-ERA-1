import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Product } from '@/store';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';

export function AdminProducts() {
  const products = useStore(state => state.products);
  const deleteProduct = useStore(state => state.deleteProduct);
  const addProduct = useStore(state => state.addProduct);
  const updateProduct = useStore(state => state.updateProduct);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '',
    rating: '5',
    image: '',
    gallery: '',
    description: '',
    isPreOrder: false
  });

  const openAdd = () => {
    setEditingId(null);
    setNewProduct({ title: '', price: '', category: '', rating: '5', image: '', gallery: '', description: '', isPreOrder: false });
    setIsAdding(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProduct({
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      rating: product.rating.toString(),
      image: product.image,
      gallery: product.gallery?.join('\n') || '',
      description: product.description,
      isPreOrder: !!product.isPreOrder
    });
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.title && newProduct.price) {
      const galleryArray = newProduct.gallery.split('\n').map(s => s.trim()).filter(Boolean);
      if (editingId) {
        updateProduct(editingId, {
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          category: newProduct.category || 'Jewelry',
          rating: parseFloat(newProduct.rating),
          image: newProduct.image || 'https://images.unsplash.com/photo-1599643478514-4a520239b940?auto=format&fit=crop&q=80&w=800',
          gallery: galleryArray,
          description: newProduct.description,
          isPreOrder: newProduct.isPreOrder
        });
      } else {
        addProduct({
          id: 'p' + Math.random().toString(36).substr(2, 9),
          title: newProduct.title,
          price: parseFloat(newProduct.price),
          category: newProduct.category || 'Jewelry',
          rating: parseFloat(newProduct.rating),
          image: newProduct.image || 'https://images.unsplash.com/photo-1599643478514-4a520239b940?auto=format&fit=crop&q=80&w=800',
          gallery: galleryArray,
          description: newProduct.description,
          isPreOrder: newProduct.isPreOrder
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setNewProduct({ title: '', price: '', category: '', rating: '5', image: '', gallery: '', description: '', isPreOrder: false });
    }
  };

  return (
    <div className="p-8 pb-24 relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif font-light tracking-tight text-white mb-2">Product <span className="italic text-[#C5A059]">Management</span></h1>
          <p className="text-gray-400 font-medium text-[10px] uppercase tracking-[0.2em]">Manage the Opaline Era catalog</p>
        </div>
        <button 
          onClick={openAdd}
          className="bg-[#C5A059] text-black px-6 py-3 hover:bg-[#D4B475] transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold flex items-center gap-2"
        >
          <Plus size={16} strokeWidth={1.5} /> Add Product
        </button>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-[11px] uppercase tracking-[0.1em]">
            <thead className="bg-[#111] text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Image</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Title</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Category</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Price</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={product.image} className="w-12 h-12 object-cover bg-black border border-white/10" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {product.title}
                    {product.isPreOrder && <span className="ml-2 bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded text-[8px] uppercase">Pre-order</span>}
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">৳{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <Link to={`/product/${product.id}`} className="hover:text-white transition-colors"><Eye size={16} /></Link>
                      <button onClick={() => openEdit(product)} className="hover:text-[#C5A059] transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => deleteProduct(product.id)} className="hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
              <h2 className="text-3xl font-serif font-light text-white mb-8 tracking-tight">{editingId ? 'Edit' : 'Add New'} <span className="italic text-[#C5A059]">Product</span></h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Title</label>
                  <input required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Price</label>
                    <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Category</label>
                    <input required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Image URL (Main)</label>
                  <input value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} placeholder="https://..." className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Additional Gallery URLs (One per line)</label>
                  <textarea rows={3} value={newProduct.gallery} onChange={e => setNewProduct({...newProduct, gallery: e.target.value})} placeholder="https://...&#10;https://..." className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors resize-none"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Description</label>
                  <textarea rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors resize-none"></textarea>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <input type="checkbox" id="isPreOrder" checked={newProduct.isPreOrder} onChange={e => setNewProduct({...newProduct, isPreOrder: e.target.checked})} className="w-4 h-4 accent-[#C5A059] cursor-pointer" />
                  <label htmlFor="isPreOrder" className="text-[10px] uppercase tracking-[0.2em] text-white font-medium cursor-pointer">Available for Pre-Order</label>
                </div>
                <button type="submit" className="w-full mt-6 py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold">
                  Save Product
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
