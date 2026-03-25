'use client';

import { Check, ChefHat, Package, Truck, Home } from 'lucide-react';
import { OrderStatus } from '@/types';

interface OrderProgressProps {
  status: OrderStatus;
}

const steps = [
  { key: 'received', label: 'Order Received', icon: Check },
  { key: 'preparing', label: 'Preparing', icon: ChefHat },
  { key: 'ready', label: 'Ready', icon: Package },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export default function OrderProgress({ status }: OrderProgressProps) {
  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-400'
                } ${isActive ? 'scale-110 animate-pulse-glow' : ''}`}
              >
                <Icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center ${
                  isCompleted ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

