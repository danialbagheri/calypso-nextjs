// Shopify actions
import {
  CLIENT_CREATED,
  CHECKOUT_FOUND,
  SHOP_FOUND,
  ADD_VARIANT_TO_CART,
  UPDATE_QUANTITY_IN_CART,
  REMOVE_LINE_ITEM_IN_CART,
  OPEN_CART,
  CLOSE_CART,
  OPEN_CHECKOUT,
} from '../actions/types'
// initial state
const shopify = {
  isCartOpen: false,
  checkout: {lineItems: []},
  shop: {},
  checkoutPage: {},
}
export default function shopifyDuck(state = shopify, action) {
  switch (action.type) {
    case CLIENT_CREATED:
      return {...state, client: action.payload}
    case CHECKOUT_FOUND:
      return {...state, checkout: action.payload}
    case SHOP_FOUND:
      return {...state, shop: action.payload}
    case ADD_VARIANT_TO_CART:
      return {
        ...state,
        isCartOpen: true,
        checkout: action.payload,
      }
    case UPDATE_QUANTITY_IN_CART:
      return {...state, checkout: action.payload.checkout}
    case REMOVE_LINE_ITEM_IN_CART:
      return {...state, checkout: action.payload.checkout}
    case OPEN_CART:
      return {...state, isCartOpen: true}
    case CLOSE_CART:
      return {...state, isCartOpen: false}
    case OPEN_CHECKOUT:
      return {...state, checkout: action.payload}
    default:
      return state
  }
}
