import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useStore(state => state.cart);
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5",
      isScrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md py-6" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="text-white hover:text-[#C5A059] transition">
            <Menu size={24} />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl tracking-[0.5em] font-light italic font-serif text-center flex-1 md:flex-none uppercase text-white hover:text-white/90 transition-colors">
          OPALINE ERA
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-300 relative group",
                location.pathname === link.path ? "text-[#C5A059] opacity-100" : "text-white opacity-70 hover:opacity-100 hover:text-[#C5A059]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8">
          <Link to="/opaline-admin-hidden" className="hidden md:block text-white opacity-70 hover:opacity-100 hover:text-[#C5A059] transition">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="relative text-white opacity-70 hover:opacity-100 hover:text-[#C5A059] transition group">
            <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[9px] w-4 h-4 flex items-center justify-center rounded-full text-black font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 glass-dark flex flex-col pt-24 px-8"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#C5A059] transition"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-serif">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] transition">Home</Link>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C5A059] transition"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/opaline-admin-hidden" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] transition text-sm flex items-center gap-2 mt-auto pb-10">
                <User size={16} /> Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
