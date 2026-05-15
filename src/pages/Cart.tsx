import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Trash2, Plus, Minus, ArrowRight, X } from 'lucide-react';

export function Cart() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const getCartTotal = useStore(state => state.getCartTotal);
  const createOrder = useStore(state => state.createOrder);

  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    deliveryLocation: 'Inside Dhaka'
  });

  const getDeliveryCharge = () => {
    return checkoutData.deliveryLocation === 'Inside Dhaka' ? 70 : 130;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutData.customerName && checkoutData.customerPhone) {
      const charge = getDeliveryCharge();
      createOrder({
        customerName: checkoutData.customerName,
        customerPhone: checkoutData.customerPhone,
        customerAddress: checkoutData.customerAddress,
        deliveryLocation: checkoutData.deliveryLocation,
        deliveryCharge: charge,
        items: cart,
        total: getCartTotal() + charge,
      });
      setIsCheckoutOpen(false);
      navigate('/');
      alert('Thank you for your order! Admin has received it.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif mb-6">Your Cart is Empty</h2>
          <p className="text-gray-400 font-light mb-10">Discover our collections and find your perfect piece.</p>
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold"
          >
            Explore Collections
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen relative">
        <h1 className="text-5xl font-serif mb-12 font-light tracking-tight">Shopping <span className="italic text-[#C5A059]">Bag</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 border-b border-white/10 pb-8"
            >
              <Link to={`/product/${item.id}`} className="w-32 h-40 shrink-0 bg-white/[0.02] border border-white/5 p-2 overflow-hidden hidden sm:block">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </Link>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[9px] font-medium mb-1">{item.category}</p>
                    <Link to={`/product/${item.id}`} className="text-xl font-serif font-light italic hover:text-[#C5A059] transition-colors">{item.title}</Link>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <p className="text-gray-400 font-light mb-auto">৳{item.price.toLocaleString()}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-white/20">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/10 p-8 self-start"
        >
          <h3 className="text-xl font-serif font-light italic mb-6 border-b border-white/10 pb-4">Order Summary</h3>
          <div className="space-y-4 mb-8 text-sm font-light text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{getCartTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-serif italic border-t border-white/10 pt-4 mb-8">
            <span>Total</span>
            <span>৳{getCartTotal().toLocaleString()}</span>
          </div>
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold flex justify-center items-center gap-2 group"
          >
            Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isCheckoutOpen && (
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
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
              <h2 className="text-3xl font-serif font-light text-white mb-2 tracking-tight">Complete <span className="italic text-[#C5A059]">Order</span></h2>
              <p className="text-gray-400 text-sm mb-8">Provide your details to securely finalize your purchase.</p>
              
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Full Name</label>
                  <input required value={checkoutData.customerName} onChange={e => setCheckoutData({...checkoutData, customerName: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Phone Number</label>
                  <input required type="tel" value={checkoutData.customerPhone} onChange={e => setCheckoutData({...checkoutData, customerPhone: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Delivery Address</label>
                  <textarea required rows={3} value={checkoutData.customerAddress} onChange={e => setCheckoutData({...checkoutData, customerAddress: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors resize-none"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Delivery Location</label>
                  <select 
                    value={checkoutData.deliveryLocation} 
                    onChange={e => setCheckoutData({...checkoutData, deliveryLocation: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors"
                  >
                    <option value="Inside Dhaka">Inside Dhaka (৳70)</option>
                    <option value="Outside Dhaka">Outside Dhaka (৳130)</option>
                  </select>
                </div>
                
                <button type="submit" className="w-full mt-6 py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold">
                  Place Order • ৳{(getCartTotal() + getDeliveryCharge()).toLocaleString()}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
