import { useStore, Order } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileWarning, Eye, X, Check, XCircle } from 'lucide-react';
import { useState } from 'react';

export function AdminOrders() {
  const orders = useStore(state => state.orders);
  const updateOrderStatus = useStore(state => state.updateOrderStatus);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Phone', 'Total', 'Status', 'Date'];
    const rows = orders.map(o => [
      o.id,
      o.customerName,
      o.customerPhone,
      o.total.toString(),
      o.status,
      new Date(o.date).toLocaleDateString()
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "opaline_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-serif font-light text-white italic tracking-tight mb-2">Orders Management</h1>
          <p className="text-gray-400 text-sm font-light">Manage client orders and update statuses.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-black hover:bg-white transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
        >
          <Download size={16} strokeWidth={1.5} /> Export CSV
        </button>
      </div>

      <div className="bg-white/[0.02] border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-300">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <FileWarning className="mx-auto mb-4 opacity-50" size={32} />
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">৳{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.1em] ${
                      order.status === 'Delivered' ? 'text-emerald-400 bg-emerald-400/10' :
                      order.status === 'Cancelled' ? 'text-red-400 bg-red-400/10' :
                      order.status === 'Shipped' ? 'text-blue-400 bg-blue-400/10' :
                      'text-yellow-400 bg-yellow-400/10'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button onClick={() => setSelectedOrder(order)} className="text-gray-400 hover:text-white transition-colors" title="View details">
                      <Eye size={16} />
                    </button>
                    {order.status !== 'Cancelled' && (
                      <button onClick={() => updateOrderStatus(order.id, 'Cancelled')} className="text-gray-400 hover:text-red-400 transition-colors" title="Cancel order">
                        <XCircle size={16} />
                      </button>
                    )}
                    {order.status === 'Pending' && (
                       <button onClick={() => updateOrderStatus(order.id, 'Shipped')} className="text-gray-400 hover:text-blue-400 transition-colors" title="Mark as shipped">
                        <Check size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
              
              <div className="p-8 border-b border-white/5">
                <h2 className="text-2xl font-serif text-white italic mb-1">Order Details #{selectedOrder.id}</h2>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Customer</p>
                    <p className="text-white">{selectedOrder.customerName}</p>
                    <p className="text-sm text-gray-400">{selectedOrder.customerPhone}</p>
                    <p className="text-sm text-gray-400">{selectedOrder.customerAddress}</p>
                    {selectedOrder.deliveryLocation && (
                      <p className="text-sm text-[#C5A059] mt-1">{selectedOrder.deliveryLocation} (Delivery: ৳{selectedOrder.deliveryCharge})</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-[#C5A059] font-medium">{selectedOrder.status}</p>
                    <p className="text-sm text-gray-400 mt-2">{new Date(selectedOrder.date).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover bg-white/5 border border-white/10" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  )) : (
                     <p className="text-sm text-gray-500">No items found.</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-lg">
                  <span className="text-white font-serif italic">Total</span>
                  <span className="text-[#C5A059] font-medium">৳{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
