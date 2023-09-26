import React from 'react'
import Box from '@mui/material/Box'
export default class WhereToBuy extends React.Component {
  render() {
    const {stores, childProducts} = this.props

    let thisProductStore
    if (stores.length >= 1) {
      thisProductStore = stores.map((store, index) => {
        if (store.stockist.name === 'Amazon') {
          return null
        }
        return (
          <Box key={index}>
            <a href={store.url} rel="noopener noreferrer" target="_blank">
              <img
                alt={store.stockist.name}
                src={store.stockist.logo}
                width={'100px'}
              />
            </a>
          </Box>
        )
      })
    } else {
      thisProductStore = <li>All good pharmacies.</li>
    }

    const products = <p>{childProducts} is available from:</p>

    return (
      <div>
        <div>{products}</div>
        <Box sx={{display: 'flex', my: 5, gap: 2, flexWrap: 'wrap'}}>
          {thisProductStore}
        </Box>
      </div>
    )
  }
}
