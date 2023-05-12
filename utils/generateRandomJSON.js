const { createProduct } = require('./createProduct');


const generateRandomJSON = (number) => {
    const getRandomValue = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };
  
    const ids = [1, 2, 3, 4, 5];
    const names = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"];
    const categories = ["Energy and Hydration", "CSDs", "Juices", "Diverse Ingredients", "Core Expansion", "Flavour", "Premium", "Affordable"];
    const images = ["image1.jpg", "image2.jpg"];
  
    const id = `${number}`
    const name = `Product ${number}`
    const category = getRandomValue(categories);
    const img = getRandomValue(images);
  
    return createProduct(id, name, category, img);
  };
  
module.exports = { generateRandomJSON };