import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

export function RootLayout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#C5A059] z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main className="flex-1 w-full bg-[#0A0A0A]">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
