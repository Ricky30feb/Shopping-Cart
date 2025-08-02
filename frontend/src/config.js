// API Configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL || 'https://shopping-cart-backend-gfe4.onrender.com'
  : 'http://localhost:8080';

export { API_BASE_URL };
