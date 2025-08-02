import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaShoppingCart, 
  FaSignOutAlt, 
  FaPlus,
  FaBox,
  FaCheck,
  FaTimes,
  FaShoppingBag,
  FaCreditCard,
  FaHistory
} from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import './ItemsList.css';

const ItemsList = ({ token, onLogout }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingItems, setLoadingItems] = useState(new Set());
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items`);
      setItems(response.data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addToCart = async (itemId) => {
    setLoadingItems(prev => new Set(prev).add(itemId));
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/carts`, {
        item_id: parseInt(itemId)
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSuccess('Item added to cart successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error adding item to cart');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const showCart = async () => {
    setCartLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/carts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const validCartItems = (response.data || []).filter(item => item.item_id > 0);
      
      if (validCartItems && validCartItems.length > 0) {
        const cartDetails = validCartItems.map(item => 
          `Cart ID: ${item.cart_id}, Item ID: ${item.item_id}`
        ).join('\n');
        console.log(`Cart Items:\n${cartDetails}`);
        alert(`Cart Items:\n${cartDetails}`);
      } else {
        console.log('Your cart is empty');
        alert('Your cart is empty');
      }
      
      setCartItems(validCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      alert('Error fetching cart items');
    } finally {
      setCartLoading(false);
    }
  };

  const showOrderHistory = async () => {
    setOrdersLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const orders = response.data || [];
      
      if (orders.length > 0) {
        const orderDetails = orders.map(order => 
          `Order ID: ${order.id || order.ID}`
        ).join('\n');
        
        console.log(`Order History:\n${orderDetails}`);
        alert(`Order History:\n${orderDetails}`);
      } else {
        console.log('No orders found');
        alert('No orders found');
      }
      
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error fetching orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      console.log('Cannot place an empty order. Add something to cart first.');
      alert('Cannot place an empty order. Add something to cart first.');
      return;
    }
    setCheckoutLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/orders`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Order successful');
      alert('Order successful');
      
      setCartItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="shopping-container">
      <div className="shopping-scroll-overlay">
        <div className="shopping-content">
          <div className="shopping-wrapper">
            <div className="shopping-card">
          {/* Header */}
          <div className="shopping-header">
            <div className="logo">
              <div className="logo-icon">
                <FaShoppingCart/>
              </div>
              <h1>Kartify</h1>
            </div>
            <p className="welcome-text">
              Discover amazing products and add them to your cart
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="shopping-tabs">
            <button 
              className="nav-button nav-button-checkout"
              onClick={handleCheckout}
            >
              <FaCreditCard className="tab-icon" />
              {checkoutLoading ? 'Processing...' : 'Checkout'}
            </button>
            <button 
              className="nav-button nav-button-cart"
              onClick={showCart}
              disabled={cartLoading}
            >
              <FaShoppingBag className="tab-icon" />
              {cartLoading ? 'Loading...' : 'Cart'}
            </button>
            <button 
              className="nav-button nav-button-orders"
              onClick={showOrderHistory}
              disabled={ordersLoading}
            >
              <FaHistory className="tab-icon" />
              {ordersLoading ? 'Loading...' : 'Order History'}
            </button>
            <button 
              className="nav-button nav-button-logout"
              onClick={onLogout}
            >
              <FaSignOutAlt className="tab-icon" />
              Logout
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="message error-message">
              <span className="message-icon">
                <FaTimes />
              </span>
              {error}
            </div>
          )}

          {success && (
            <div className="message success-message">
              <span className="message-icon">
                <FaCheck />
              </span>
              {success}
            </div>
          )}

          {/* Items Section */}
          <div className="items-section">
            <div className="section-header">
              <h3><FaBox className="section-icon" /> Available Items</h3>
            </div>
            {items.length === 0 ? (
              <div className="empty-state">
                <FaBox className="empty-icon" />
                <p>No items available</p>
              </div>
            ) : (
              <div className="items-grid">
                {items.map((item) => (
                  <div key={item.ID} className="item-card">
                    <div className="item-header">
                      <h4>{item.name}</h4>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="item-actions">
                      <button 
                        onClick={() => addToCart(item.id || item.ID)} 
                        className="add-button"
                        disabled={loadingItems.has(item.id || item.ID)}
                      >
                        {loadingItems.has(item.id || item.ID) ? (
                          <>
                            <span className="spinner"></span>
                            Adding...
                          </>
                        ) : (
                          <>
                            <FaPlus className="button-icon" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;