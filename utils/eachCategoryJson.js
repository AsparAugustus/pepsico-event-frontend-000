const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateProducts(numProducts, categoryId, categoryPrefix, categoryName, products = []) {
  if (products.length === numProducts) {
    // All products have been generated, save the JSON and exit the program
    const data = { products_array: products };
    const fileName = `${categoryName}.json`;
    fs.writeFileSync(fileName, JSON.stringify(data));
    console.log(`Product list generated and saved to ${fileName}`);
    rl.close();
    return;
  }

  const currentId = categoryId + products.length + 1;
  rl.question(`What is the name of product ${currentId}? `, function(name) {
    const product = {
      product_id: currentId.toString(),
      name: name,
      category: categoryName,
      img: `${categoryPrefix}_${(products.length).toString().padStart(2, '0')}.jpg`
    };
    products.push(product);
    generateProducts(numProducts, categoryId, categoryPrefix, categoryName, products);
  });
}

rl.question('What is the name of the category? ', function(categoryName) {
  rl.question('How many products are in this category? ', function(numProducts) {
    rl.question('What is the starting product ID? ', function(startingId) {
      const categoryId = parseInt(startingId) - 1;
      rl.question('What is the image path prefix? ', function(prefix) {
        generateProducts(parseInt(numProducts), categoryId, prefix, categoryName);
      });
    });
  });
});
