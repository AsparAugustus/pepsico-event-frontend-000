import { useRouter } from 'next/router';
import labels_count from '../../data/labels_count';
import productsList from '../../data/products_list';
import { react } from 'react';
import CategoryTopThree from '../../Components/CategoryTopThree';
import IsDevelopment from '../../Components/IsDevelopment';



const CategoryPage = ({ products_in_this_category }) => {
  const router = useRouter()
  const { category } = router.query



  console.log("products_in_this_category", products_in_this_category)

  
  return (
    <div>
    {/* <ul>
      {products_in_this_category.map(product => (
        <li key={product.product_id}>
          {product.name}</li>

      ))}
    </ul> */}


    <IsDevelopment>
    <button onClick={() => {console.log(category)}}>category outside</button>
    </IsDevelopment>
  
    <CategoryTopThree products={products_in_this_category} category={category}/>

    </div>
  )
}

export default CategoryPage


export async function getStaticPaths() {
  const paths = labels_count.categories.map(category => ({
    params: { category: category },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const products_array = productsList.products_array
  const { category } = params
  const products_in_this_category = []

  // Populate the products array with data for the current category
  products_array.map((product) => {
    if (product.category === category) {
      products_in_this_category.push(product)
    }
  })


  return { props: { products_in_this_category, category } }
}
