'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Truck, Sparkles } from 'lucide-react';
import { menuItems } from '@/data/menuData';
import MenuItem from '@/components/MenuItem';

export default function Home() {
  const featuredItems = menuItems.slice(0, 6);

  const features = [
    { icon: Clock, title: 'Fast Delivery', description: 'Hot food delivered in minutes' },
    { icon: Sparkles, title: 'Fresh Ingredients', description: 'Made with quality ingredients' },
    { icon: Truck, title: 'Free Delivery', description: 'On orders above ₹200' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary-dark">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            <span className="text-primary">Fast</span> •{' '}
            <span className="text-accent">Fresh</span> •{' '}
            <span className="text-primary">Fun</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Delicious meals delivered hot & fresh to your doorstep
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              Order Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/menu#menu"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              View Menu
            </Link>
          </div>

          {/* Floating Food Images */}
          <div className="absolute top-1/4 left-10 md:left-20 w-24 h-24 md:w-32 md:h-32 animate-float hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
              alt="Burger"
              fill
              className="rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
          <div className="absolute top-1/3 right-10 md:right-20 w-20 h-20 md:w-28 md:h-28 animate-float hidden md:block" style={{ animationDelay: '0.5s' }}>
            <Image
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop"
              alt="Pizza"
              fill
              className="rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
          <div className="absolute bottom-1/4 left-1/4 w-20 h-20 md:w-28 md:h-28 animate-float hidden md:block" style={{ animationDelay: '1s' }}>
            <Image
              src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop"
              alt="Maggi"
              fill
              className="rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Popular Dishes
            </h2>
            <p className="text-gray-500 text-lg">Discover our most loved items</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <MenuItem key={item._id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hungry? Order Now!
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Get your favorite food delivered in minutes
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            <Star className="w-5 h-5" />
            Start Ordering
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">The Fun Food</h3>
              <p className="text-white/70">Fast • Fresh • Fun</p>
              <p className="text-white/70 mt-4">Delicious food delivered to your doorstep</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/menu" className="text-white/70 hover:text-primary transition-colors">Menu</Link></li>
                <li><Link href="/cart" className="text-white/70 hover:text-primary transition-colors">Cart</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <p className="text-white/70">📍 123 Food Street, City</p>
              <p className="text-white/70">📞 +91 1234567890</p>
              <p className="text-white/70">✉️ hello@thefunfood.com</p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
            <p>© 2024 The Fun Food. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

