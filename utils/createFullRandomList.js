const { generateRandomJSON } = require("./generateRandomJSON");
const fs = require('fs');


const productsList = [];

for (let i = 1; i <= 120; i++) {
    productsList.push(generateRandomJSON(i))

}

const jsonData = JSON.stringify(productsList);

fs.writeFileSync('products.json', jsonData);

console.log(productsList)