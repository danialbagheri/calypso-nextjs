import * as React from 'react'

import {useRouter} from 'next/router'
import Link from 'next/link'

import {AddToBasket} from './addToBasket'

import style from './searchResultElements.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner'

function SearchResultElements({ product }) {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  return (
    <div
      className={`col-lg-4 col-md-4 col-sm-4 col-xs-6  ${style.container}`}
      key={product.id}
      onClick={(e)=>{
        setLoading(true)
        e.preventDefault();
        router.push(`/products/${product.slug}`).then(()=> {
          setLoading(false)
        })
      }}
    >
      {/*<Link href={`/products/${product.slug}`} >*/}
      {/*  <a className="disableLink">*/}
          <div className={`${style.photoContainer} bg_centralize`} style={{backgroundImage:`url(${product.main_image})`}}> </div>
          <div className={`text-centre ${style.productName}`}>
            <span>{product.name}</span>
          </div>
          <div className={`text-centre ${style.productSubTitle}`}>
            <span>{product.sub_title}</span>
          </div>
          <div className={`${style.tagsContainer}`}>
            {product.tags.slice(1, 6).map(tag => <div key={tag.id} className={style.singleTag}>{tag.name}</div>)}
          </div>
        {loading?<div className={style.loadingContainer}>
          <FontAwesomeIcon
            spin
            icon={faSpinner}
            className='calypso-orange-text'
            size={'2x'}
          />
        </div>:null}
          <div>
            <AddToBasket
              variantId={product.variants[0].shopify_storefront_variant_id}
              quantity={1}
            />
          </div>
      {/*  </a>*/}
      {/*</Link>*/}
    </div>
  );
}

export default SearchResultElements;
