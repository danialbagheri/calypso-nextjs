import React from 'react'
import Image from 'next/image'
import MegaMenuStyle from 'styles/homepage/megaMenu.module.css'
import Link from 'next/link'
import Box from '@mui/material/Box'

function MegaMenuItem(props) {
  const {items} = props
  const megaMenuItem = items.map(item => {
    return (
      <Link
        key={item.item.id}
        href={`/products?limit=41&category=${encodeURIComponent(
          item.item.types[0],
        )}`}
        className={MegaMenuStyle.MegaMenuItem}
      >
        <div style={{position: 'relative', width: '88px', height: '100px'}}>
          <Image
            src={item.item.main_image_resized}
            alt={item.item.name}
            fill
            style={{objectFit: 'contain'}}
          />
          {/* <picture>
            <source srcSet={item.item.main_image_webp} type="image/webp" />
            <img src={item.item.main_image_resized} alt={item.item.name} />
          </picture> */}
        </div>
        <p>{item.item.types[0]}</p>
      </Link>
    )
  })
  return megaMenuItem
}

export default function MegaMenu(props) {
  const {products} = props
  return (
    <div className={MegaMenuStyle.MegaMenuContainer}>
      <div className={MegaMenuStyle.MegaMenuItems}>
        <MegaMenuItem items={products} />
      </div>
      <div className={MegaMenuStyle.MegaMenuShopAll}>
        <a href="/products">Shop All</a>
      </div>
    </div>
  )
}
