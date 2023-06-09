import React, { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import IsDevelopment from "./IsDevelopment";

const CategoryTopThree = ({
  products_in_this_category,
  products,
  category,
}) => {


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
      pathname: "/PostSelectQuestionnaire",
      query: {
        name: name,
        // products_in_this_category: JSON.stringify(products_in_this_category),
        selectedProducts: selectedProducts,
        category: category,
      },
    });
  };

  return (
    <>
      <IsDevelopment>
        <button
          onClick={() => {
            console.log(category);
          }}
        >
          category inside
        </button>


        <button
          onClick={() => {
            console.log(products);
          }}
        >
          products
        </button>
      </IsDevelopment>

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
                  : "1px solid grey",
              }}
            >
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '100px',
  minHeight: '160px' // Added min height of 160px
}}>
  <img
    src={`/products/${product.img}`}
    alt={product.name}
    style={{
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    }}
  />
</div>

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
