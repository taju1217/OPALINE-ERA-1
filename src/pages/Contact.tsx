import { motion } from 'framer-motion';

export function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-semibold mb-4 block">Get in Touch</span>
        <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">Private <span className="italic text-[#C5A059]">Consultations</span></h1>
      </motion.div>

      <div className="max-w-3xl mx-auto bg-white/[0.02] p-8 md:p-12 border border-white/10 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
        
        <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">First Name</label>
              <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#C5A059] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Last Name</label>
              <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#C5A059] transition-colors" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Email Address</label>
            <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#C5A059] transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Inquiry Type</label>
            <select className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#C5A059] transition-colors appearance-none">
              <option className="bg-[#0A0A0A]">Bespoke Design</option>
              <option className="bg-[#0A0A0A]">Collection Inquiry</option>
              <option className="bg-[#0A0A0A]">Aftercare Servicing</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Message</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C5A059] transition-colors resize-none"></textarea>
          </div>

          <button className="w-full py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold mt-8">
            Request Consultation
          </button>
        </form>
      </div>
    </div>
  );
}
