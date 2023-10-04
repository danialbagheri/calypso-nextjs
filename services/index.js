import {get, nextPost, patch, post} from 'utils'

/* ------------------------------ POST Requests ----------------------------- */

const postContactUsSubmit = data => {
  return post({endpoint: 'web/contact-us/', data})
}

const postProductReview = (data, slug) => {
  return post({endpoint: `reviews/product/${slug}/add/`, data})
}

const postReviewImage = image_base64 => {
  return post({endpoint: 'reviews/images/', data: {image_base64}})
}

const postOutOfStockEmail = data => {
  return post({endpoint: 'users/stock-reports/', data})
}

const postSurveys = data => {
  return post({endpoint: 'surveys/submit/', data})
}
/* -------------------------------------------------------------------------- */

/* ------------------------------ GET Requests ------------------------------ */
const getCollectionBanner = slug => {
  return get({endpoint: `web/slider/?slug=${slug}`})
}

const getCollection = collection => {
  return get({endpoint: `products/collections/${collection}/`})
}

const getTrendingUrls = () => {
  return get({endpoint: 'products/collections/trending/?resize_w=580'})
}

const getBestSellerResults = () => {
  return get({endpoint: 'products/collections/best_seller/'})
}

const getSearchData = params => {
  return get({endpoint: `web/search/?q=${params}`})
}

const getProductData = slug => {
  return get({endpoint: `products/single/${slug}/?resize_w=700`})
}

const getSingleProduct = slug => {
  return get({endpoint: `products/single/${slug}/`})
}
const getSPFFinderQuestions = () => {
  return get({endpoint: 'surveys/spf-finder/'})
}

const getProductReviews = slug => {
  return get({endpoint: `reviews/product/?product_slug=${slug}`})
}

const getBlogs = blog => {
  return get({endpoint: `blogs/collections/${blog}`})
}

const getSpfRecommendations = id => {
  return get({endpoint: `products/variants/spf-recommendations/${id}`})
}

const getInstagramPhotos = () => {
  return get({endpoint: 'web/instagram-feed/'})
}
/* ----------------------------- Patch requests ----------------------------- */
const singleReviewPatch = (id, data) => {
  return patch({endpoint: `reviews/rate/${id}/`, data})
}
/* -------------------------------------------------------------------------- */

/* ------------------------------ Next requests ----------------------------- */
const registerContact = data => {
  return nextPost({endpoint: '/api/mailjet', data})
}
/* -------------------------------------------------------------------------- */

export {
  getCollectionBanner,
  getCollection,
  getSearchData,
  getSingleProduct,
  getProductReviews,
  getBlogs,
  getSPFFinderQuestions,
  getProductData,
  getSpfRecommendations,
  getTrendingUrls,
  getBestSellerResults,
  getInstagramPhotos,
  postContactUsSubmit,
  postProductReview,
  postReviewImage,
  postOutOfStockEmail,
  postSurveys,
  registerContact,
  singleReviewPatch,
}
