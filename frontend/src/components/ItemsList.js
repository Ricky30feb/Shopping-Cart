import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaSignOutAlt, 
  FaPlus,
  FaBox,
  FaShoppingBag,
  FaCreditCard,
  FaHistory
} from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import './ItemsList.css';

const ItemsList = ({ token, onLogout }) => {
  const [items, setItems] = useState([]);

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
    try {
      await axios.post(`${API_BASE_URL}/carts`, {
        item_id: parseInt(itemId)
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      alert('Item added to cart successfully!');
    } catch (error) {
      alert('Error adding item to cart');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/users/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      onLogout();
    }
  };

  const showCart = async () => {
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
    } catch (error) {
      console.error('Error fetching cart items:', error);
      alert('Error fetching cart items');
    }
  };

  const showOrderHistory = async () => {
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
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error fetching orders');
    }
  };

  const handleCheckout = async () => {
    try {
      const cartResponse = await axios.get(`${API_BASE_URL}/carts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const validCartItems = (cartResponse.data || []).filter(item => item.item_id > 0);
      
      if (validCartItems.length === 0) {
        console.log('Cannot place an empty order. Add something to cart first.');
        alert('Cannot place an empty order. Add something to cart first.');
        return;
      }

      await axios.post(`${API_BASE_URL}/orders`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Order successful');
      alert('Order successful');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <div className="shopping-container">
      <div className="shopping-content">
        <div className="top-toolbar">
          <div className="toolbar-buttons">
            <button 
              className="nav-button nav-button-checkout"
              onClick={handleCheckout}
            >
              <FaCreditCard className="tab-icon" />
              Checkout
            </button>
            <button 
              className="nav-button nav-button-cart"
              onClick={showCart}
            >
              <FaShoppingBag className="tab-icon" />
              Cart
            </button>
            <button 
              className="nav-button nav-button-orders"
              onClick={showOrderHistory}
            >
              <FaHistory className="tab-icon" />
              Order History
            </button>
            <button 
              className="nav-button nav-button-logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="tab-icon" />
              Logout
            </button>
          </div>
        </div>
        <div className="shopping-card">
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
                      >
                        <FaPlus className="button-icon" />
                        Add to Cart
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
  );
};

export default ItemsList;