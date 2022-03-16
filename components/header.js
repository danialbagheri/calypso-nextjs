import React, { useState, useEffect } from "react";
import { useShopify } from "../components/hooks";
import Navigation from "./common/navigation";
import Cart from "./shopify/cart";

// import store from "../redux/store";
export default function Header() {
  const { createShop, createCheckout, fetchProducts } = useShopify();
  //   const { search, showSearch } = useState(false);

  useEffect(() => {
    createShop();
    fetchProducts();
    createCheckout();
  }, []);
  return (
    <header>
      <Navigation />
      <Cart />
    </header>
  );
}
