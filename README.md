# Shopping Cart E-commerce Project

This is a simple e-commerce shopping cart application built with Go (Gin framework) for the backend and React for the frontend.

## Project Structure

```
ShoppingCart/
├── backend/           # Go backend API
│   ├── controllers/   # API controllers
│   ├── database/     # Database connection
│   ├── middleware/   # Auth middleware
│   ├── models/       # Data models
│   ├── utils/        # Utility functions
│   ├── go.mod        # Go dependencies
│   └── main.go       # Main application
└── frontend/         # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Login.css
    │   │   ├── ItemsList.js
    │   │   └── ItemsList.css
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## Database Schema

The application uses the following entities:

### Users
- id (int, primary key)
- username (varchar)
- password (varchar)
- token (varchar)
- cart_id (int)
- created_at (timestamp)

### Carts
- id (int, primary key)
- user_id (int)
- name (varchar)
- status (varchar)
- created_at (timestamp)

### Items
- id (int, primary key)
- name (varchar)
- status (varchar)
- created_at (timestamp)

### Orders
- id (int, primary key)
- cart_id (int)
- user_id (int)
- created_at (timestamp)

### Cart_Items
- cart_id (int)
- item_id (int)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users | Creates a new User |
| GET | /users | List all users |
| POST | /users/login | Login for existing user based on username and password |
| POST | /items | Creates an Item |
| GET | /items | List all items |
| POST | /carts* | Create and adds Items to the cart |
| GET | /carts* | List all carts |
| POST | /orders* | Pass the cart id to convert it to an order |
| GET | /orders* | List all orders |

*The user's token must be present in the cart related endpoint request to identify which user the cart belongs to.

## How to Run the Project

### Prerequisites
- Go 1.23+ installed
- Node.js 14+ and npm installed

### Backend (Go/Gin)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Set GOPATH (if needed):
   ```bash
   export GOPATH=/Users/kushagrakulshrestha/Desktop/ShoppingCart/go

4. Run the application:
   ```bash
   go run .
   ```
   The backend server will start on `http://localhost:8080`.

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```
   The frontend development server will start on `http://localhost:3000`.

   ```

4. Run the backend server:
   ```bash
   go run .
   ```

The backend will start on `http://localhost:8080`

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## Test User

A test user is automatically created when the backend starts:
- Username: `testuser`
- Password: `password`

## Testing the API

### Using Postman
Import the provided Postman collection file: `Shopping_Cart_API.postman_collection.json`

### Manual Testing Steps:

1. **Login to get token:**
   ```bash
   curl -X POST http://localhost:8080/users/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password"}'
   ```

2. **Get all items:**
   ```bash
   curl -X GET http://localhost:8080/items
   ```

3. **Add item to cart (replace TOKEN with actual token):**
   ```bash
   curl -X POST http://localhost:8080/carts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"item_id": 1}'
   ```

4. **View cart items:**
   ```bash
   curl -X GET http://localhost:8080/carts \
     -H "Authorization: Bearer TOKEN"
   ```

5. **Create order (checkout):**
   ```bash
   curl -X POST http://localhost:8080/orders \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{}'
   ```

6. **View orders:**
   ```bash
   curl -X GET http://localhost:8080/orders \
     -H "Authorization: Bearer TOKEN"
   ```

## How to Use the Application

1. **Login**: Enter the username and password on the login screen
2. **Browse Items**: After successful login, you'll see a list of available items
3. **Add to Cart**: Click on any item to add it to your cart
4. **View Cart**: Click the "Cart" button to see items in your cart (displays cart_id and item_id)
5. **Order History**: Click the "Order History" button to see your placed orders
6. **Checkout**: Click the "Checkout" button to convert your cart into an order
7. **Logout**: Click the "Logout" button to return to the login screen

## Features

- User authentication with JWT tokens
- Add items to cart
- View cart contents
- Place orders (checkout)
- View order history
- Clean and professional UI
- Responsive design

## Technologies Used

### Backend
- Go
- Gin (Web framework)
- GORM (ORM)
- SQLite (Database)
- JWT (Authentication)
- bcrypt (Password hashing)

### Frontend
- React
- Axios (HTTP client)
- CSS3 (Styling)

## Database

The application uses SQLite database which is automatically created when the backend starts. The database file `shopping_cart.db` will be created in the backend directory.

Sample items are automatically seeded into the database on startup:
- Laptop
- Phone  
- Tablet
- Watch
- Headphones
