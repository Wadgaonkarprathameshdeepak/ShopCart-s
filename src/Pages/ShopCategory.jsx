import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import soldOutImage from '../Components/Assets/soldout.avif';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    // Filter products based on the category
    let products;
    if (props.category === 'kids') {
      // Check if 'kids' category is sold out
      const kidsProducts = all_product.filter(item => item.category === 'kids');
      if (kidsProducts.length === 0) {
        setIsSoldOut(true);
      } else {
        products = kidsProducts;
        setIsSoldOut(false);
      }
    } else {
      products = all_product.filter(item => item.category === props.category);
      setIsSoldOut(false); // Reset sold out flag for other categories
    }
    // Set filtered products
    setFilteredProducts(products);
  }, [props.category, all_product]);

  const totalProducts = 76;
  const productsPerPage = 12;
  const [page, setPage] = useState(1);

  const handleExploreMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const startIndex = (page - 1) * productsPerPage;
  let endIndex = startIndex + productsPerPage;
  endIndex = Math.min(endIndex, totalProducts);

  return (
    <div className='shop-category'>
      {props.category === 'kids' && isSoldOut ? (
    <div className='sold-out-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='sold-out-content' style={{ textAlign: 'center' }}>
        <img src={soldOutImage} alt='Sold Out' style={{ width: '600px', height: 'auto' }} />
        <p style={{ marginTop: '10px', fontWeight: 'bold', fontSize:'32px' }}>This category is sold out!</p>
          </div>
        </div>
      ) : (
        <>
          <div className='shopcategory-products'>
            {filteredProducts.slice(startIndex, endIndex).map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
          {endIndex < totalProducts && (
            <div className='shopcategory-loadmore' onClick={handleExploreMore}>
              Explore More
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopCategory;
