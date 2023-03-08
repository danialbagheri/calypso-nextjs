import React from 'react'
import Link from 'next/link'

export default function FooterMenu(props) {
  const {menuItems, menuHeader} = props

  const menuListItem = menuItems?.map((item, index) => (
    <li key={index}>
      <Link href={item.url}>
        <a>{item.name}</a>
      </Link>
    </li>
  ))
  return (
    <ul className="list-unstyled">
      {menuHeader && <li className="footer-header">{menuHeader}</li>}
      {menuListItem}
    </ul>
  )
}
