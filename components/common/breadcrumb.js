import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export default function BreadCrumb(props) {
  const {breadcrumbs} = props
  function handleClick(event) {
    event.preventDefault()
  }
  const children = breadcrumbs.map((child, index) => {
    return (
      <Link
        color="inherit"
        href={child.url}
        key={index}
        typeof="WebPage"
        underline="hover"
      >
        <span property="name">{child.name}</span>
      </Link>
    )
  })
  return (
    <div onClick={handleClick} role="presentation" style={{margin: '10px'}}>
      <Breadcrumbs aria-label="breadcrumb" typeof="BreadcrumbList">
        {children}
      </Breadcrumbs>
    </div>
  )
}
