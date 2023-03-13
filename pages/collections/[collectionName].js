import * as React from 'react'

import BreadCrumb from '../../components/common/breadcrumb'
import ProductRangeItem from '../../components/products/product-range/ProductRangeItem'
import HomeSlider from '../../components/home/home-slider'
//Services
import {getCollection} from 'services'

export default function CollectionName(props) {
  const {collection} = props
  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: 'Collections', url: '/collections/'},
    {name: collection.name, url: `/${collection.slug}/`},
    ``,
  ]
  const collectionItems = collection.items.map((item, index) => {
    return <ProductRangeItem product={item.item} key={index} />
  })

  return (
    <div>
      {collection.slider && collection.slider.slides > 1 ? <HomeSlider slides={collection.slider.slides} /> : null}
      <div className="container">
        <div style={{padding: 10}}>
          <BreadCrumb breadcrumbs={breadCrumbPath} />
          {collectionItems}
        </div>
      </div>
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

  return {
    props: {
      collection: collection.status === 404 ? null : collection,
    }, // will be passed to the page component as props
  }
}
