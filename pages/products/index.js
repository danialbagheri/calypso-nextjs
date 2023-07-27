import {useState} from 'react'

import 'react-tabs/style/react-tabs.css'
import Head from 'next/head'
import FilterProducts from '../../components/products/filter-products'
import _ from 'lodash'
import {ProductRange} from 'components'

function Products(props) {
  const ordered_products = _.orderBy(
    // checks if product is in multiple collections meaning it's more popular than others
    props.products,
    [item => item.types[0].id, item => item.collection_names.length],
    ['asc', 'desc'],
  )
  const [products, setProducts] = useState(ordered_products)
  const [limit, setLimit] = useState(10)

  const [maxLimit, setMaxLimit] = useState(false)

  function LoadMore() {
    const newLimit = limit + 10
    if (newLimit >= products.length) {
      setLimit(products.length)
      setMaxLimit(true)
    } else {
      setLimit(newLimit)
    }
  }

  return (
    <div>
      <Head>
        <title>
          Calypso Products range - Sun Protection, After Sun, Kids products,
          Tanning and Health care
        </title>
        <meta
          content="From scalp protection to insect repellent, we have everything you need to stay protected in the sun both at home and abroad. Our products are available to buy from some of the biggest UK grocery chains as well as some independent pharmacies, and online on Amazon."
          name="description"
        />
      </Head>
      <div className="product-page-banner-image">
        <h1>
          Have you got your <br />
          <span>summer essentials</span> ready?
        </h1>
      </div>
      <section className="container">
        <div className="product-page-filter row">
          <FilterProducts
            limit={limit}
            products={ordered_products}
            setLimit={setLimit}
            setMaxLimit={setMaxLimit}
            setProducts={setProducts}
          />
        </div>
        <div>
          <ProductRange
            limit={limit}
            products={products}
            type="sun%20protection"
          />
          {maxLimit ? (
            <span id="loading"></span>
          ) : (
            <div className="text-centre m-3">
              <button
                className="btn btn-calypso"
                id="loading"
                onClick={LoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
async function getAllPages(pageCount, url) {
  let pageNumber = 1
  const productResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    const paginatedUrl = url + `?page=${pageNumber}`
    const res = await fetch(paginatedUrl)
    const product = await res.json()
    productResult.push(product.results)
  }
  return productResult
}

export async function getStaticProps() {
  const baseUrl = process.env.API_URL
  const endpoint = 'products/product/'
  const finalUrl = baseUrl + endpoint
  const res = await fetch(finalUrl)

  const products = await res.json()
  const pageCount = Math.ceil(products.count / 10)
  const productResult = await getAllPages(pageCount, finalUrl)

  // Now we will get the staff picked articles

  if (!productResult) {
    return {
      notFound: true,
      isLoaded: false,
    }
  }

  return {
    props: {
      products: productResult.flat(),
      isLoaded: true,
    },
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Products
