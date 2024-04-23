import {get, nextPost, patch, post} from 'utils'

/* ------------------------------ POST Requests ----------------------------- */

export const postContactUsSubmit = data => {
  return post({endpoint: 'web/contact-us/', data})
}

export const postProductReview = (data, slug) => {
  return post({endpoint: `reviews/product/${slug}/add/`, data})
}

export const postReviewImage = image_base64 => {
  return post({endpoint: 'reviews/images/', data: {image_base64}})
}

export const postOutOfStockEmail = data => {
  return post({endpoint: 'users/stock-reports/', data})
}

export const postSurveys = data => {
  return post({endpoint: 'surveys/submit/', data})
}

export const userSubscription = data => {
  return post({endpoint: 'users/subscribe/mailjet/', data})
}

//USER

export const postCreateUser = data => {
  return post({endpoint: 'users/', data})
}

export const postUserSignIn = ({data, keepSignedIn = false}) => {
  return post({
    endpoint: `users/token/?keep_logged_in=${keepSignedIn ? 'True' : 'False'}`,
    data,
  })
}

export const postRefreshToken = data => {
  return post({endpoint: 'users/token/refresh/', data})
}

export const postVerificationCookie = () => {
  return post({endpoint: 'users/cookie/verify/'})
}

export const postSetPassword = ({data, token}) => {
  return post({endpoint: 'users/set_password/', data, token})
}

export const postUserActivation = data => {
  return post({endpoint: 'users/activation/', data})
}

export const postResendActivation = data => {
  return post({endpoint: 'users/resend_activation/', data})
}

export const postResetPasswordEmail = data => {
  return post({endpoint: 'users/reset_password/', data})
}

export const confirmResetPassword = data => {
  return post({endpoint: 'users/reset_password_confirm/', data})
}

export const postUserSubscriptionInfo = ({data, token}) => {
  return post({endpoint: 'users/validate/mailjet/', data, token})
}

/* -------------------------------------------------------------------------- */

/* ------------------------------ Get Requests ------------------------------ */
export const getCollectionBanner = slug => {
  return get({endpoint: `web/slider/?slug=${slug}`})
}

export const getCollection = collection => {
  return get({endpoint: `products/collections/${collection}/`})
}

export const getTrendingUrls = () => {
  return get({endpoint: 'products/collections/trending/?resize_w=580'})
}

export const getBestSellerResults = () => {
  return get({endpoint: 'products/collections/best_seller/'})
}

export const getSearchData = params => {
  return get({endpoint: `web/search/?q=${params}`})
}

export const getProductData = slug => {
  return get({endpoint: `products/single/${slug}/?resize_w=700`})
}

export const getSingleProduct = slug => {
  return get({endpoint: `products/single/${slug}/`})
}
export const getSPFFinderQuestions = () => {
  return get({endpoint: 'surveys/spf-finder/'})
}

export const getProductReviews = (slug, page = 1) => {
  return get({endpoint: `reviews/product/?product_slug=${slug}&page=${page}`})
}

export const getBlogs = blog => {
  return get({endpoint: `blogs/collections/${blog}`})
}

export const getSpfRecommendations = id => {
  return get({endpoint: `products/variants/spf-recommendations/${id}`})
}

export const getInstagramPhotos = () => {
  return get({endpoint: 'web/instagram-feed/'})
}

export const getProducts = () => {
  return get({endpoint: 'products/product/'})
}

export const getProductsByCategory = ({category, page = 1}) => {
  return get({endpoint: `products/product/?type=${category}&page=${page}`})
}

export const getProductsWithPagination = page => {
  return get({endpoint: `products/product/?page=${page}`})
}

export const getListOfProductsType = () => {
  return get({endpoint: 'products/types/'})
}

export const getMegaMenuProducts = () => {
  return get({
    endpoint: 'products/collections/products-mega-menu/?resize_w=280',
  })
}

export const getIcons = slug => {
  return get({endpoint: `web/icon-groups/${slug}`})
}

export const getTopBar = slug => {
  return get({endpoint: `web/top-bars/${slug}`})
}

export const getInfoBarStatus = () => {
  return get({endpoint: 'web/top-bars/main/'})
}

export const getTopBarStatus = () => {
  return get({endpoint: 'web/configuration/top_bar/'})
}

export const getRetrieveMenu = () => {
  return get({endpoint: 'web/menus/main'})
}

export const getFaqs = (page = 1) => {
  return get({endpoint: `faq/?page=${page}`})
}

export const getPrivacyPolicy = () => {
  return get({endpoint: 'page/privacy-policy/'})
}

export const getReturnPolicy = () => {
  return get({endpoint: 'page/returns-policy/'})
}

export const getTermsAndConditions = () => {
  return get({endpoint: 'page/terms-conditions/'})
}

//USER
export const getUserAddresses = token => {
  return get({endpoint: 'users/addresses/', token})
}

export const getUserInfo = token => {
  return get({endpoint: 'users/me/', token})
}

export const getUserOrders = token => {
  return get({endpoint: 'users/orders/', token})
}

//END USER

export const getFavoriteProducts = token => {
  return get({endpoint: 'products/favorites/', token})
}

export const getFavoriteVariants = token => {
  return get({endpoint: 'products/variants/favorites/', token})
}

/* ----------------------------- Patch requests ----------------------------- */
export const singleReviewPatch = (id, data) => {
  return patch({endpoint: `reviews/rate/${id}/`, data})
}

//User

export const patchUserInfo = (data, token) => {
  return patch({endpoint: 'users/me/', data, token})
}

//END USER

export const addProductToFavorite = (slug, token, action) => {
  return patch({endpoint: `products/favorites/${slug}/`, token, data: {action}})
}

export const favoriteVariantHandler = (sku, token, action) => {
  return patch({
    endpoint: `products/variants/favorites/${sku}/`,
    token,
    data: {action},
  })
}
/* -------------------------------------------------------------------------- */

/* ------------------------------ Next requests ----------------------------- */
export const registerContact = data => {
  return nextPost({endpoint: '/api/mailjet', data})
}
/* -------------------------------------------------------------------------- */
