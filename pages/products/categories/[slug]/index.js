import 'react-tabs/style/react-tabs.css'
import Head from 'next/head'
import {ProductRange} from 'components'

import {Box, Typography} from '@mui/material'

import {
  getCollectionBanner,
  getListOfProductsType,
  getProductsByCategory,
} from 'services'

function Category(props) {
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
              category={props.category}
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

export const getStaticPaths = async () => {
  try {
    const types = await getListOfProductsType()
    const paths = []

    types.forEach(type => {
      if (type?.slug) {
        paths.push({params: {slug: type.slug}})
      }
    })

    return {
      paths, //indicates that no page needs be created at build time
      fallback: 'blocking', //indicates the type of fallback
    }
  } catch (err) {
    console.error(err)
    return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking', //indicates the type of fallback
    }
  }
}

async function getAllPages({pageCount, category, firstPageProducts}) {
  let pageNumber = 2
  const productResult = [...firstPageProducts]
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    const product = await getProductsByCategory({category, page: pageNumber})
    productResult.push(product.results)
  }
  return productResult
}

export async function getStaticProps(context) {
  const category = context.params.slug
  const products = await getProductsByCategory({category})

  const pageCount = Math.ceil(products.count / 10)

  const productResult = await getAllPages({
    pageCount,
    category,
    firstPageProducts: products.results,
  })

  const productFinderBannerResult = await getCollectionBanner('product-finder')
  const videoBanner = await getCollectionBanner(category)

  const productFinderBanner =
    productFinderBannerResult?.results[0]?.slides ?? []

  return {
    props: {
      products: productResult?.flat() ?? [],
      productFinderBanner,
      videoBanner: videoBanner?.results ?? [],
      category,
    },
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Category
