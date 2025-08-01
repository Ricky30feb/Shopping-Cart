import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemsList.css';

const ItemsList = ({ token, onLogout }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId) => {
    try {
      await axios.post('http://localhost:8080/carts', 
        { item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:8080/orders', 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order successful');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  const showCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/carts',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cartItems = response.data.map(item => `cart_id: ${item.cart_id}, item_id: ${item.item_id}`);
      alert(cartItems.length > 0 ? cartItems.join('\n') : 'Cart is empty');
    } catch (error) {
      console.error('Error fetching cart:', error);
      alert('Failed to fetch cart items');
    }
  };

  const showOrderHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const orderIds = response.data.map(order => order.id);
      alert(orderIds.length > 0 ? `Order IDs: ${orderIds.join(', ')}` : 'No orders found');
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch order history');
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  return (
    <div className="items-container">
      <header className="header">
        <h1>Shopping Portal - List Items</h1>
        <div className="action-buttons">
          <button onClick={handleCheckout} className="checkout-btn">
            Checkout
          </button>
          <button onClick={showCart} className="cart-btn">
            Cart
          </button>
          <button onClick={showOrderHistory} className="orders-btn">
            Order History
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p className="item-status">Status: {item.status}</p>
            <button 
              onClick={() => addToCart(item.id)}
              className="add-to-cart-btn"
              disabled={item.status !== 'available'}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
