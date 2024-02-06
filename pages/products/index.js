import {useContext, useEffect, useState} from 'react'

import 'react-tabs/style/react-tabs.css'
import Head from 'next/head'
import _ from 'lodash'
import {ProductRange} from 'components'
import {getProducts, getProductsWithPagination} from 'services'
import {AppContext} from '../../components/appProvider/AppProvider'
import {getFavoriteProductsHandler} from '..'
import {useRouter} from 'next/router'
import {Box, Button, Typography} from '@mui/material'
import {getCollectionBanner} from '../../services'

const PRODUCTS_PER_PAGE = 10
const LG_IMAGE = 'lg_image'
const MD_IMAGE = 'md_image'
const MOBILE_IMAGE = 'mobile_webp'

function Products(props) {
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE)
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true)

  const [appState, setAppState] = useContext(AppContext)
  const router = useRouter()

  const productFinderBannerSrc = {
    lg: props.banner[0]?.[LG_IMAGE],
    md: props.banner[0]?.[MD_IMAGE],
    mobile: props.banner[0]?.[MOBILE_IMAGE],
  }

  const ordered_products = _.orderBy(
    // checks if product is in multiple collections meaning it's more popular than others
    props.products,
    [item => item.types[0].id, item => item.collection_names.length],
    ['asc', 'desc'],
  )

  const findProductsByCategory = ({products, category}) => {
    if (category === 'All' || !category) {
      return products
    }
    return products.filter(product => {
      return product.types.find(type => type === category)
    })
  }

  const category = router.query.category
  const products = findProductsByCategory({
    products: ordered_products,
    category,
  })

  function loadMore() {
    const newLimit = limit + 10
    if (newLimit >= products.length) {
      setLimit(products.length)
      setShowLoadMoreBtn(false)
    } else {
      setLimit(newLimit)
    }
  }

  const queryChangeHandler = async () => {
    const limitCheckHandler = () => {
      if (products.length <= limit) {
        setShowLoadMoreBtn(false)
      } else {
        setShowLoadMoreBtn(true)
      }
    }

    try {
      await getFavoriteProductsHandler(setAppState)
      limitCheckHandler()
    } catch (err) {
      console.error(err)
      limitCheckHandler()
    }
  }

  useEffect(() => {
    if (!appState.favoriteProducts) {
      getFavoriteProductsHandler(setAppState)
    }
  }, [])

  useEffect(() => {
    queryChangeHandler()
  }, [router.query.category, limit])

  useEffect(() => {
    setLimit(PRODUCTS_PER_PAGE)
  }, [router.query.category])

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

      {/* <div className="product-page-banner-image">
        <h1>
          Have you got your <br />
          <span>summer essentials</span> ready?
        </h1>
      </div> */}
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
          {products.length ? (
            <ProductRange
              banner={productFinderBannerSrc}
              limit={limit}
              products={products}
            />
          ) : (
            <Box className="centralize" sx={{width: '100%', my: 20}}>
              <Typography fontSize={22} fontWeight={600}>
                No products have found in this category
              </Typography>
            </Box>
          )}
          <Box className="centralize">
            {showLoadMoreBtn ? (
              <Button
                onClick={loadMore}
                sx={{
                  position: 'relative',

                  textAlign: 'center',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  textTransform: 'none',

                  p: '3px 80px',

                  borderRadius: '10px',

                  boxShadow: 'none',

                  whiteSpace: 'nowrap',

                  '&:hover': {
                    bgcolor: '#FFF !important',
                    boxShadow: 'none !important',
                  },
                  mb: 25,
                }}
                variant="outlined"
              >
                Load more
              </Button>
            ) : null}
          </Box>
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

  const sliderResponse = await getCollectionBanner('product-finder')
  const banner = sliderResponse?.results[0]?.slider_slides ?? []

  return {
    props: {
      products: productResult?.flat() ?? [],
      banner,
    },
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Products
