import {useContext, useEffect, useState} from 'react'

import 'react-tabs/style/react-tabs.css'
import Head from 'next/head'
import _ from 'lodash'
import {ProductRange} from 'components'
import {getProducts, getProductsWithPagination} from 'services'
import {AppContext} from '../../components/appProvider/AppProvider'
import {getFavoriteProductsHandler} from '..'

function Products(props) {
  const ordered_products = _.orderBy(
    // checks if product is in multiple collections meaning it's more popular than others
    props.products,
    [item => item.types[0].id, item => item.collection_names.length],
    ['asc', 'desc'],
  )
  const [products] = useState(ordered_products)
  const [limit, setLimit] = useState(10)
  const [maxLimit, setMaxLimit] = useState(false)
  const [appState, setAppState] = useContext(AppContext)

  function LoadMore() {
    const newLimit = limit + 10
    if (newLimit >= products.length) {
      setLimit(products.length)
      setMaxLimit(true)
    } else {
      setLimit(newLimit)
    }
  }

  useEffect(() => {
    if (!appState.favoriteProducts) {
      getFavoriteProductsHandler(setAppState)
    }
  }, [])

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
        {/* <div className="product-page-filter row">
          <FilterProducts
            limit={limit}
            products={ordered_products}
            setLimit={setLimit}
            setMaxLimit={setMaxLimit}
            setProducts={setProducts}
          />
        </div> */}
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
async function getAllPages(pageCount) {
  let pageNumber = 1
  const productResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    const product = await getProductsWithPagination(pageNumber)
    productResult.push(product.results)
  }
  return productResult
}

export async function getStaticProps() {
  const products = await getProducts()
  const pageCount = Math.ceil(products.count / 10)
  const productResult = await getAllPages(pageCount)

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
