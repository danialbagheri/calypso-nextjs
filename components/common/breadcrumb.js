import React from 'react'
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
        underline="hover"
        color="inherit"
        typeof="WebPage"
        href={child.url}
        key={index}
      >
        <span property="name">{child.name}</span>
      </Link>
    )
  })
  return (
    <div role="presentation" onClick={handleClick} style={{margin: '10px'}}>
      <Breadcrumbs aria-label="breadcrumb" typeof="BreadcrumbList">
        {children}
      </Breadcrumbs>
    </div>
  )
}
