const createProduct = (id , name, catergory, img) => {

    return {

        "product_id" : id,
        "name" : name,
        "category" : catergory,
        "img" : img

    }

}

module.exports = { createProduct };