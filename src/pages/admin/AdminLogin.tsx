import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { motion } from 'framer-motion';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const loginAdmin = useStore(state => state.loginAdmin);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password, username);
    if (success) {
      navigate('/admin-dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1605100804763-247f6615b364?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0a0a0a]/90 backdrop-blur-md p-10 max-w-md w-full border border-white/10 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-2xl font-serif font-light tracking-[0.5em] text-white mb-2 uppercase italic">OPALINE</h1>
          <p className="text-gray-400 font-medium text-[9px] uppercase tracking-[0.3em]">Secure Portal Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded">Invalid credentials.</p>}
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#C5A059] transition-colors" 
            />
          </div>

          <button type="submit" className="w-full py-4 bg-[#C5A059] hover:bg-[#D4B475] text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold mt-4">
            Authenticate
          </button>
        </form>
      </motion.div>
    </div>
  );
}
