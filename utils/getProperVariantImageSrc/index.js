export const PRODUCT_IMAGE = 'PI'

export const getProperVariantImageSrc = imageList => {
  // Get images with angle FRONT
  const frontImages = imageList?.filter(image => image.image_angle === 'FRONT')
  // Get the main image from the front images
  const mainImage = frontImages?.find(image => image.main)
  // Check if the main image is a product image
  const isMainImagePI = mainImage?.image_type === PRODUCT_IMAGE

  if (mainImage && isMainImagePI) {
    return mainImage.image
  }

  const piImage = imageList?.find(image => image?.image_type === PRODUCT_IMAGE)

  if (piImage) {
    return piImage?.image || ''
  }

  return frontImages?.[0]?.image
}
