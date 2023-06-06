import * as React from 'react'
import data from '../../data.json'
import BreadCrumb from '../../components/common/breadcrumb'
import ProductPageImage from '../../components/products/product-page-image'
import ProductTabs from '../../components/products/product-tabs'
import Head from 'next/head'
import RelatedProduct from '../../components/products/related-products'
import ProductSchema from '../../components/seo/product-schema'
import {CustomersReview, Faq, ProductDescription} from 'components'
import {getProductReviews} from 'services'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

function Product(props) {
  const {productData, reviewData, slug, error} = props

  const variants = productData.variants

  const [variant, setVariant] = React.useState(variants[0])
  const [snackBarDetails, setSnackBarDetails] = React.useState({
    open: false,
    message: '',
  })

  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: 'Products', url: '/products/'},
    {
      name: productData.types[0],
      url: `/products/?category=${encodeURIComponent(productData.types[0])}`,
    },
    {name: productData.slug, url: `/products/${productData.slug}`},
  ]

  React.useEffect(() => {
    if (error) {
      setSnackBarDetails({open: true, message: error.split(':')[1]})
    }
  }, [error])

  return (
    <div>
      <ProductSchema product={productData} selected={{sku: variant.sku}} />
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
        <meta property="og:image" content={variant.image_list[0].resized} />
        <meta name="twitter:image" content={variant.image_list[0].resized} />
        <meta property="og:price:amount" content={variant.price} />
        <meta property="og:price:currency" content="GBP" />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <BreadCrumb breadcrumbs={breadCrumbPath} />
            <ProductPageImage selectedVariant={variant} />
          </div>
          <ProductDescription
            product={productData}
            selectedVariant={variant}
            setVariant={setVariant}
          />
        </div>
      </div>
      <div className="row product-second-row">
        <div className="container">
          <ProductTabs
            benefits={productData.tags}
            ingredients={productData.ingredients}
            stores={variant.where_to_buy}
            childProducts={variant.name}
            selectedChild={variant.sku}
          />
        </div>
      </div>
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
  const baseUrl = data.apiUrl
  const url = baseUrl + `products/single/${slug}/?resize_w=700`
  const res = await fetch(url)
  let error = null
  const productData = await res.json()
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
