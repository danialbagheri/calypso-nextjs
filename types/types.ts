export type ImageListTypes = {
  alternate_text: string
  height: number | string
  id: number | string
  image: string
  image_angle: string
  image_type: string
  main: boolean
  name: string
  resized: string
  updated: string
  variant: number | string
  webp: string
  width: number | string
}

export type FAQTypes = {
  answer: string
  category: string
  id: number | string
  public: boolean
  question: string
}[]

export type TagsTypes = {
  icon: string
  id: string | number
  name: string
  slug: string
  svg_icon: string
}[]

export type VariantsTypes = {
  ASIN: string
  barcode: string
  claims: string
  compare_at_price: null | string | number
  date_first_available: null | string
  date_last_modified: string
  discontinued: boolean
  euro_compare_at_price: null | string | number
  euro_price: string
  graphql_id: string
  id: number | string
  image_list: ImageListTypes[]
  ingredients: string[]
  instagram_posts: string[]
  inventory_quantity: number | string
  is_public: boolean
  name: string
  position: number | string
  price: string
  price_per_100ml: string
  product: number | string
  rrp: null | string
  shopify_rest_variant_id: string
  shopify_storefront_variant_id: string
  size: string
  sku: string
  where_to_buy: {
    id: number | string
    stockist: {
      id: number | string
      name: string
      logo: string
    }
    url: string
  }[]
}[]

export type ProductsTypes = {
  collection_names: string[]
  description: string
  direction_of_use: string

  faq_list: FAQTypes
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
  tags: TagsTypes
  total_review_count: string | number
  types: string[]
  updated: string
  variants: VariantsTypes
}
