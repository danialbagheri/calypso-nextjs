/* ---------------------------- NextJs Component ---------------------------- */
import Link from 'next/link'
/* -------------------------------------------------------------------------- */

/* ------------------------------ MUI Component ----------------------------- */
import Breadcrumbs from '@mui/material/Breadcrumbs'
/* -------------------------------------------------------------------------- */

const ProductBreadCrumb = props => {
  const {product} = props

  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: 'Products', url: '/products/'},
    {
      name: product.types[0],
      url: `/products/?category=${encodeURIComponent(product.types[0])}`,
    },
    {name: product.slug, url: `/products/${product.slug}`},
  ]

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        '& a': {
          textDecoration: 'none',
        },
        '& a:hover': {color: '#ec6b1d'},
        '&>ol li:last-child': {fontWeight: 'bold'},
      }}
      {...props}
    >
      {breadCrumbPath.map((path, i) => (
        <Link href={path.url} key={i}>
          {path.name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}

export default ProductBreadCrumb
