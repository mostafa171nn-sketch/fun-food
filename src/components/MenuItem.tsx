'use client';

import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(item);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="text-sm font-semibold text-secondary">{item.rating}</span>
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-secondary mb-1">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">₹{item.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              isAdding
                ? 'bg-success text-white scale-110'
                : 'bg-primary text-white hover:bg-primary-dark hover:scale-105'
            } disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

