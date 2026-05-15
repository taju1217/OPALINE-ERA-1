import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-light font-serif italic tracking-[0.5em] uppercase mb-6 inline-block text-white">
            OPALINE ERA
          </Link>
          <p className="text-gray-400 font-sans font-light leading-relaxed max-w-sm text-sm">
            Discover a world of eternal elegance. We craft pieces that capture moments, turning them into everlasting memories of pristine luxury and timeless beauty.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-sans tracking-[0.2em] font-medium uppercase mb-6 text-[10px]">Explore</h4>
          <ul className="space-y-4 text-gray-400 font-sans font-light text-sm">
            <li><Link to="/collections" className="hover:text-[#C5A059] transition-colors">Latest Collections</Link></li>
            <li><Link to="/contact" className="hover:text-[#C5A059] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-sans tracking-[0.2em] font-medium uppercase mb-6 text-[10px]">Newsletter</h4>
          <p className="text-gray-400 font-sans font-light text-sm mb-4">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex border-b border-gray-600 focus-within:border-[#C5A059] transition-colors">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-none outline-none text-white py-2 w-full font-light text-sm placeholder:text-gray-600"
            />
            <button className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold hover:text-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-12 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-500 font-sans uppercase tracking-[0.2em]">
        <p>&copy; {new Date().getFullYear()} Opaline Era. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-400 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
