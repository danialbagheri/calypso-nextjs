import React from "react";
import MegaMenuStyle from "../../styles/homepage/megaMenu.module.css";
import Link from "next/link";

function MegaMenuItem(props) {
  const { items } = props;
  const megaMenuItem = items.map((item) => {
    return (
      <Link
        href={`/products?limit=41&category=${encodeURIComponent(
          item.item.types[0]
        )}`}
      >
        <a key={item.item.id} className={MegaMenuStyle.MegaMenuItem}>
          <div className={MegaMenuStyle.MegaMenuItemimage}>
            <img src={item.item.main_image} alt="" />
          </div>
          <p>{item.item.types[0]}</p>
        </a>
      </Link>
    );
  });
  return megaMenuItem;
}

export default function MegaMenu(props) {
  const { products } = props;
  return (
    <div className={MegaMenuStyle.MegaMenuContainer}>
      <div className={MegaMenuStyle.MegaMenuItems}>
        <MegaMenuItem items={products} />
      </div>
      <div className={MegaMenuStyle.MegaMenuShopAll}>
        <a href="/products">Shop All</a>
      </div>
    </div>
  );
}
