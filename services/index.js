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
/* -------------------------------------------------------------------------- */

/* ------------------------------ GET Requests ------------------------------ */
const getCollectionBanner = slug => {
  return get({endpoint: `web/slider/?slug=${slug}`})
}

const getCollection = collection => {
  return get({endpoint: `products/collections/${collection}/`})
}

const getSearchData = params => {
  return get({endpoint: `web/search/?q=${params}`})
}

const getSingleProduct = slug => {
  return get({endpoint: `products/single/${slug}/`})
}

const getProductData = slug => {
  return get({endpoint: `products/single/${slug}/?resize_w=700`})
}

const getProductReviews = (slug, page = 1) => {
  return get({endpoint: `reviews/product/?product_slug=${slug}&page=${page}`})
}

const getBlogs = blog => {
  return get({endpoint: `blogs/collections/${blog}`})
}

const getSPFFinderQuestions = () => {
  return get({endpoint: 'surveys/spf-finder/'})
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

/* -------------------------------------------------------------------------- */

export {
  postContactUsSubmit,
  postProductReview,
  postReviewImage,
  getCollectionBanner,
  getCollection,
  getSearchData,
  getSingleProduct,
  getProductReviews,
  getBlogs,
  registerContact,
  postOutOfStockEmail,
  getProductData,
  singleReviewPatch,
  getSPFFinderQuestions,
}
