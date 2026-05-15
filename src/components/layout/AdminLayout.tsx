import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  const isAdminUser = useStore(state => state.isAdminUser);
  const logoutAdmin = useStore(state => state.logoutAdmin);
  const location = useLocation();

  if (!isAdminUser) {
    return <Navigate to="/opaline-admin-hidden" replace />;
  }

  const navLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin-dashboard/products', icon: Package },
    { name: 'Orders', path: '/admin-dashboard/orders', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen flex bg-[#0A0A0A] font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0A0A0A] hidden md:flex flex-col">
        <div className="p-8">
          <Link to="/" className="text-[12px] font-serif tracking-[0.4em] uppercase text-white font-light">
            OPALINE <span className="italic text-[#C5A059]">Admin</span>
          </Link>
        </div>
        
        <div className="flex flex-col gap-2 p-4 mt-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/admin-dashboard' && location.pathname.startsWith(link.path));
            
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 transition-colors duration-300 text-[10px] uppercase tracking-[0.2em]",
                  isActive 
                    ? "bg-[#C5A059]/10 text-[#C5A059] border-r-2 border-[#C5A059]" 
                    : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <Icon size={16} strokeWidth={1.5} />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto p-4 mb-4">
          <button 
            onClick={logoutAdmin}
            className="flex items-center gap-4 px-4 py-3 w-full text-left text-gray-500 hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-colors duration-300 text-[10px] uppercase tracking-[0.2em]"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
