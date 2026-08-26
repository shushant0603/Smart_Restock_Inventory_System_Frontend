# SmartStock - Inventory Suite Frontend

SmartStock is a modern, AI-assisted Inventory Management Dashboard designed for small to medium businesses. It provides real-time stock tracking, smart reorder suggestions, and powerful transaction analytics.

## 🚀 Features

- **📊 Dynamic Dashboard**: Real-time overview of inventory health, recent activities, and sales trends.
- **📦 Inventory Management**: Full CRUD capabilities for products. Track stock levels, categories, pricing, and assigned suppliers.
- **💡 Smart Reorder Suggestions**: AI-driven reorder recommendations based on average daily usage and minimum stock thresholds to prevent stock-outs proactively.
- **🚨 Low Stock Alerts**: Automatic alert system when products fall below their defined safety thresholds.
- **📈 Sales & Usage Trends**: Interactive charts (powered by Recharts) visualizing dispatch/sales data across weekly, monthly, and yearly timeframes.
- **🔄 Transaction Tracking**: Comprehensive logging of receipts, dispatches, adjustments, and consumptions.
- **📱 Responsive Design**: Fully responsive layout with an off-canvas mobile sidebar menu.
- **✨ Fluid Animations**: Premium UI feel with GSAP-powered hover effects, page transitions, and element reveals.


## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Animations**: GSAP (GreenSock)
- **Charts**: Recharts

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── api/          # Axios configuration and API calls
├── components/   # Reusable UI components and layout (Sidebar, Header)
├── pages/        # Main application views (Dashboard, Inventory, Alerts, etc.)
├── routes/       # React Router configurations and protected routes
├── store/        # Zustand state stores (authStore, dashboardStore)
└── assets/       # Static assets and global CSS
```

## 🎨 Design Philosophy
The UI focuses on a clean, premium aesthetic with subtle micro-interactions. It utilizes a soft color palette with distinct accent colors for statuses (Emerald for healthy, Amber for warnings, Red for critical) to ensure data is scannable at a glance.

## 🤝 Team Members & Contributions
This project was developed by our amazing team. You can find our GitHub profiles below:

- [Shushant Kumar](https://github.com/shushant0603)
- [Chinmoy Roy](https://github.com/Chinmoy-Roy9547)
- [Goutam Dogra](https://github.com/goutamdogri)
- [Soham bhattacharjee](https://github.com/Soh-am)
- [Priya Gupta](https://github.com/priyagupta35)