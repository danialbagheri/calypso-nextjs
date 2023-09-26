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
import RelatedProduct from '../../components/products/related-products'
import ProductSchema from '../../components/seo/product-schema'

import {
  CustomersReview,
  Faq,
  ProductBreadCrumb,
  ProductDescription,
  ProductImageSlider,
} from 'components'
import {getProductData, getProductReviews} from 'services'
import {useSearchParams} from 'next/navigation'

function Product(props) {
  const {productData, reviewData, slug, error} = props
  const searchParams = useSearchParams()
  const variants = productData.variants

  const sku = searchParams.get('sku')
  let properVariant = variants[0]
  if (sku && variants.length > 1) {
    properVariant = variants.find(vr => vr.sku === sku)
  }

  const [selectedVariant, setSelectedVariant] = React.useState(properVariant)
  const [snackBarDetails, setSnackBarDetails] = React.useState({
    open: false,
    message: '',
  })

  React.useEffect(() => {
    if (error) {
      setSnackBarDetails({open: true, message: error.split(':')[1]})
    }
  }, [error])

  React.useEffect(() => {}, [])

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
        <meta content={productData.plain_description} name="description" />
        <meta content="product" name="twitter:card" />
        <meta
          content={productData.plain_description}
          name="twitter:description"
        />
        <meta
          content={selectedVariant.image_list[0].resized}
          property="og:image"
        />
        <meta
          content={selectedVariant.image_list[0].resized}
          name="twitter:image"
        />
        <meta content={selectedVariant.price} property="og:price:amount" />
        <meta content="GBP" property="og:price:currency" />
      </Head>
      <Box
        sx={{
          padding: {xs: 6, sm: 12},
        }}
      >
        <ProductBreadCrumb product={productData} style={{marginBottom: 20}} />
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
          <ProductImageSlider selectedVariant={selectedVariant} />
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
        error={error}
        product={productData}
        reviewData={reviewData}
        slug={slug}
      />
      <Snackbar autoHideDuration={6000} open={snackBarDetails.open}>
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
  const productResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    const paginatedUrl = url + `?page=${pageNumber}`
    const res = await fetch(paginatedUrl)
    const products = await res.json()
    productResult.push(products.results)
  }

  return productResult
}

export async function getStaticPaths() {
  const baseUrl = data.apiUrl
  const url = baseUrl + 'products/product/'
  const res = await fetch(url)
  const products = await res.json()
  const pageCount = Math.ceil(products.count / 10)
  const productResult = await getAllPages(pageCount, url)
  const slugPaths = []

  for (let i = 0; i < productResult.length; i++) {
    const slugs = productResult[i].map(item => {
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
