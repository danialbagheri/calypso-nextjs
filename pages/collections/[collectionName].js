import {HomeSlider, ProductRange} from 'components'
import {Box, Container} from '@mui/material'
import BreadCrumb from 'components/common/breadcrumb'
import {getCollection, getCollectionBanner} from 'services'
import _ from 'lodash'

export default function CollectionName(props) {
  const {collection} = props
  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: 'Collections', url: '/collections/'},
    {name: collection.name, url: `/${collection.slug}/`},
    '',
  ]
  const collectionProducts = _.map(collection.items, ({item}) => item)

  return (
    <div>
      {collection.slider && collection.slider.slides > 1 ? (
        <HomeSlider slides={collection.slider.slides} />
      ) : null}
      <Container>
        <Box sx={{my: 12}}>
          <BreadCrumb breadcrumbs={breadCrumbPath} />
          <ProductRange
            banner={props.productFinderBanner}
            limit={15}
            products={collectionProducts}
          />
        </Box>
      </Container>
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export async function getStaticProps(context) {
  const {collectionName} = context.params

  const collection = await getCollection(collectionName)
  const productFinderBannerResult = await getCollectionBanner('product-finder')
  const productFinderBanner =
    productFinderBannerResult?.results[0]?.slides ?? []

  return {
    props: {
      collection: collection.status === 404 ? null : collection,
      productFinderBanner,
    }, // will be passed to the page component as props
    revalidate: 120,
  }
}
