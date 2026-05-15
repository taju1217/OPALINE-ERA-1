import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-semibold mb-4 block">Our Heritage</span>
        <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">The Art of <span className="italic text-[#C5A059]">Eternity</span></h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="aspect-[3/4] bg-white/[0.02] border border-white/10 p-6 overflow-hidden relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1573408301145-b98c465448b1?auto=format&fit=crop&q=80&w=1000" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-serif mb-6 leading-tight">Mastery in Every Meticulous Detail</h2>
          <div className="space-y-6 text-gray-400 font-light leading-relaxed">
            <p>
              Since our inception, Opaline Era has been synonymous with unparalleled craftsmanship and visionary design. We do not merely create jewelry; we sculpt light, form, and emotion into physical existence.
            </p>
            <p>
              Every stone is hand-selected by our master gemologists, ensuring that only those with the most mesmerizing fire and clarity are granted a place in an Opaline creation. 
            </p>
            <p className="border-l-2 border-[#C5A059] pl-6 py-2 italic font-serif text-white/80">
              "True luxury is quiet, confident, and eternal. It does not shout; it mesmerizes."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
