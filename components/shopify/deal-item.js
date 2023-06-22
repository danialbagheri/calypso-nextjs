import {useEffect, useState} from 'react'
import {useShopify} from '../hooks'

export default function DealItem() {
  const [product, setProduct] = useState(null)
  const [isLoaded, setLoaded] = useState(false)
  const {fetchProductByQuery, addVariant, checkoutState} = useShopify()

  useEffect(() => {
    const query = {
      query: 'product:[id:6783989088393]',
    }

    const f = fetchProductByQuery(query)
    f.then(f => {
      setProduct(f[0])
      setLoaded(true)
    })
  }, [])

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
  }
  return (
    <div>
      {isLoaded && (
        <div
          className="deal_item_parent_container"
          onClick={() => addToBasket(product.variants[0].id, 1)}
        >
          <div className="deal_item_container">
            <div className="deal_item_image">
              {product.images[0] ? (
                <img
                  alt={`${product.title} product shot`}
                  src={product.images[0].src}
                />
              ) : null}
            </div>
            <div className="deal_item_content">
              <div className="deal_item_title">{product.title}</div>
              <div className="deal_item_rrp">£5.40</div>
              <div className="deal_item_offer">
                £{product.variants[0].price}
              </div>
              {/* <div>{product.id}</div> */}
            </div>
          </div>
          <div className="deal_item_click">
            <p>+ ADD</p>
          </div>
        </div>
      )}
    </div>
  )
}
