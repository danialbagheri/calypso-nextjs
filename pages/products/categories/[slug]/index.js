import {useContext, useEffect} from 'react'

import 'react-tabs/style/react-tabs.css'
import Head from 'next/head'
import {AppContext, ProductRange} from 'components'

import {useRouter} from 'next/router'
import {Box, Typography} from '@mui/material'

import {
  getCollectionBanner,
  getListOfProductsType,
  getProductsByCategory,
} from 'services'
import {useAuthFetch} from 'components/customHooks'
import {getFavoriteVariantsHandler} from 'utils'

const LG_IMAGE = 'lg_image'
const MD_IMAGE = 'md_image'
const MOBILE_IMAGE = 'mobile_webp'

function Category(props) {
  const [appState, setAppState] = useContext(AppContext)
  const authFetchHandler = useAuthFetch()
  const router = useRouter()

  const productFinderBannerSrc = {
    lg: props.productFinderBanner[0]?.[LG_IMAGE],
    md: props.productFinderBanner[0]?.[MD_IMAGE],
    mobile: props.productFinderBanner[0]?.[MOBILE_IMAGE],
  }

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
              banner={productFinderBannerSrc}
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

async function getAllPages({pageCount, category}) {
  let pageNumber = 1
  const productResult = []
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

  const productResult = await getAllPages({pageCount, category})

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
