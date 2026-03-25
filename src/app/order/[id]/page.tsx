'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Clock } from 'lucide-react';
import OrderProgress from '@/components/OrderProgress';
import { Order, OrderStatus } from '@/types';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.orderId === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
      
      // Simulate order status updates
      const simulateStatusUpdate = () => {
        const statusFlow: OrderStatus[] = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
        const currentIndex = statusFlow.indexOf(foundOrder.status);
        
        if (currentIndex < statusFlow.length - 1) {
          setTimeout(() => {
            const nextStatus = statusFlow[currentIndex + 1];
            const updatedOrder = {
              ...foundOrder,
              status: nextStatus,
              statusHistory: [
                ...foundOrder.statusHistory,
                { status: nextStatus, timestamp: new Date().toISOString() }
              ],
              updatedAt: new Date().toISOString()
            };
            
            // Update in localStorage
            const updatedOrders = orders.map((o: Order) => 
              o.orderId === orderId ? updatedOrder : o
            );
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            setOrder(updatedOrder);
          }, 10000); // Update every 10 seconds for demo
        }
      };
      
      simulateStatusUpdate();
    }
    
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <h1 className="text-3xl font-bold text-secondary mb-4">Order Not Found</h1>
          <p className="text-gray-500 mb-8">We couldn&apos;t find this order</p>
          <Link href="/" className="text-primary hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-gray-500 text-sm">Order ID</p>
              <h1 className="text-2xl font-bold text-secondary">{order.orderId}</h1>
            </div>
            <div className="px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold capitalize">
                {order.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-secondary mb-6">Track Your Order</h2>
          <OrderProgress status={order.status} />
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-secondary mb-4">Order Details</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">₹{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">₹{order.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-secondary mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary">👤</span>
                </div>
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-gray-500 text-sm">{order.customerPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-gray-500 text-sm">{order.deliveryAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Order Time</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-gray-500 text-sm capitalize">
                    {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'UPI'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

