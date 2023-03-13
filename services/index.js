import {get, post, patch} from 'utils'

const postContactUsSubmit = data => {
  return post({endpoint: 'web/contact-us/', data})
}

const postProductReview = (data, slug) => {
  return post({endpoint: `reviews/product/${slug}/add/`, data})
}

const postReviewImage = image_base64 => {
  return post({endpoint: 'reviews/images/', data: {image_base64}})
}

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

const getProductReviews = slug => {
  return get({endpoint: `reviews/product/?product_slug=${slug}`})
}

const patchReviewRate = () => {}

export {
  postContactUsSubmit,
  postProductReview,
  postReviewImage,
  getCollectionBanner,
  getCollection,
  getSearchData,
  getSingleProduct,
  getProductReviews,
}
