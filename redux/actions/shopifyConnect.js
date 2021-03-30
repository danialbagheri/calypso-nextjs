import Client from "shopify-buy";
// import store from '../store';
import { useStore } from "../store";
const store = useStore(pageProps.initialReduxState);
const client = Client.buildClient({
  storefrontAccessToken: "26e5b88364c3186a336646aea9e94760",
  domain: "shop.calypsosun.com",
  appId: "6",
});
// buildClient() is synchronous, so we can call all these after!
// export const ShopifyFetchAll = () => dispatch => {
//   client.product.fetchAll().then(res => {
//     dispatch({ type: "PRODUCTS_FOUND", payload: res });
//   });
// };
// const getCheckOutId = () => {
//   var now = new Date()
//   var ShopifyConnect = localStorage.getItem('ShopifyConnect');
//   if (ShopifyConnect === null || ShopifyConnect === "") {
//     createCheckout()
//     return JSON.parse(localStorage.getItem('ShopifyConnect')).cartID
//   } else if (now > JSON.parse(ShopifyConnect).expires){
//     createCheckout()
//     return JSON.parse(localStorage.getItem('ShopifyConnect')).cartID
//   } else{
//     return JSON.parse(ShopifyConnect).cartID
//   }
// }
export const createCheckout = () => (dispatch) => {
  var ShopifyConnect = localStorage.getItem("ShopifyConnect");
  var now = new Date();
  // client.checkout.create().then(res => {
  //   dispatch({ type: "CHECKOUT_FOUND", payload: res });
  // });
  if (ShopifyConnect === null || ShopifyConnect === "") {
    client.checkout.create().then((res) => {
      console.log(res);
      var expirationInMin = 360;
      var expires = new Date(new Date().getTime() + 60000 * expirationInMin);
      var sessionObject = {
        expiresAt: expires,
        cartID: res.id,
      };
      localStorage.setItem("ShopifyConnect", JSON.stringify(sessionObject));
      dispatch({ type: "CHECKOUT_FOUND", payload: res });
    });
  } else if (now > Date.parse(JSON.parse(ShopifyConnect).expiresAt)) {
    localStorage.removeItem("ShopifyConnect");
    client.checkout.create().then((res) => {
      var expirationInMin = 360;
      var expires = new Date(new Date().getTime() + 60000 * expirationInMin);
      var sessionObject = {
        expiresAt: expires,
        cartID: res.id,
      };
      localStorage.setItem("ShopifyConnect", JSON.stringify(sessionObject));
      localStorage.setItem("checkoutId", res.id); // Store the ID in localStorage
      dispatch({ type: "CHECKOUT_FOUND", payload: res });
    });
  } else {
    var cartID = JSON.parse(ShopifyConnect).cartID;
    client.checkout.fetch(cartID).then((res) => {
      dispatch({ type: "CHECKOUT_FOUND", payload: res });
    });
  }
};

export const fetchShopInfo = () => (dispatch) => {
  client.shop.fetchInfo().then((res) => {
    dispatch({ type: "SHOP_FOUND", payload: res });
  });
};

export const createClient = () => (dispatch) => {
  dispatch({ type: "CLIENT_CREATED", payload: client });
};

export const handleCartOpen = () => (dispatch) => {
  dispatch({ type: "OPEN_CART", payload: client });
};

export const handleCartClose = () => (dispatch) => {
  dispatch({ type: "CLOSE_CART", payload: client });
};

export const updateQuantity = (checkoutId, lineItemsToUpdate) => (dispatch) => {
  const cartID = checkoutId;
  client.checkout.updateLineItems(cartID, lineItemsToUpdate).then((res) => {
    dispatch({
      type: "UPDATE_QUANTITY_IN_CART",
      payload: { checkout: res },
    });
  });
};

export const openCheckoutOnClient = () => (dispatch) => {
  const state = store.getState();
  const cartID = state.shopify.checkout.id;
  client.checkout
    .fetch(cartID)
    .then((checkout) => {
      dispatch({ type: "OPEN_CHECKOUT", payload: checkout });
    })
    .catch((e) => console.error(e.message));
};

export const removeLineItem = (checkoutId, lineItemId) => (dispatch) => {
  const cartID = checkoutId;
  client.checkout
    .removeLineItems(cartID, [lineItemId])
    .then((res) => {
      dispatch({
        type: "REMOVE_LINE_ITEM_IN_CART",
        payload: { checkout: res },
      });
    })
    .catch((e) => console.error(`.catch(${e})`));
};

export const addVariantToCart = (lineItemsToAdd) => (dispatch) => {
  const state = store.getState();
  const checkoutId = state.shopify.checkout.id;
  // debugger;
  client.checkout
    .addLineItems(checkoutId, lineItemsToAdd)
    .then((checkout) => {
      console.log(checkout);
      dispatch({ type: "ADD_VARIANT_TO_CART", payload: checkout });
    })
    .catch((e) => console.error(`.catch(${e})`));
};
