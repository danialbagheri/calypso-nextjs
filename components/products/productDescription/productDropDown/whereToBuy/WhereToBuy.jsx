import React from 'react'

export default class WhereToBuy extends React.Component {
  render() {
    const {stores, childProducts} = this.props

    let thisProductStore
    if (stores.length >= 1) {
      thisProductStore = stores.map((store, index) => {
        return (
          <li key={index}>
            <a href={store.url} rel="noopener noreferrer" target="_blank">
              <img alt={store.stockist.name} src={store.stockist.logo} />
            </a>
          </li>
        )
      })
    } else {
      thisProductStore = <li>All good pharmacies.</li>
    }

    const products = <p>{childProducts} is available from:</p>

    return (
      <div>
        <div>{products}</div>
        <ul className="stores" style={{marginTop: -5}}>
          {thisProductStore}
        </ul>
      </div>
    )
  }
}
