import React, { useState, useRef } from 'react';
import './Chatbot.css';
import botImage from './bot.png';
import bots from './bots.png';
import user from './user.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const inputRef = useRef(null);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
    if (!isOpen && isFirstOpen) {
      setMessages((prev) => [...prev, { type: 'bot', message: "Hi, I'm here to help. What do you want to know about?", options: ["Track My Order", "Cancel Order", "Returns & Refunds", "Contact Seller", "Products", "Order Status", "Return Policy", "Shipping", "Offers"] }]);
      setIsFirstOpen(false);
    }
  };

  const handleUserInput = (text) => {
    if (text.trim()) {
      setMessages((prev) => [...prev, { type: 'human', message: text }]);
      handleBotResponse(text);
      inputRef.current.value = '';
    }
  };

  const handleBotResponse = (text) => {
    const responses = {
      welcome: {
        message: "Hi, I'm here to help. What do you want to know about?",
        options: ["Track My Order", "Cancel Order", "Returns & Refunds", "Contact Seller", "Products", "Order Status", "Return Policy", "Shipping", "Offers"]
      },
      products: {
        message: "Here are some of our product categories:",
        options: ["Electronics", "Clothing", "Home & Kitchen", "Books"]
      },
      trackMyOrder: "Please provide your order ID to track your order.",
      cancelOrder: "To cancel an order, please provide your order ID.",
      returnsRefunds: "You can return any item within 30 days of purchase. Refunds will be processed within 7 business days after receiving the returned item.",
      contactSeller: "You can contact the seller directly from the product page. Look for the 'Contact Seller' button.",
      orderStatus: "Please provide your order ID to check the status.",
      returnPolicy: "You can return any item within 30 days of purchase. For more details, visit our return policy page.",
      shipping: "We offer free shipping on orders over $50. Delivery times vary based on your location.",
      offers: "Check out our latest offers and discounts on the deals page."
    };

    const matchResponse = (pattern, response) => {
      if (new RegExp(pattern, 'i').test(text)) {
        if (typeof response === 'object') {
          setMessages((prev) => [...prev, { type: 'bot', ...response }]);
        } else {
          setMessages((prev) => [...prev, { type: 'bot', message: response }]);
        }
        return true;
      }
      return false;
    };

    const patterns = {
      welcome: "hi|hello|hey|greetings",
      products: "products|item|shop|buy",
      trackMyOrder: "track my order|where is my order",
      cancelOrder: "cancel order|cancel my order",
      returnsRefunds: "returns & refunds|return item|refund",
      contactSeller: "contact seller|contact the seller",
      orderStatus: "order status|track my order|where is my order",
      returnPolicy: "return policy|how to return|can i return",
      shipping: "shipping|delivery|shipping details",
      offers: "offers|discounts|deals|sales"
    };

    for (let key in patterns) {
      if (matchResponse(patterns[key], responses[key])) return;
    }

    setMessages((prev) => [...prev, { type: 'bot', message: "I'm sorry, I didn't understand that. Can you please rephrase?" }]);
  };

  return (
    <div className="chatbot">
      <img 
        src={botImage} 
        alt="Chatbot Icon" 
        className="chatbot-icon" 
        onClick={toggleChatbox} 
      />
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h4>Conversation with ShopBot</h4>
            <button onClick={toggleChatbox}>X</button>
          </div>
          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  <div className="avatar">          
                            {msg.type === 'bot' ?<img src={bots} alt="Bot Avatar" /> : <img src={user} alt="User Avatar" />}
                  </div>
                  <div className="text">{msg.message}</div>
                </div>
                {msg.options && (
                  <div className="options">
                    {msg.options.map((option, idx) => (
                      <button key={idx} onClick={() => handleUserInput(option)}>{option}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chatbox-footer">
            <input type="text" placeholder="Write your message here" ref={inputRef} />
            <button onClick={() => handleUserInput(inputRef.current.value)}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
