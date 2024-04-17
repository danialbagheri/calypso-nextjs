import {ProductFinderBanner} from 'types'

export const productFinderBannerSrcHandler = (
  banner: ProductFinderBanner[],
) => {
  return {
    lg: banner[0]?.lg_image,
    md: banner[0]?.md_image,
    mobile: banner[0]?.mobile_webp,
  }
}
