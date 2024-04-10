export type ImageListTypes = {
  id: number | string
  name: string
  updated: string
  image: string
  image_type: 'PI' | 'LS'
  //TODO: Create proper types for image_angle
  image_angle: string
  alternate_text: string
  height: number
  width: number
  main: boolean
  secondary: boolean
  resized: string
  webp: string
}

export type WhereToBuyTypes = {
  id: number
  url: string
  stockist: {
    id: number
    name: string
    logo: string
  }
}

export type VariantType = {
  id: number
  image_list: ImageListTypes[]
  where_to_buy: WhereToBuyTypes[]
  price_per_100ml: string
  instagram_posts: string[]
  price: string
  compare_at_price: null | string
  euro_price: string
  euro_compare_at_price: null | string
  ingredients: string[]
  is_favorite: boolean
  product_slug: string
  product_name: string
  sku: string
  ASIN: string
  name: string
  shopify_rest_variant_id: string
  graphql_id: string
  shopify_storefront_variant_id: null | string
  barcode: string
  date_first_available: null | string
  date_last_modified: string
  claims: string
  discontinued: boolean
  size: string
  rrp: null | string
  inventory_quantity: number
  is_public: boolean
  position: number
  product: number
}

export type FaqTypes = {
  id: number
  question: string
  answer: string
  public: boolean
  category: string
}

export type TagTypes = {
  id: number
  icon: string
  svg_icon: string
  name: string
  slug: string
}

export type AnswerChoicesTypes = 'YES' | 'NO'

export type QuestionTypes = {
  answer_choices: AnswerChoicesTypes[]
  id: number
  is_multiple_choice_question: boolean
  text: string
}

export type ReviewTypes = {
  id: number
  //TODO: Create proper types for reply
  reply: string[]
  name: string
  approved: boolean
  helpful: number
  //TODO: Create proper types for images
  images: string[]
  customer_name: string
  location: string
  source: string
  score: number
  recommended: boolean
  title: string
  comment: string
  date_created: string
  like: number
  dislike: number
  opened: boolean
  product: number
  variant: number
  //TODO: Create proper types for user
  user: null | string
}

export type RelatedProductTypes = {
  name: string
  slug: string
  sub_title: string
  main_image: string
  secondary_image: string
  img_height: string
  img_width: string
  secondary_image_height: number
  secondary_image_width: number
  total_review_count: number
  review_average_score: string
  starting_price: string
  variants: VariantType[]
}

export type KeywordTypes = {
  id: number
  name: string
}

export type ScoreChartTypes = {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
}

export type SlideType = {
  id: number
  name: string
  xl_image: string
  lg_image: string
  md_image: string
  sm_image: string
  xs_image: string
  video: null | string
  image_alt_text: string
  active: boolean
  custom_slide: boolean
  custom_code: string
  link: string
}

export type SlidesType = {
  id: number
  xl_image: string
  lg_image: string
  md_image: string
  sm_image: string
  xs_image: string
  desktop_resized: string
  desktop_webp: string
  mobile_webp: string
  image_png: null | string
  image_webp: null | string
  order: number
  slider: {
    id: number
    name: string
    slug: string
    slides: SlideType[]
  }
  slide: SlideType
}

export type SliderType = {
  id: number
  slider_slides: SlidesType[]
  name: string
  slug: string
  slides: SlidesType[]
}

export type FaqType = {
  answer: string
  category: string
  id: number
  public: boolean
  question: string
}

export type ProductsTypes = {
  collection_names: string[]
  description: string
  direction_of_use: string

  faq_list: FaqType[]
  graphql_id: string
  id: number
  is_favorite: boolean
  is_public: boolean
  keyword: (string | number)[]
  legacy_id: number
  lowest_variant_price: string
  main_image: string
  main_image_resized: string
  main_image_webp: string
  name: string
  plain_description: string
  review_average_score: string
  secondary_image: string
  secondary_image_resized: string
  secondary_image_webp: string
  slug: string
  sub_title: string
  tags: TagTypes[]
  total_review_count: string | number
  types: string[]
  updated: string
  variants: VariantType[]
}
