import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { ShoppingBag } from 'lucide-react';

export function Products() {
  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-6">Our <span className="text-[#C5A059] italic">Collections</span></h1>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`uppercase tracking-[0.3em] text-[10px] font-medium transition-all duration-300 pb-1 border-b ${
                filter === cat ? 'text-[#C5A059] border-[#C5A059]' : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-white/[0.02] border border-white/10 p-4">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="w-full bg-[#C5A059] hover:bg-[#D4B475] text-black py-4 flex justify-center items-center gap-2 transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-medium mb-2">{product.category}</p>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-serif font-light italic mb-1 hover:text-[#C5A059] transition-colors">{product.title}</h3>
              </Link>
              <p className="text-gray-400 font-light text-sm">৳{product.price.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
