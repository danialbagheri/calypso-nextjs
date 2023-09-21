import * as React from 'react'
import {useShopify} from '../components/hooks'
import Navigation from './common/navigation'
import Cart from './shopify/cart'

// import store from "../redux/store";
export default function Header() {
  const {createShop, createCheckout, fetchProducts} = useShopify()
  //   const { search, showSearch } = useState(false);

  React.useEffect(() => {
    createShop()
    fetchProducts()
    createCheckout()
  }, [])
  return (
    <header>
      <Navigation />
      <Cart />
    </header>
  )
}
