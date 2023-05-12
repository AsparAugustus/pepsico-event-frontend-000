import React, { useState } from "react";
import Image from 'next/image';
import Header from "./Header";
import Footer from "./Footer";


const CategoryTopThree = ({ products, onSelect }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState(false);

  const handleProductSelect = (productId) => {
    let newSelectedProducts = [...selectedProducts];

    if (newSelectedProducts.includes(productId)) {
      newSelectedProducts = newSelectedProducts.filter(
        (id) => id !== productId
      );
    } else if (newSelectedProducts.length < 3) {
      newSelectedProducts.push(productId);
    }

    setSelectedProducts(newSelectedProducts);
  };

  const handleSubmit = () => {
    if (selectedProducts.length < 3) {
      setError(true);
      return;
    }

    onSelect(selectedProducts);
  };

  return (

    <>


  <div className="category-top-three-container">
    <h2>Select Your Favorite Products:</h2>
    <div className="category-top-three">
      {products.map((product) => (
        <div
          key={product.product_id}
          onClick={() => handleProductSelect(product.product_id)}
          className="category-top-three-item"
          style={{
            border: selectedProducts.includes(product.product_id)
              ? "2px solid blue"
              : "2px solid black",
          }}
        >
          <Image src={`/${product.img}`} alt={product.name} width={60} height={100} />
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.product_id)}
              onChange={() => handleProductSelect(product.product_id)}
            />
            {product.name}
          </label>
        </div>
      ))}
    </div>
    {error && (
      <div style={{ color: "red", marginTop: "10px" }}>
        Please select at least 3 products.
      </div>
    )}
    <div className="category-top-three-submit-container">
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </div>
</>

  );
};

export default CategoryTopThree;
