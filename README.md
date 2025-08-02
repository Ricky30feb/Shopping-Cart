# Shopping Cart - Full Stack E-commerce Application

A modern, production-ready e-commerce application built with Go (Gin framework) backend and React frontend, featuring secure authentication, cart management, and order processing.

## Features

- **Secure Authentication**: JWT-based user registration and login
- **Product Catalog**: Browse products with filtering by category and availability
- **Shopping Cart**: Add items with quantity management and real-time updates
- **Order Processing**: Complete checkout flow with order history tracking
- **Responsive Design**: Mobile-first UI that works across all devices
- **RESTful API**: Well-structured endpoints with comprehensive error handling
- **Data Validation**: Input validation and sanitization on both client and server
- **Security**: Password hashing, secure JWT tokens, and CORS protection

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

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shopping-cart
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

## API Documentation

### Authentication Endpoints
- `POST /users` - Register new user
- `POST /users/login` - Authenticate user
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

## Security Features

- Password hashing with bcrypt
- JWT token authentication with expiration
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
