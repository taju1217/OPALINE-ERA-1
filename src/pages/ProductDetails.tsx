import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore, Product } from '@/store';
import { ShoppingBag, ArrowLeft, Star } from 'lucide-react';
import { useState } from 'react';

export function ProductDetails() {
  const { id } = useParams();
  const product = useStore(state => state.products.find(p => p.id === id));
  const addToCart = useStore(state => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0); 

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Link to="/collections" className="text-[#C5A059] hover:underline uppercase tracking-widest text-sm">Return to Collections</Link>
        </div>
      </div>
    );
  }

  const allImages = [product.image, ...(product.gallery || [])];
  const currentImage = allImages[selectedImageIdx] || product.image;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <Link to="/collections" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] mb-10">
        <ArrowLeft size={14} /> Back to Collections
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Side */}
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] bg-white/[0.02] border border-white/10 p-6 overflow-hidden group"
          >
            <img 
              src={currentImage} 
              alt={product.title} 
              className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
            />
          </motion.div>
          {allImages.length > 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            >
              {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-24 flex-shrink-0 border transition-all ${
                    selectedImageIdx === idx 
                      ? 'border-[#C5A059] opacity-100' 
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover p-1" />
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Details Side */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-semibold">{product.category}</p>
            {product.isPreOrder && <span className="bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-medium border border-[#C5A059]/30">Pre-order Item</span>}
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-light leading-[1.1] mb-6 italic tracking-tight">{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-8">
            <div className="flex text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-600" : ""} />
              ))}
            </div>
            <span className="text-gray-400 text-sm">{product.rating} Rating</span>
          </div>

          <p className="text-3xl font-light mb-10">৳{product.price.toLocaleString()}</p>
          
          <p className="text-gray-400 font-light leading-relaxed mb-12">
            {product.description}
          </p>

          <button 
            onClick={handleAddToCart}
            className={`w-full py-5 flex justify-center items-center gap-3 transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold ${
              isAdded 
                ? 'bg-[#D4B475] text-black' 
                : 'bg-[#C5A059] text-black hover:bg-[#D4B475]'
            }`}
          >
            <ShoppingBag size={18} />
            {isAdded ? 'Added to Cart' : (product.isPreOrder ? 'Pre-order Now' : 'Add to Cart')}
          </button>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-[10px] tracking-[0.2em] uppercase text-gray-500">
              <div>
                <p className="text-white mb-1">Authenticity</p>
                <p>Certificate Included</p>
              </div>
              <div>
                <p className="text-white mb-1">Delivery</p>
                <p>Complimentary Worldwide</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
