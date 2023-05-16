import React, { useState, useEffect } from "react";
import products_list from "../data/products_list";
import Image from "next/image";
import styles from "../styles/Questionnaire.module.css";
import { useRouter } from 'next/router';
import axios from "axios";
import IsDevelopment from "../Components/IsDevelopment";

// selectedProducts

const PostSelectQuestionnaire = () => {
  const router = useRouter();
  const { name, selectedProducts, category } = router.query;
  const product_category = category

  const product_name = "default"

  const productIds = selectedProducts || []; // provide default value
  console.log("productIds", productIds)
  const productIds_int = productIds.map((id) => parseInt(id));

  //total products
  const products_array = products_list.products_array;



  const [formData, setFormData] = useState();

  useEffect(() => {

    setFormData(productIds.map((productId) => ({
      name : name,
      product_category: product_category,
      product_name : products_array.find(p => p.product_id === productId).name,
      product_img : products_array.find(p => p.product_id === productId).img,
      what_do_you_like_best: "",
      unique: "Very common",
    })))

  }, [selectedProducts])

  const handleRatingChange = (e, index) => {
    e.preventDefault();
    let value;
    switch (e.target.value) {
      case "0":
        value = "Very common";
        break;
      case "1":
        value = "Differentiated";
        break;
      case "2":
        value = "Super unique";
        break;
      default:
        value = "";
        break;
    }
    setFormData((prevData) =>
      prevData.map((data, i) =>
        i === index ? { ...data, unique: value } : data
      )
    );
  };
  

  const handleCommentChange = (e, index) => {
    setFormData((prevData) =>
      prevData.map((data, i) =>
        i === index ? { ...data, what_do_you_like_best: e.target.value } : data
      )
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    formData.forEach(async (data, i) => {
      try {
        const {
          name,
          product_category,
          product_name,
          what_do_you_like_best,
          unique } = data;

        

          console.log("handleSubmit - name:", name);
          console.log("handleSubmit - product_category:", product_category);
          console.log("handleSubmit - product_name:", product_name);
          console.log("handleSubmit - what_do_you_like_best:", what_do_you_like_best);
          console.log("handleSubmit - unique:", unique);
          
        await axios.post('/api/post_selection_post', {
          name,
          product_category,
          product_name,
          what_do_you_like_best,
          unique,
        });

        // reset the form
        setFormData(
          productIds.map((productId) => ({
            name : name,
            product_category: product_category,
            product_name : products_array.find(p => p.product_id === productId).name,
            what_do_you_like_best: "",
            unique: 0,
          }))
        );
          
        window.alert(`Product ${product_name} feedback submitted successfully, thank you.`);
        console.log(`Product ${productIds[i]} feedback submitted successfully.`);

        window.location.href = "/ThankYouPage";


  
      } catch (error) {
        window.alert(`Product ${product_name} feedback submission failed, please try again or contact adminstrator.`);
        console.error(`Failed to submit feedback for product ${productIds[i]}: ${error}`);
      }
    });
  

  };

  function getRatingValue(value) {
    switch (value) {
      case "Very common":
        return 0;
      case "Differentiated":
        return 1;
      case "Super unique":
        return 2;
      default:
        return null;
    }
  }

  if(!formData) return 

  return (
    <div className={styles.questionnaireContainer}>

      <IsDevelopment>

      <button onClick={() => {console.log(formData)}}>formData</button>
      <button onClick={() => {console.log(category)}}>category</button>
      <button onClick={() => {console.log(product_name)}}>product_name</button>
      <button onClick={() => {console.log(product_category)}}>product_category</button>
      <button onClick={() => {console.log(productIds)}}>productIds</button>
      <button onClick={() => {console.log(products_array)}}>products_array</button>

      </IsDevelopment>


      

      {category}

      <div>Name : {name}</div>


      {productIds.map((product, index) => {

        const img = products_array.find((p) => p.product_id === product).img
        const name = products_array.find((p) => p.product_id === product).name
        
        
        return(
        <div className={styles.questionnaire} key={product}>
          <h3>{name}</h3>
          <div className={styles.imageContainer}>
            <Image
              src={`/products/${img}`}
              alt="Product Image"
              width={200}
              height={200}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor={`what_do_you_like_best${product}`}>
              What do you like best about the product?
            </label>
            <textarea
              id={`what_do_you_like_best${product}`}
              name={`what_do_you_like_best${product}`}
              value={formData[index].what_do_you_like_best}
              onChange={(e) => handleCommentChange(e, index)}
            ></textarea>
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor={`uniqueRating${product}`}>
              Do you find this idea unique?
            </label>
            <select
              id={`unique${product}`}
              name={`unique${product}`}
              value={getRatingValue(formData[index].unique)}
              onChange={(e) => handleRatingChange(e, index)}
            >
              <option value={0}>Very common</option>
              <option value={1}>Differentiated</option>
              <option value={2}>Super unique</option>
            </select>
          </div>
        </div>
      )}
      )}
      <button className={styles.submitButton} type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PostSelectQuestionnaire;
