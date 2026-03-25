'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, ShoppingCart, TrendingUp, LogOut, Check, ChefHat, PackageCheck, Truck, Home } from 'lucide-react';
import { Order, OrderStatus } from '@/types';

const statusIcons: Record<OrderStatus, typeof Check> = {
  received: ShoppingCart,
  preparing: ChefHat,
  ready: PackageCheck,
  out_for_delivery: Truck,
  delivered: Home,
};

const statusColors: Record<OrderStatus, string> = {
  received: 'bg-blue-500',
  preparing: 'bg-yellow-500',
  ready: 'bg-purple-500',
  out_for_delivery: 'bg-orange-500',
  delivered: 'bg-green-500',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Check auth
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
      // Refresh orders every 10 seconds
      const interval = setInterval(loadOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper auth)
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    router.push('/');
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: newStatus,
          statusHistory: [
            ...order.statusHistory,
            { status: newStatus, timestamp: new Date().toISOString() }
          ],
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    });
    
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const flow: OrderStatus[] = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    const currentIndex = flow.indexOf(currentStatus);
    if (currentIndex < flow.length - 1) {
      return flow[currentIndex + 1];
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-4">Default password: admin123</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt).toDateString();
    return orderDate === new Date().toDateString();
  });
  
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.grandTotal, 0);
  const pendingOrders = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-secondary">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Today&apos;s Revenue</p>
                <p className="text-2xl font-bold text-secondary">₹{todayRevenue}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <p className="text-2xl font-bold text-secondary">{pendingOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Today&apos;s Orders</p>
                <p className="text-2xl font-bold text-secondary">{todayOrders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-secondary mb-6">All Orders</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                const nextStatus = getNextStatus(order.status);
                
                return (
                  <div
                    key={order.orderId}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${statusColors[order.status]} rounded-full flex items-center justify-center`}>
                          <StatusIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-secondary">{order.orderId}</p>
                          <p className="text-gray-500 text-sm">{order.customerName} • {order.customerPhone}</p>
                          <p className="text-gray-500 text-sm">{order.items.length} items • ₹{order.grandTotal}</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${statusColors[order.status]}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                        {nextStatus && (
                          <button
                            onClick={() => updateOrderStatus(order.orderId, nextStatus)}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                          >
                            Mark as {nextStatus.replace('_', ' ')}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600"
                          >
                            {item.quantity}x {item.menuItem.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

