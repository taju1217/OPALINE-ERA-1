import { motion } from 'framer-motion';
import { useStore } from '@/store';
import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';

export function AdminDashboard() {
  const products = useStore(state => state.products);
  
  const stats = [
    { title: "Total Products", value: products.length, icon: Package, change: "+12%" },
    { title: "Revenue (YTD)", value: "৳4.2M", icon: DollarSign, change: "+8.4%" },
    { title: "Active Orders", value: "34", icon: TrendingUp, change: "+2%" },
    { title: "VIP Clients", value: "892", icon: Users, change: "+5%" },
  ];

  return (
    <div className="p-8 pb-24">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-light tracking-tight text-white mb-2">Dashboard <span className="italic text-[#C5A059]">Overview</span></h1>
        <p className="text-gray-400 font-medium text-[10px] uppercase tracking-[0.2em]">Welcome back to the Opaline Era control panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] backdrop-blur-md p-6 border border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#C5A059]/10 text-[#C5A059]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-emerald-400 text-[10px] uppercase tracking-[0.1em] font-medium">{stat.change}</span>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-2">{stat.title}</p>
              <p className="text-3xl font-serif font-light text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-serif font-light tracking-tight text-white">Recent <span className="italic text-[#C5A059]">Transactions</span></h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-[11px] uppercase tracking-[0.1em]">
            <thead className="bg-[#111] text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Order ID</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Client</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Product</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Amount</th>
                <th className="px-6 py-4 font-semibold text-[#C5A059] tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {[1,2,3,4,5].map((i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">#OP-{8000 + i}</td>
                  <td className="px-6 py-4">Eleanor V.</td>
                  <td className="px-6 py-4">The Eternal Grace Ring</td>
                  <td className="px-6 py-4">৳4,500</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-[9px] tracking-[0.2em] uppercase box-border">Processing</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
