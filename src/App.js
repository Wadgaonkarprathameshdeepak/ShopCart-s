import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ScrollToTop from 'react-scroll-to-top';
import { useContext } from 'react';
import { ShopContext } from './Context/ShopContext';
import Admin from './Pages/Admin';


function App() {
  const { theme } = useContext(ShopContext);
  return (
    <div className={`${theme}_app`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory category="men" />} />
          <Route path='/women' element={<ShopCategory category="women" />} />
          <Route path='/kids' element={<ShopCategory category="kids" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Admin' element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ScrollToTop smooth component={<p style={{ color: "blue" }}>↑</p>} />
    </div>
  );
}

export default App;
