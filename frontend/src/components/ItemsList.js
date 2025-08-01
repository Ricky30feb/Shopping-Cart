import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemsList.css';

const ItemsList = ({ token, onLogout }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCartItems, setShowCartItems] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/items');
      setItems(response.data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      await axios.post('http://localhost:8080/carts', {
        item_id: itemId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Item added to cart!');
    } catch (error) {
      alert('Error adding item to cart');
    }
  };

  const showCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/carts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCartItems(response.data || []);
      setShowCartItems(true);
      setShowOrders(false);
    } catch (error) {
      alert('Error fetching cart items');
    }
  };

  const showOrderHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data || []);
      setShowOrders(true);
      setShowCartItems(false);
    } catch (error) {
      alert('Error fetching orders');
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:8080/orders', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Order placed successfully!');
      setCartItems([]);
      setShowCartItems(false);
    } catch (error) {
      alert('Error placing order');
    }
  };

  const backToItems = () => {
    setShowCartItems(false);
    setShowOrders(false);
  };

  return (
    <div className="items-container">
      <div className="header">
        <h2>Shopping Cart</h2>
        <div className="nav-buttons">
          <button onClick={backToItems} className="nav-button">Items</button>
          <button onClick={showCart} className="nav-button">Cart</button>
          <button onClick={showOrderHistory} className="nav-button">Order History</button>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </div>

      {!showCartItems && !showOrders && (
        <div className="items-grid">
          <h3>Available Items</h3>
          {items.length === 0 ? (
            <p>No items available</p>
          ) : (
            <div className="items-list">
              {items.map((item) => (
                <div key={item.ID} className="item-card">
                  <h4>{item.name}</h4>
                  <p>Status: {item.status}</p>
                  <button onClick={() => addToCart(item.ID)} className="add-button">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showCartItems && (
        <div className="cart-section">
          <h3>Cart Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((cartItem, index) => (
                  <div key={index} className="cart-item">
                    <p>Cart ID: {cartItem.cart_id}</p>
                    <p>Item ID: {cartItem.item_id}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleCheckout} className="checkout-button">
                Checkout
              </button>
            </>
          )}
        </div>
      )}

      {showOrders && (
        <div className="orders-section">
          <h3>Order History</h3>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.ID} className="order-item">
                  <p>Order ID: {order.ID}</p>
                  <p>Cart ID: {order.cart_id}</p>
                  <p>Date: {new Date(order.CreatedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemsList;
