import {combineReducers} from 'redux'
import cart from './shopify'

export default combineReducers({
  shopify: cart,
})
