import {useContext, useEffect} from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Head from 'next/head'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AppContext, ProductRange} from 'components'
import {
  getCollectionBanner,
  getProducts,
  getProductsWithPagination,
} from 'services'

import {useAuthFetch} from 'components/customHooks'
import {getFavoriteVariantsHandler} from 'utils'
/* -------------------------------------------------------------------------- */

/* --------------------------------- Styles --------------------------------- */
import 'react-tabs/style/react-tabs.css'
/* -------------------------------------------------------------------------- */

function Products(props) {
  const [appState, setAppState] = useContext(AppContext)
  const authFetchHandler = useAuthFetch()
  const router = useRouter()

  const queryChangeHandler = async () => {
    try {
      await getFavoriteVariantsHandler({setAppState, authFetchHandler})
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!appState.favoriteProducts) {
      getFavoriteVariantsHandler({setAppState, authFetchHandler})
    }
  }, [])

  useEffect(() => {
    queryChangeHandler()
  }, [router.query.category])

  return (
    <div>
      <Head>
        <title>Calypso Products</title>
        <meta
          content="From scalp protection to insect repellent, we have everything you need to stay protected in the sun both at home and abroad. Our products are available to buy from some of the biggest UK grocery chains as well as some independent pharmacies, and online on Amazon."
          name="description"
        />
      </Head>

      <section className="container">
        <div>
          {props.products.length ? (
            <ProductRange
              banner={props.productFinderBanner}
              products={props.products}
              videoBanner={props.videoBanner}
            />
          ) : (
            <Box className="centralize" sx={{width: '100%', my: 20}}>
              <Typography fontSize={22} fontWeight={600}>
                No products have found in this category
              </Typography>
            </Box>
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

  const productFinderBannerResult = await getCollectionBanner('product-finder')
  const videoBanner = await getCollectionBanner('product-page-banner')

  const productFinderBanner =
    productFinderBannerResult?.results[0]?.slides ?? []

  return {
    props: {
      products: productResult?.flat() ?? [],
      productFinderBanner,
      videoBanner: videoBanner?.results ?? [],
    },
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Products
