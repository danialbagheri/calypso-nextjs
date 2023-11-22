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
/* -------------------------------------------------------------------------- */

/* ------------------------------ GET Requests ------------------------------ */
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

export const getProductReviews = slug => {
  return get({endpoint: `reviews/product/?product_slug=${slug}`})
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

export const getProductsWithPagination = page => {
  return get({endpoint: `products/product/?page=${page}`})
}

export const getMegaMenuProducts = () => {
  return get({
    endpoint: 'products/collections/products-mega-menu/?resize_w=280',
  })
}

export const getIcons = slug => {
  return get({endpoint: `web/icon-groups/${slug}`})
}

export const getInfoBarStatus = () => {
  return get({endpoint: 'web/top-bars/'})
}

export const getTopBarStatus = () => {
  return get({endpoint: 'web/configuration/top_bar/'})
}

export const getRetrieveMenu = () => {
  return get({endpoint: 'web/menus/main'})
}
/* ----------------------------- Patch requests ----------------------------- */
export const singleReviewPatch = (id, data) => {
  return patch({endpoint: `reviews/rate/${id}/`, data})
}
/* -------------------------------------------------------------------------- */

/* ------------------------------ Next requests ----------------------------- */
export const registerContact = data => {
  return nextPost({endpoint: '/api/mailjet', data})
}
/* -------------------------------------------------------------------------- */
