import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Head from 'next/head'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
/* -------------------------------------------------------------------------- */

import data from '../../data.json'
import ProductPageImage from '../../components/products/product-page-image'
import RelatedProduct from '../../components/products/related-products'
import ProductSchema from '../../components/seo/product-schema'

import {
  CustomersReview,
  Faq,
  ProductBreadCrumb,
  ProductDescription,
} from 'components'
import {getProductData, getProductReviews} from 'services'

function Product(props) {
  const {productData, reviewData, slug, error} = props
  const variants = productData.variants

  const [selectedVariant, setSelectedVariant] = React.useState(variants[0])
  const [snackBarDetails, setSnackBarDetails] = React.useState({
    open: false,
    message: '',
  })

  React.useEffect(() => {
    if (error) {
      setSnackBarDetails({open: true, message: error.split(':')[1]})
    }
  }, [error])

  return (
    <div>
      <ProductSchema
        product={productData}
        selected={{sku: selectedVariant.sku}}
      />
      <Head>
        <title>
          Calypso - {productData.name} - {productData.sub_title}
        </title>
        <meta name="description" content={productData.plain_description} />
        <meta name="twitter:card" content="product" />
        <meta
          name="twitter:description"
          content={productData.plain_description}
        />
        <meta
          property="og:image"
          content={selectedVariant.image_list[0].resized}
        />
        <meta
          name="twitter:image"
          content={selectedVariant.image_list[0].resized}
        />
        <meta property="og:price:amount" content={selectedVariant.price} />
        <meta property="og:price:currency" content="GBP" />
      </Head>
      <Box
        sx={{
          padding: {xs: 6, sm: 12},
        }}
      >
        <ProductBreadCrumb style={{marginBottom: 20}} product={productData} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: {xs: 6, sm: 8},
            '&>div': {
              width: {xs: '100%', sm: '50%'},
              maxWidth: {xs: 'unset', sm: 460},
            },
          }}
        >
          <ProductPageImage selectedVariant={selectedVariant} />
          <ProductDescription
            product={productData}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </Box>
      </Box>

      <Faq {...productData.faq_list} />

      <RelatedProduct related={productData.related_products} />

      <div id="readReviews" />
      <CustomersReview
        product={productData}
        slug={slug}
        reviewData={reviewData}
        error={error}
      />
      <Snackbar open={snackBarDetails.open} autoHideDuration={6000}>
        <Alert
          onClose={() => setSnackBarDetails(prev => ({...prev, open: false}))}
          severity="error"
          sx={{width: '100%'}}
        >
          {snackBarDetails.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  let error = null

  const productData = await getProductData(slug)
  let reviewData = await getProductReviews(slug)

  if (typeof reviewData === 'string' && reviewData.includes('error')) {
    error = reviewData
    reviewData = null
  }

  // key is needed here
  return {
    props: {
      key: productData.id,
      productData,
      reviewData,
      slug,
      error,
    },
    revalidate: 120,
  }
}

async function getAllPages(pageCount, url) {
  let pageNumber = 1
  let productResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    let paginatedUrl = url + `?page=${pageNumber}`
    const res = await fetch(paginatedUrl)
    const products = await res.json()
    productResult.push(products.results)
  }
  return productResult
}

export async function getStaticPaths() {
  const baseUrl = data.apiUrl
  const url = baseUrl + `products/product/`
  const res = await fetch(url)
  const products = await res.json()
  const pageCount = Math.ceil(products.count / 10)
  let productResult = await getAllPages(pageCount, url)
  let slugPaths = []

  for (let i = 0; i < productResult.length; i++) {
    let slugs = productResult[i].map(item => {
      return {
        params: {
          slug: item.slug,
        },
      }
    })
    Array.prototype.push.apply(slugPaths, slugs)
  }
  return {
    paths: slugPaths,
    fallback: false,
  }
}

export default Product
