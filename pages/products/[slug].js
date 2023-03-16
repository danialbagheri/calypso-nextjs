import * as React from 'react'
import data from '../../data.json'
import BreadCrumb from '../../components/common/breadcrumb'
import ProductPageImage from '../../components/products/product-page-image'
import ProductDescription from '../../components/products/product-description'
import ProductTabs from '../../components/products/product-tabs'
import Head from 'next/head'
import RelatedProduct from '../../components/products/related-products'
import {useShopify} from 'redux/ducks/shopify'
import ProductSchema from '../../components/seo/product-schema'
import {CustomersReview, Faq} from 'components'
import {getProductReviews} from 'services'
import Snackbar from '@mui/material/Snackbar'
import {Alert} from '@mui/material'

function Product(props) {
  const product = props.productData
  const childProducts = props.productData.variants
  const instagramPosts = product.variants.map(v => v.instagram_posts)

  const [selectedPrice, setPrice] = React.useState(
    props.productData.variants[0].price,
  )

  const [selectedProduct, setSelectedProduct] = React.useState({
    sku: props.productData.variants[0].sku,
  })
  const [selectedChildVariation, setSelectedChildVariation] = React.useState(
    props.productData.variants[0].name,
  )
  const [selectedVariant, setSelectedVariant] = React.useState(
    props.productData.variants[0],
  )
  const [selectedChild, setChild] = React.useState(
    props.productData.variants[0].sku,
  )
  const [stores, setWheretoBuyStores] = React.useState(
    props.productData.variants[0].where_to_buy,
  )
  const [shopifyState, setShopifyState] = React.useState(null)
  const [snackBarDetails, setSnackBarDetails] = React.useState({
    open: false,
    message: '',
  })

  const {fetchProductByQuery} = useShopify()

  const handleChange = e => {
    e.preventDefault()
    const selectedProduct = childProducts.find(
      product => product.sku === e.target.value,
    )
    setSelectedVariant(selectedProduct)
    setPrice(selectedProduct.price)
    setWheretoBuyStores(selectedProduct.where_to_buy)
    setChild(selectedProduct.sku)
    setSelectedChildVariation(selectedProduct.name)
    setSelectedProduct({sku: selectedProduct.sku})
  }

  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: 'Products', url: '/products/'},
    {
      name: product.types[0],
      url: `/products/?category=${encodeURIComponent(product.types[0])}`,
    },
    {name: product.slug, url: `/products/${product.slug}`},
  ]

  let child = null

  if (childProducts.length === 1) {
    child = childProducts.map((child, index) => {
      return <p key={index}>{child.name}</p>
    })
  } else {
    let options = childProducts.map((child, index) => {
      return (
        <option value={child.sku} key={index}>
          {child.name}
          {'    '}
          {child.size}
        </option>
      )
    })
    child = (
      <select className="ProductOptionSelector" onChange={e => handleChange(e)}>
        {options}
      </select>
    )
  }

  const productDescription = (
    <ProductDescription
      // clean from here
      shopifyState={shopifyState}
      child={child}
      product={product}
      selectedVariant={selectedVariant}
    />
  )

  React.useEffect(() => {
    if (props.error) {
      setSnackBarDetails({open: true, message: props.error.split(':')[1]})
    }
  }, [props.error])

  return (
    <div>
      <ProductSchema product={product} selected={selectedProduct} />
      <Head>
        <title>
          Calypso - {product.name} - {product.sub_title}
        </title>
        <meta name="description" content={product.plain_description} />
        <meta name="twitter:card" content="product" />
        <meta name="twitter:description" content={product.plain_description} />
        <meta
          property="og:image"
          content={selectedVariant.image_list[0].resized}
        />
        <meta
          name="twitter:image"
          content={selectedVariant.image_list[0].resized}
        />
        <meta property="og:price:amount" content={selectedPrice} />
        <meta property="og:price:currency" content="GBP" />
      </Head>
      <div className="container-fluid">
        <div className="row productContainer">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <BreadCrumb breadcrumbs={breadCrumbPath} />
            <ProductPageImage selectedVariant={selectedVariant} />
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            {productDescription}
          </div>
        </div>
      </div>
      <section className="row product-second-row">
        <div className="container">
          <ProductTabs
            benefits={product.tags}
            ingredients={product.ingredients}
            stores={stores}
            childProducts={selectedChildVariation}
            selectedChild={selectedChild}
          />
        </div>
      </section>
      <Faq {...product.faq_list} />

      <RelatedProduct related={product.related_products} />
      <div id="readReviews" />
      <CustomersReview
        product={product}
        slug={props.slug}
        reviewData={props.reviewData}
        error={props.error}
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
