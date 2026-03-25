# 🍔 The Fun Food - Food Ordering Website

A modern, responsive food ordering website built with Next.js 14 and Tailwind CSS. Features include menu browsing, cart management, checkout, order tracking, and an admin dashboard.

![The Fun Food](https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop)

## ✨ Features

### Customer Features
- 🏠 **Home Page** - Beautiful hero section with animated food images
- 📋 **Menu Page** - Categorized menu with search and filter
- 🛒 **Cart System** - Real-time cart with quantity management
- 💳 **Checkout** - Multiple payment options (Cash on Delivery, UPI)
- 📍 **Order Tracking** - Live order status with animated progress
- 📞 **Contact Page** - Get in touch with restaurant

### Admin Features
- 🔐 **Secure Login** - Protected admin dashboard
- 📊 **Dashboard** - View sales and statistics
- ✅ **Order Management** - Update order status
- 🔔 **Real-time Updates** - Auto-refresh for new orders

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Database**: LocalStorage (Demo) / MongoDB (Production ready)

## 📁 Project Structure

```
the-fun-food/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── menu/
│   │   │   └── page.tsx        # Menu page
│   │   ├── cart/
│   │   │   └── page.tsx        # Cart page
│   │   ├── checkout/
│   │   │   └── page.tsx        # Checkout page
│   │   ├── order/[id]/
│   │   │   └── page.tsx       # Order tracking
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact page
│   │   └── admin/
│   │       └── page.tsx       # Admin dashboard
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── MenuItem.tsx
│   │   ├── Toast.tsx
│   │   └── OrderProgress.tsx
│   ├── store/
│   │   └── cartStore.ts       # Zustand store
│   ├── data/
│   │   └── menuData.ts        # Menu items data
│   └── types/
│       └── index.ts           # TypeScript types
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Local Development

1. **Clone and Navigate**
   ```bash
   cd the-fun-food
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Visit: http://localhost:3000

### Environment Variables

Create a `.env.local` file in the root:

```env
# For local development, no variables needed (uses localStorage)
# For production with MongoDB:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section |
| `/menu` | Browse all menu items |
| `/cart` | View and manage cart |
| `/checkout` | Complete your order |
| `/order/:id` | Track order status |
| `/contact` | Contact the restaurant |
| `/admin` | Admin dashboard |

## 🔑 Default Credentials

- **Admin Password**: `admin123`
- **URL**: http://localhost:3000/admin

## 🧪 Testing Payment

### Cash on Delivery
1. Add items to cart
2. Go to checkout
3. Select "Cash on Delivery"
4. Place order

### UPI Payment
1. Add items to cart
2. Go to checkout
3. Select "UPI Payment"
4. Enter any UPI ID (demo)
5. Place order

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository
4. Deploy with default settings

### Railway

1. Install Railway CLI
2. Initialize project: `railway init`
3. Add MongoDB database
4. Deploy: `railway up`

### Render

1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `npm run build`
4. Set start command: `npm start`

## 🎨 Customization

### Colors
Edit in `src/app/globals.css`:
```css
@theme {
  --color-primary: #FF6B35;
  --color-secondary: #2D3436;
  --color-accent: #FDCB6E;
}
```

### Menu Items
Edit `src/data/menuData.ts` to add/remove items.

## 📄 API Endpoints (Production)

When connected to MongoDB:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu?category=Pizza` | Filter by category |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders (Admin) |
| PATCH | `/api/orders/:id` | Update order status |
| POST | `/api/admin/login` | Admin authentication |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit a pull request

## 📝 License

This project is for educational purposes.

## 👨‍💻 Built With

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Lucide React](https://lucide.dev)

---

Made with ❤️ by The Fun Food Team

