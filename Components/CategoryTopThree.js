import React, { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from 'next/router';

const CategoryTopThree = ({ products_in_this_category, products, category }) => {
  
  const [name, setName] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);







  const [nameError, setNameError] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

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

    if (name === "") {
      setNameError(true);
      return;
    }

    router.push({
      pathname: '/PostSelectQuestionnaire',
      query: {
        name: name,
        // products_in_this_category: JSON.stringify(products_in_this_category),
        selectedProducts: selectedProducts,
        category: category
      }
    });
  };

  return (
    <>
      <button
        onClick={() => {
          console.log(category);
        }}
      >
        category inside
      </button>
      <div className="name-input-container">
        <div className="form-container">Name</div>
      
        <label>
          <input
            type="form"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="category-top-three-container">
        <h3>Please rank your top 3 preference:</h3>
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
              <Image
                src={`/${product.img}`}
                alt={product.name}
                width={60}
                height={100}
              />
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
        {nameError && (
          <div style={{ color: "red", marginTop: "10px" }}>
            Name cannot be left blank.
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
