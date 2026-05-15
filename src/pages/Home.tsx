import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Luxury3DElement } from '@/components/ui/Luxury3DElement';

export function Home() {
  const products = useStore(state => state.products).slice(0, 3); // Featured products

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image/Video with parallax effect */}
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599643478514-4a520239b940?auto=format&fit=crop&q=80&w=2000")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/20 to-[#0a0a0a] z-0" />
        
        {/* Background Ambient Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C5A059] opacity-10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#8E9299] opacity-5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <Luxury3DElement />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 text-[#C5A059] font-semibold mb-6"
          >
            <span className="w-8 h-[1px] bg-[#C5A059]"></span>
            <span className="text-[10px] uppercase tracking-[0.4em]">The 2024 Capsule</span>
            <span className="w-8 h-[1px] bg-[#C5A059]"></span>
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-[5rem] font-serif font-light leading-[1.1] tracking-tight text-white mb-8 drop-shadow-2xl"
          >
            Ethereal <br />
            <span className="italic pl-8">Luminescence</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link 
              to="/collections" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold group"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-[#C5A059]"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">Timeless <span className="text-[#C5A059] italic">Pieces</span></h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto">Discover our most sought-after creations, where meticulous craftsmanship meets breathtaking design.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5] bg-white/[0.02] border border-white/10 p-4">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-100 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[8px] font-medium mb-2 opacity-80">{product.category}</p>
                    <h3 className="text-xl font-serif text-white mb-1 font-light italic">{product.title}</h3>
                    <p className="text-white/60 font-sans text-sm mb-4">৳{product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 hover:text-[#C5A059] transition-all">View Details</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
           <Link to="/collections" className="text-[10px] uppercase tracking-[0.2em] opacity-70 border-b border-white/30 pb-1 hover:border-[#C5A059] hover:text-white transition-all flex items-center gap-2">
             View All Collections
           </Link>
        </div>
      </section>
    </div>
  );
}
