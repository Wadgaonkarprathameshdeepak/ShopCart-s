import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Signup
      if (username && password) {
        setUsers([...users, { username, password }]);
        setUsername('');
        setPassword('');
        setIsSignUp(false);
        alert('Signed up successfully! Please login.');
      } else {
        alert('Please enter username and password!');
      }
    } else {
      // Login
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        setIsLoggedIn(true);
        alert('Logged in successfully!');
      } else {
        alert('Invalid username or password!');
      }
    }
  };

  const handleAddProduct = () => {
    if (productName.trim() !== '' && productPrice.trim() !== '' && productImage) {
      setProducts([...products, { name: productName, price: productPrice, image: productImage }]);
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      alert('Product added successfully!');
    } else {
      alert('Please fill in all fields and upload an image!');
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    alert('Product deleted successfully!');
  };

  const handleUpdateProduct = (index) => {
    const updatedName = prompt('Enter new name for the product:');
    const updatedPrice = prompt('Enter new price for the product:');
    if (updatedName !== null && updatedPrice !== null) {
      const updatedProducts = [...products];
      updatedProducts[index] = { ...updatedProducts[index], name: updatedName, price: updatedPrice };
      setProducts(updatedProducts);
      alert('Product updated successfully!');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handlePasswordUpdate = () => {
    if (newPassword === confirmPassword) {
      const updatedUsers = users.map((user) => {
        if (user.username === username) {
          return { ...user, password: newPassword };
        }
        return user;
      });
      setUsers(updatedUsers);
      alert('Password updated successfully!');
      setShowChangePassword(false);
    } else {
      alert('New password and confirm password do not match!');
    }
  };

  return (
    <div className="admin-panel">
      {isLoggedIn ? (
        <div>
          <div className="user-details" onClick={handleChangePassword}>
            <span className="user-circle">{username[0].toUpperCase()}</span>
        <strong>{username}</strong>
          </div>
          {showChangePassword && (
            <div className="change-password-form">
              <h3>Change Password</h3>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={handlePasswordUpdate}>Update Password</button>
            </div>
          )}
          <div className="product-management">
            <h3>Add Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleAddProduct}>Add Product</button>
            <h3>Product List</h3>
            <ul>
              {products.map((product, index) => (
                <li key={index}>
                  <div>
                    <img className='in' src={product.image} alt={product.name} />
                    <div>{product.name}</div>
                    <div>${product.price}</div>
                  </div>
                  <div>
                    <button onClick={() => handleUpdateProduct(index)}>Update</button>
                    <button onClick={() => handleDeleteProduct(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h2>{isSignUp ? 'Sign Up for Admin Panel' : 'Login to Admin Panel'}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
          </form>
          <p>
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <button onClick={handleToggleForm}>
              {isSignUp ? 'Login here' : 'Sign up here'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Admin;
