import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase mb-4">
              Opaline
              <span className="text-[#C5A059] block mt-2 text-2xl md:text-3xl italic normal-case tracking-normal">Era</span>
            </h1>
            
            <div className="w-32 h-[1px] bg-white/20 mx-auto mt-8 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#C5A059] w-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
