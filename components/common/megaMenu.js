import React from "react";
import MegaMenuStyle from "../../styles/homepage/megaMenu.module.css";

function MegaMenuItem(props) {
  const { items } = props;
  const megaMenuItem = items.map((item) => {
    return (
      <a
        key={item.item.id}
        className={MegaMenuStyle.MegaMenuItem}
        href={`/products?limit=41&category=${encodeURIComponent(
          item.item.types[0]
        )}`}
      >
        <div className={MegaMenuStyle.MegaMenuItemimage}>
          <img src={item.item.main_image} alt="" />
        </div>
        <p>{item.item.types[0]}</p>
      </a>
    );
  });
  return megaMenuItem;
}

export default function MegaMenu(props) {
  const { products } = props;

  return (
    <div className={MegaMenuStyle.MegaMenuContainer}>
      <div className={MegaMenuStyle.MegaMenuItems}>
        <MegaMenuItem items={products.items} />
      </div>
      <div className={MegaMenuStyle.MegaMenuShopAll}>
        <a href="/products">Shop All</a>
      </div>
    </div>
  );
}
