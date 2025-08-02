# Shopping Cart - Full Stack E-commerce Application

A modern, production-ready e-commerce application built with Go (Gin framework) backend and React frontend, featuring secure authentication, cart management, and order processing.

## Live Demo

**Frontend**: [https://Ricky30feb.github.io/Shopping-Cart](https://Ricky30feb.github.io/Shopping-Cart) (GitHub Pages)  
**Backend**: Runs locally on your machine

## Features

- **Secure Authentication**: JWT-based user registration and login
- **🔐 Single Device Login**: Users can only be logged in from one device at a time (enforced server-side)
- **Product Catalog**: Browse products with filtering by category and availability
- **Shopping Cart**: Add items with quantity management and real-time updates
- **Order Processing**: Complete checkout flow with order history tracking
- **Responsive Design**: Mobile-first UI that works across all devices
- **RESTful API**: Well-structured endpoints with comprehensive error handling
- **Data Validation**: Input validation and sanitization on both client and server
- **Security**: Password hashing, secure JWT tokens, and CORS protection
- **🧪 Comprehensive Testing**: Postman collection with automated single device login tests

## Tech Stack

### Backend
- **Go 1.19+** - High-performance backend language
- **Gin** - Fast HTTP web framework with middleware support
- **GORM** - Feature-rich ORM with migrations and relationships
- **SQLite/PostgreSQL** - Database layer with environment-based configuration
- **JWT** - Stateless authentication with secure token management
- **bcrypt** - Industry-standard password hashing

### Frontend
- **React 18+** - Modern UI library with hooks
- **Axios** - Promise-based HTTP client
- **React Icons** - Comprehensive icon library
- **CSS3** - Responsive design with CSS Grid and Flexbox

## Prerequisites

- Go 1.19 or higher
- Node.js 16 or higher
- npm or yarn package manager

## 🎯 Quick Start for Users

**Want to try the application right now?**

1. **Visit the live frontend**: [https://Ricky30feb.github.io/Shopping-Cart](https://Ricky30feb.github.io/Shopping-Cart)

2. **Set up the backend locally** (takes 2 minutes):
   ```bash
   git clone https://github.com/Ricky30feb/Shopping-Cart.git
   cd Shopping-Cart/backend
   go mod download
   echo 'JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters' > .env
   go run cmd/seeder/main.go
   go run main.go
   ```

3. **That's it!** The frontend will automatically connect to your local backend at `localhost:8080`

## Installation & Setup

### Option 1: Use Live Frontend + Local Backend (Recommended)

**Frontend**: Already deployed at [https://Ricky30feb.github.io/Shopping-Cart](https://Ricky30feb.github.io/Shopping-Cart)

**Backend Setup** (Required):
```bash
# 1. Clone the repository
git clone https://github.com/Ricky30feb/Shopping-Cart.git
cd Shopping-Cart/backend

# 2. Install Go dependencies
go mod download

# 3. Set up environment variables (CRITICAL STEP)
cp .env.example .env
# Edit .env file and set JWT_SECRET to a secure random string (minimum 32 characters)
# Generate one with: openssl rand -base64 32

# 4. Initialize database with sample data
go run cmd/seeder/main.go

# 5. Start the backend server
go run main.go
```

The backend API will be available at `http://localhost:8080`  
The frontend will automatically connect to your local backend.

### Option 2: Full Local Development

If you want to run both frontend and backend locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Ricky30feb/Shopping-Cart.git
cd Shopping-Cart
```

### 2. Backend Setup
```bash
cd backend

# Install Go dependencies
go mod download

# Set up environment variables (CRITICAL STEP)
cp .env.example .env
# Edit .env file and set JWT_SECRET to a secure random string (minimum 32 characters)
# Generate one with: openssl rand -base64 32

# Initialize database with sample data
go run cmd/seeder/main.go

# Start the backend server
go run main.go
```

The backend API will be available at `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm start
```

The frontend application will be available at `http://localhost:3000`

## 🚀 Deployment

### Frontend Deployment (GitHub Pages)

The frontend is configured for GitHub Pages deployment:

```bash
cd frontend

# Build and deploy to GitHub Pages
npm run deploy
```

This will:
1. Build the React application
2. Deploy it to GitHub Pages
3. Make it available at `https://Ricky30feb.github.io/Shopping-Cart`

### Backend Deployment

The backend runs locally and connects to the deployed frontend. Users only need to:
1. Clone the repository
2. Set up the backend locally (see installation instructions above)
3. Access the live frontend which will connect to their local backend

## 📋 User Instructions

### For End Users:
1. **Access the App**: Go to [https://Ricky30feb.github.io/Shopping-Cart](https://Ricky30feb.github.io/Shopping-Cart)
2. **Setup Backend**: Follow the 2-minute setup in "Quick Start for Users" section above
3. **Use the App**: Register an account, browse products, add to cart, and place orders!

### For Developers:
- **Frontend Code**: Already deployed, but you can run locally with `npm start` in the `/frontend` directory
- **Backend Code**: Must run locally for the API to work
- **Deployment**: Frontend auto-deploys via GitHub Pages, backend runs locally

⚠️ **Important**: The frontend expects the backend to run on `http://localhost:8080`

## 🔧 Technical Notes

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (local development)
- `https://ricky30feb.github.io` (GitHub Pages deployment)

### How It Works
1. **Frontend**: Hosted statically on GitHub Pages
2. **Backend**: Runs locally on user's machine (`localhost:8080`)
3. **API Communication**: Frontend makes AJAX requests to local backend
4. **Security**: JWT tokens for authentication, bcrypt for password hashing

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the backend directory based on `.env.example`:

```bash
# Security (REQUIRED - Application will not start without this)
JWT_SECRET=your_secure_random_string_minimum_32_characters
# Generate with: openssl rand -base64 32

# Server Configuration (Optional)
PORT=8080
GIN_MODE=debug  # Use 'release' for production

# Database (Optional - SQLite used by default)
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=shopping_cart

# CORS Settings (Optional)
ALLOWED_ORIGINS=http://localhost:3000
```

⚠️ **Important**: The application will fail to start if `JWT_SECRET` is not set or is less than 32 characters long.

## Single Device Login Feature

This application implements **single device login enforcement**, ensuring that users can only be logged in from one device at a time, as per the business requirements.

### How It Works

1. **Login**: When a user logs in, a JWT token is generated and stored in the database
2. **Previous Sessions Invalidated**: Any existing tokens for that user are automatically invalidated
3. **Token Validation**: Every API request validates that the provided token matches the stored token
4. **Automatic Logout**: If a user logs in from another device, previous sessions are automatically invalidated
5. **Explicit Logout**: Users can explicitly logout, clearing the server-side token

### Security Benefits

 **Prevents concurrent sessions** from multiple devices  
 **Forces logout** when user logs in elsewhere  
 **Single source of truth** for active sessions  
 **Clear error messaging** when session is invalidated  
 **Proper session cleanup** on logout  

### Error Messages

- `"Session expired - logged in from another device"` - When using an old token after new login
- `"Authorization header required"` - When no token is provided  
- `"Invalid token"` - When JWT token is malformed or expired
- `"User not found"` - When user ID from token doesn't exist

## API Testing with Postman

The project includes a comprehensive Postman collection (`Shopping_Cart_API.postman_collection.json`) with:

### Standard API Tests
- User registration and authentication
- Product catalog management
- Cart operations (add, view items)
- Order processing (checkout, history)

### Single Device Login Test Suite
A complete 7-step test sequence that validates single device login functionality:

1. **Login Device A** → Get token A
2. **Test Device A Access** → Should work 
3. **Login Device B** → Get token B (invalidates A)
4. **Test Device A Access** → Should fail ("logged in from another device")
5. **Test Device B Access** → Should work 
6. **Logout Device B** → Clear token B
7. **Test Device B After Logout** → Should fail

### How to Use Postman Collection

1. **Import** `Shopping_Cart_API.postman_collection.json` into Postman
2. **Start your backend** server (`go run main.go`)
3. **Create a test user** using the "Create User" request
4. **Run the "Single Device Login Tests" folder** to validate the functionality
5. **Use individual requests** for manual API testing

For detailed instructions, see `Postman_Collection_Guide.md`.

## 📋 Business Requirements Compliance

This application fully implements the following business requirements:

###  1. User Registration
- **Requirement**: "When a user will come to your platform and signup (POST /users API is called), a new User account gets created."
- **Implementation**: `POST /users` endpoint creates new user accounts with secure password hashing

###  2. User Authentication with Single Device Login
- **Requirement**: "The user needs to be logged in order to create a cart. If the user already has an account, the user will login using POST /users/login API which will return a token for further requests in the user's session. A user can only be logged in from a single device at a time i.e. there'll always be a single token for the user."
- **Implementation**: 
  - `POST /users/login` returns JWT token
  - Server-side token validation ensures single device login
  - Previous tokens automatically invalidated on new login
  - `POST /users/logout` explicitly clears server sessions

### 3. Shopping Cart Management
- **Requirement**: "When the user starts shopping and selects Items, the Items will get added to the Cart. This will be done by POST /carts API. A single user can have only a single cart, so you'll need to identify the Cart by the User's ID."
- **Implementation**: 
  - `POST /carts` adds items to user's cart
  - One active cart per user (identified by User ID)
  - Cart status management (active → ordered)

### 4. Inventory Simplification
- **Requirement**: "For sake of simplicity let's assume that we don't want to manage inventory yet i.e. we don't have to keep track of the number of items, whether it's in stock or out of stock, etc."
- **Implementation**: No inventory tracking implemented, items always available

### 5. Order Processing
- **Requirement**: "The cart will get converted into an order when the POST /orders API is called."
- **Implementation**: `POST /orders` converts active cart to order and updates cart status

### 6. Listing Endpoints
- **Requirement**: "There should also be listing endpoints for User, Items, Carts and Orders."
- **Implementation**: 
  - `GET /users` - List all users
  - `GET /items` - List all items
  - `GET /carts` - Get user's cart items
  - `GET /orders` - Get user's order history

## API Documentation

### Authentication Endpoints
- `POST /users` - Register new user
- `POST /users/login` - Authenticate user and get JWT token
- `POST /users/logout` - **Logout and invalidate server-side token** 🔐
- `GET /users` - Get all users (admin)

### Product Endpoints
- `GET /items` - Get all products (supports filtering)
- `POST /items` - Create new product

### Cart Endpoints (Authenticated)
- `POST /carts` - Add item to cart
- `GET /carts` - Get user's cart items

### Order Endpoints (Authenticated)
- `POST /orders` - Create order (checkout)
- `GET /orders` - Get user's order history

### Request/Response Examples

#### User Registration
```bash
POST /users
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

#### Add Item to Cart
```bash
POST /carts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "item_id": 1,
  "quantity": 2
}
```

#### Logout User (Single Device Login)
```bash
POST /users/logout
Authorization: Bearer <jwt_token>
Content-Type: application/json

{}
```

**Response**: `{"message": "Logged out successfully"}`  
**Effect**: Invalidates the token server-side, forcing logout from all devices.

## Database Schema

The application uses a relational database with the following structure:

- **Users**: User accounts with encrypted passwords
- **Items**: Product catalog with pricing and categorization
- **Carts**: User shopping carts with status tracking
- **Cart_Items**: Junction table for cart-item relationships with quantities
- **Orders**: Completed purchases with totals and status

## Development

### Running Tests
```bash
# Backend tests
cd backend
go test ./...

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Backend build
cd backend
go build -o shopping-cart-api main.go

# Frontend build
cd frontend
npm run build
```

## 🛠️ Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Ensure backend is running on `http://localhost:8080`
- Check that JWT_SECRET is set in `.env` file
- Verify CORS settings allow your frontend origin

**"JWT_SECRET environment variable is required" error:**
```bash
cd backend
echo 'JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters' > .env
```

**Port 8080 already in use:**
```bash
lsof -ti:8080 | xargs kill -9
```

**Database issues:**
```bash
cd backend
rm shopping_cart.db  # Delete old database
go run cmd/seeder/main.go  # Recreate with fresh data
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication with expiration
- Single device login enforcement with server-side token validation**
- Automatic session invalidation when logging in from new device**
- Explicit logout endpoint that clears server-side sessions**
- Input validation and sanitization
- CORS protection
- SQL injection prevention through ORM
- Secure random JWT secret generation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
