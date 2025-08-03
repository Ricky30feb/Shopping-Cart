# 🛒 Shopping Cart – Full Stack E-Commerce Application

This project is a full-stack assignment for an e-commerce shopping cart application. It implements a secure, single-session login system and a cart-order flow using a Go (Gin) backend and a React frontend, following the specifications provided.

## 🔗 Live Demo

- **Frontend (React)**: [https://Ricky30feb.github.io/Shopping-Cart](https://Ricky30feb.github.io/Shopping-Cart)  
- **Backend (Render Free Tier)**: [https://shopping-cart-backend-gfe4.onrender.com](https://shopping-cart-backend-gfe4.onrender.com)  
  > Note: Free tier cold start delays (30–50s) may apply. For optimal performance, run backend locally.

## ✅ Features Implemented

- **User Registration & Authentication**
  - Signup (`POST /users`)
  - Login with JWT (`POST /users/login`)
  - Enforced single-device login (one active session per user)
- **Shopping Cart Flow**
  - Add items to cart (`POST /carts`)
  - View cart items (`GET /carts`)
  - Checkout / convert cart to order (`POST /orders`)
  - View past orders (`GET /orders`)
- **Secure Architecture**
  - Passwords hashed with bcrypt
  - JWT tokens for session management
  - CORS protection, token validation middleware
- **Smart Auto-Seeding**
  - Preloads 24 products and a test user on backend start
  - Avoids duplication on restarts
- **Clean React Frontend**
  - Authenticated item browsing
  - Toasts/alerts for cart, orders, and errors
  - Fully responsive with smooth UX

## 💻 Tech Stack

### Backend
- **Go (Gin)** – API framework
- **GORM** – ORM with SQLite
- **JWT** – Stateless token-based authentication
- **bcrypt** – Password hashing
- **CORS Middleware** – Cross-origin protection

### Frontend
- **React (with Hooks)**
- **Axios** – API requests
- **React Icons**
- **CSS Grid & Flexbox** – Layout & styling

## 🚀 Quick Start (Recommended: Frontend + Local Backend)

### 1. Clone the Repository
```bash
git clone https://github.com/Ricky30feb/Shopping-Cart.git
```

### 2. Setup the Backend
```bash
cd Shopping-Cart/backend
go mod download
echo 'JWT_SECRET=your_very_secure_random_secret_min_32_characters' > .env
go run main.go
```

🎯 Backend API will start on `http://localhost:8080`

🧪 Auto-seeds:
- `testuser` / `testpass123`
- 24 sample items

### 3. Use the Frontend (Already Deployed)
Visit: [https://Ricky30feb.github.io/Shopping-Cart](https://Ricky30feb.github.io/Shopping-Cart)  
It will automatically connect to your local backend.

## 🛠️ Development Setup (Full Local)

```bash
# Backend
cd backend
go mod download
echo 'JWT_SECRET=...' > .env
go run main.go

# Frontend
cd ../frontend
npm install
npm start
```

## 📦 API Overview

| Method | Endpoint       | Description                         |
|--------|----------------|-------------------------------------|
| POST   | `/users`       | Register new user                   |
| POST   | `/users/login` | Login and get token                 |
| POST   | `/users/logout`| Logout and clear session            |
| GET    | `/users`       | List all users                      |
| GET    | `/items`       | List all items                      |
| POST   | `/items`       | Create new item                     |
| POST   | `/carts`       | Add item to user’s cart (token req) |
| GET    | `/carts`       | View current cart (token req)       |
| POST   | `/orders`      | Convert cart to order (token req)   |
| GET    | `/orders`      | List user’s orders (token req)      |

## 🧪 API Testing

- Full **Postman Collection** included: `Shopping_Cart_API.postman_collection.json`
- Includes:
  - User registration, login, logout
  - Add/view cart
  - Checkout
  - Full **Single Device Login** test suite

## 📐 Database Schema (GORM Models)

- **User**: ID, Username, Password, Token
- **Item**: ID, Name, Status
- **Cart**: ID, UserID, Status, Items (many-to-many)
- **CartItem**: CartID, ItemID (junction)
- **Order**: ID, UserID, CartID

## 🔐 Single Device Login Logic

1. User logs in → token is stored in DB
2. Re-login → invalidates previous token
3. Middleware ensures token in request matches DB
4. Token mismatch = forced logout

## 📤 Deployment

### 🔹 Backend (Render)
- Free tier with cold start
- Auto deploys from `render-deployment` branch

### 🔹 Frontend (GitHub Pages)
```bash
cd frontend
npm run deploy
```

## 🧠 Notes on Assignment Requirements

| Requirement                      | Status   |
|----------------------------------|----------|
| User Registration (`/users`)     | ✅ Done   |
| Login with single token/session  | ✅ Done   |
| Add item to single cart per user | ✅ Done   |
| Checkout cart into order         | ✅ Done   |
| Listing endpoints for all models | ✅ Done   |
| UI with login → item → cart/order | ✅ Done   |

## 🧪 Testing Locally

```bash
# Run backend unit tests
cd backend
go test ./...

# Run frontend unit tests
cd ../frontend
npm test
```

## 🧊 Cold Start Tip

For best performance, run:
```bash
go run main.go
```
on your machine. You’ll avoid Render’s 30–50 second cold start delays.

## ✅ Demo Credentials

| Username   | Password     |
|------------|--------------|
| `testuser` | `testpass123`|

## 📩 Submission Notes

- Project completed within 24 hours
- Repository hosted at: [GitHub Link](https://github.com/Ricky30feb/Shopping-Cart)
- Postman collection and `.env.example` included
