import react from 'react'
import _ from 'lodash'
import {useShopify} from '../../hooks'
import Classlist from './add-to-basket.module.css'

export default function AddToBasketWithDropDown(props) {
  const {addVariant, checkoutState, openCart, fetchProductByQuery} = useShopify()
  const {activeVariant, setActiveVariant, customContainerStyle} = props
  const variants = props.product.variants
  const [layoutType, setLayoutType] = react.useState('default')
  const inStock = (variant = false) => {
    if (!variant) {
      if (activeVariant.inventory_quantity > 0) {
        return true
      } else {
        return false
      }
    } else {
      if (variant.inventory_quantity > 0) {
        return true
      } else {
        return false
      }
    }
  }

  function handleChange(item) {
    setActiveVariant(item)
  }
  function handleselectChange(e) {
    const selected = _.find(variants, variant => {
      if (variant.id === parseInt(e.target.value)) {
        return variant
      }
    })
    setActiveVariant(selected)
  }

  const varinatOptions = variants.map(variant => (
    <option key={variant.id} value={variant.id}>
      {variant.name}
    </option>
  ))

  const spfVarinatOptions = variants.map(variant => (
    <div
      key={variant.id}
      value={variant.id}
      className={`${Classlist.spfCircle} ${variant.id === activeVariant.id && Classlist.spfSelected} ${variant.id}-${
        activeVariant.id
      } ${!inStock(variant) && Classlist.outOfStock}`}
      onClick={() => handleChange(variant)}
    >
      {variant.name.replace('SPF', '')}
    </div>
  ))

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
  }

  react.useEffect(() => {
    const varinatNameContainsSPFArray = _.map(props.product.variants, variant => {
      if (variant.name.startsWith('SPF')) {
        return true
      } else {
        return false
      }
    })
    const varinatNameContainsSPF = _.every(varinatNameContainsSPFArray)

    if (varinatNameContainsSPF) {
      setLayoutType('SPF')
    }
  }, [])

  return (
    <div className={customContainerStyle || Classlist.Container}>
      {layoutType === 'default' ? (
        <>
          {variants.length > 1 ? (
            <>
              <div className="select-wrapper"></div>
              <select name="variants" style={divStyle.dropdown} onChange={v => handleselectChange(v)}>
                {varinatOptions}
              </select>
            </>
          ) : (
            <div style={divStyle.singleVarinat}>{variants[0].name}</div>
          )}
        </>
      ) : (
        <div style={divStyle.spfContainer}>{spfVarinatOptions}</div>
      )}

      <button
        className={`${Classlist.addToCartButton} ${!inStock() && Classlist.buttonOutOfStock}`}
        style={divStyle.button}
        onClick={() => {
          addToBasket(activeVariant.shopify_storefront_variant_id, 1)
        }}
        disabled={!inStock()}
      >
        {inStock() ? 'ADD TO CART' : 'OUT OF STOCK'}
      </button>
    </div>
  )
}

const divStyle = {
  singleVarinat: {
    marginBottom: '1rem',
  },
  dropdown: {
    width: '100%',
    marginBottom: '2rem',
    padding: '0 13px',
    borderRadius: '3rem',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    overflowX: 'hidden',
    transition: 'all 0.15s linear 0s',
    height: '35px',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: 'Apercu Pro, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif',
    appearance: 'none',
  },
  spfContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
}
