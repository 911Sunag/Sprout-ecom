# 🌱 Sprout - Organic Grocery & Eco-Friendly E-Commerce Platform

> A modern, full-stack e-commerce application with React frontend, Node.js backend, MongoDB database, and advanced features like authentication, cart management, and order processing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend Technologies](#frontend-technologies)
  - [Backend Technologies](#backend-technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [How to Run](#how-to-run)
  - [Running Frontend Only](#running-frontend-only)
  - [Running Backend Only](#running-backend-only)
  - [Running Both Frontend & Backend](#running-both-frontend--backend)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Latest Updates](#latest-updates)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Overview

**Sprout** is a comprehensive e-commerce platform designed for organic groceries and eco-friendly products. Built with modern technologies, it provides a seamless shopping experience with product browsing, advanced cart management, secure authentication, and order processing. The application features a responsive design, optimized performance, and a robust backend API.

## ✨ Features

- 🔐 **User Authentication** – Secure login & registration with JWT
- 🔍 **Product Search & Filter** – Find products easily
- 🛒 **Shopping Cart** – Add/remove items with real-time updates
- 📦 **Order Management** – View cart, checkout, and confirm orders
- ✅ **Order Confirmation** – Detailed order summary and notifications
- 📱 **Fully Responsive Design** – Works seamlessly on all devices
- ⚡ **Fast & Optimized UI** – Built with Vite for instant HMR
- 🎨 **Modern UI Components** – Using Radix UI and Tailwind CSS
- 🔔 **Real-time Notifications** – Cart and order updates

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | Component-based UI framework |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Vite** | 7.3.1 | Next-generation build tool |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **Redux Toolkit** | 2.11.2 | Global state management |
| **React Redux** | 9.2.0 | React bindings for Redux |
| **React Router DOM** | 6.30.3 | Client-side routing |
| **React Hook Form** | 7.71.1 | Efficient form handling & validation |
| **Radix UI** | 1.4.3 | Unstyled, accessible components |
| **Lucide React** | 0.563.0 | Icon library |
| **clsx** | 2.1.1 | Conditional classNames utility |
| **tailwind-merge** | 3.4.0 | Merge Tailwind CSS classes |
| **ESLint** | 9.39.1 | Code quality & linting |

### Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | 4.22.2 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 7.8.9 | MongoDB object modeling |
| **JWT (jsonwebtoken)** | 9.0.0 | Authentication tokens |
| **bcryptjs** | 2.4.3 | Password hashing |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |
| **dotenv** | 16.6.1 | Environment variables |
| **Validator** | 13.11.0 | Data validation |
| **Nodemon** | 3.1.14 | Development auto-reload |

## 📁 Project Structure

```
e-commerce/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── BottomNotification.tsx
│   │   ├── Cart.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Promotions.tsx
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── input-group.tsx
│   │   │   └── textarea.tsx
│   │   └── ...
│   ├── pages/                  # Page components
│   │   ├── Auth.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── store/                  # Redux store & slices
│   │   ├── authSlice.ts
│   │   ├── cartSlice.ts
│   │   ├── productsSlice.ts
│   │   └── store.ts
│   ├── data/                   # Static data
│   │   └── Products.json
│   ├── assets/                 # Images & static files
│   ├── lib/                    # Utilities
│   │   └── utils.ts
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── backend/                     # Backend source code
│   ├── controllers/            # Request handlers
│   │   └── authController.js
│   ├── routes/                 # API routes
│   │   └── auth.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── models/                 # Database models
│   │   └── User.js
│   ├── config/                 # Configuration files
│   │   └── db.js
│   ├── server.js               # Express server setup
│   └── package.json
├── public/                      # Static public files
├── package.json                 # Frontend dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── components.json             # UI component config
├── SETUP_GUIDE.md              # Setup instructions
└── README.md                   # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v16 or higher) – [Download here](https://nodejs.org/)
- ✅ **npm** or **yarn** – Comes with Node.js
- ✅ **MongoDB** – Either:
  - Local installation – [Download here](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas** (Cloud) – [Sign up here](https://www.mongodb.com/cloud/atlas)
  - **Docker** – [Docker Desktop](https://www.docker.com/products/docker-desktop)
- ✅ **Git** – [Download here](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/911Sunag/Sprout-ecom.git
cd Sprout-ecom
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd backend
```

Create `.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sprout_ecommerce
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## How to Run

### Running Frontend Only

```bash
npm run dev
```

- Frontend will be available at: **http://localhost:5173**

### Running Backend Only

```bash
cd backend
npm run dev
```

- Backend API will be available at: **http://localhost:5000**

### Running Both Frontend & Backend

**Option 1: Using Multiple Terminals (Recommended)**

**Terminal 1 - Start MongoDB:**

```bash
# If using local MongoDB
mongod

# OR if using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Terminal 2 - Start Backend:**

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: localhost
```

**Terminal 3 - Start Frontend:**

```bash
npm run dev
```

Expected output:
```
VITE v7.3.1  ready in 234 ms
➜  Local:   http://localhost:5173/
```

**Option 2: Using Concurrently (Single Terminal)**

Install concurrently:

```bash
npm install --save-dev concurrently
```

Add to root `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "vite",
    "dev:backend": "cd backend && npm run dev"
  }
}
```

Then run:

```bash
npm run dev
```

### Build for Production

**Frontend:**

```bash
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
npm start
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (requires auth) |

*More API endpoints coming soon...*

## Screenshots

### Desktop Views

![](./screenshots/Screenshot%202026-05-24%20232316.png)
![](./screenshots/Screenshot%202026-05-24%20232325.png)
![](./Screenshots/Homepage.png)
![](./Screenshots/EmptyCart.png)
![](./Screenshots/ShoppingCart.png)
![](./Screenshots/CheckOut.png)
![](./Screenshots/OrderConfiramation.png)

### Mobile Views

![](./Screenshots/MobileS1.png)
![](./Screenshots/MobileCart.png)
![](./Screenshots/MobileCheckOut.png)
![](./Screenshots/Mobileconfiration.png)

## 📊 Latest Updates

### v1.2.0 (May 2026)

✅ **Completed:**
- Backend API setup with Express.js
- MongoDB integration with Mongoose models
- User authentication (JWT-based)
- User registration & login functionality
- Authentication middleware
- CORS configuration
- Redux state management improvements
- Enhanced UI components with Radix UI
- Mobile-responsive design refinements
- Bottom notification system
- Advanced cart management
- Order details display
- Error handling & validation

### Previous Versions

- **v1.1.0** – Product search, cart functionality, order confirmation
- **v1.0.0** – Initial release with core e-commerce features

## 🚀 Future Enhancements

### Phase 2

- 🛍️ **Extended Product Catalog** – Add more products and categories
- 🎯 **Advanced Filtering** – Filter by price, ratings, availability
- 🗂️ **Category Management** – Browse products by categories
- 👤 **User Profile Dashboard** – Manage user information and preferences
- 📦 **Order History** – View past orders and tracking

### Phase 3

- 💳 **Payment Gateway Integration** – Stripe/Razorpay payment processing
- 📍 **Shipping Management** – Calculate shipping costs and delivery tracking
- ⭐ **Product Reviews & Ratings** – User reviews and ratings system
- 🔔 **Email Notifications** – Order confirmation, shipping updates
- 🎁 **Wishlist Feature** – Save favorite products
- 💰 **Discount & Coupon System** – Apply promo codes

### Phase 4

- 🔍 **Advanced Search** – Full-text search and autocomplete
- 📊 **Admin Dashboard** – Manage products, orders, and users
- 📈 **Analytics** – Sales reports and user insights
- 🌍 **Multi-language Support** – i18n implementation
- 🎨 **Dark Mode** – Theme switching

## 🤝 Contributing

Contributions, suggestions, and feedback are always welcome!
Feel free to fork the repository and submit a pull request.

## Author

- @Sunag Arigala
