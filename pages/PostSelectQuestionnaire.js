import React, { useState } from "react";
import products_list from "../data/products_list";
import Image from "next/image";
import styles from "../styles/Questionnaire.module.css";
import { useRouter } from 'next/router';

const PostSelectQuestionnaire = () => {
  const router = useRouter();
  const { name, selectedProducts } = router.query;

  if(!selectedProducts) return

  const productIds = selectedProducts;
  console.log(productIds, productIds)
  const productIds_int = productIds.map((id) => parseInt(id));

  const products_array = products_list.products_array;
  const [formData, setFormData] = useState(
    productIds_int.map(() => ({
      comments: "",
      uniqueRating: 0,
    }))
  );

  const handleRatingChange = (e, index) => {
    setFormData((prevData) =>
      prevData.map((data, i) =>
        i === index
          ? { ...data, uniqueRating: parseInt(e.target.value) }
          : data
      )
    );
  };

  const handleCommentChange = (e, index) => {
    setFormData((prevData) =>
      prevData.map((data, i) =>
        i === index ? { ...data, comments: e.target.value } : data
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit the form data
    console.log("Form Data:");
    formData.forEach((data, i) => {
      console.log(`Product ${productIds[i]}:`);
      console.log(`Comments: ${data.comments}`);
      console.log(`Unique Rating: ${data.uniqueRating}`);
    });
    // reset the form
    setFormData(
      productIds_int.map(() => ({
        comments: "",
        uniqueRating: 0,
      }))
    );
  };

  return (
    <div className={styles.questionnaireContainer}>

      <div>Name : {name}</div>
      {productIds_int.map((productId, index) => (
        <div className={styles.questionnaire} key={productId}>
          <h3>{products_array[productId].name}</h3>
          <div className={styles.imageContainer}>
            <Image
              src="/image1.jpg"
              alt="Product Image"
              width={200}
              height={200}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor={`comments${productId}`}>
              What do you like best about the product?
            </label>
            <textarea
              id={`comments${productId}`}
              name={`comments${productId}`}
              value={formData[index].comments}
              onChange={(e) => handleCommentChange(e, index)}
            ></textarea>
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor={`uniqueRating${productId}`}>
              Do you find this idea unique?
            </label>
            <select
              id={`uniqueRating${productId}`}
              name={`uniqueRating${productId}`}
              value={formData[index].uniqueRating}
              onChange={(e) => handleRatingChange(e, index)}
            >
              <option value={0}>Select one</option>
              <option value={1}>Very common</option>
              <option value={2}>Differentiated</option>
              <option value={3}>Super unique</option>
            </select>
          </div>
        </div>
      ))}
      <button className={styles.submitButton} type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PostSelectQuestionnaire;
