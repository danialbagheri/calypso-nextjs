import * as React from 'react'

import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

function Breadcrumb() {
  const [productDetail, setProductDetail] = React.useState({
    slug: '',
    productName: '',
  })

  const capitalizeHandler = text => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const productNameHandler = slug => {
    const slugArr = slug.split('-')
    const newFirstWord = capitalizeHandler(slugArr[0])
    slugArr[0] = newFirstWord
    return slugArr.join(' ')
  }

  React.useEffect(() => {
    const slug = window.location.search.split('=')[1]
    const productName = productNameHandler(slug)
    setProductDetail({slug, productName})
  }, [])
  return (
    <Box sx={{marginTop: 5}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link
          color="inherit"
          href={`/products/${productDetail.slug}`}
          underline="hover"
        >
          {productDetail.productName}
        </Link>
        <Link
          aria-current="page"
          color="text.primary"
          href={`/products/write-review?slug=${productDetail.slug}`}
          underline="hover"
        >
          Write review
        </Link>
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb
