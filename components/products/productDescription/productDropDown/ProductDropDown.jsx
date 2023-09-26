import Box from '@mui/material/Box'

import {WhereToBuy} from './whereToBuy'

import DropDown from './DropDown'
import ShippingAndReturn from './shippingAndReturn/ShippingAndReturn'

export default function ProductDropDown(props) {
  const {selectedVariant} = props
  return (
    <Box>
      <DropDown title="Where to Buy">
        <WhereToBuy
          childProducts={selectedVariant.name}
          stores={selectedVariant.where_to_buy}
        />
      </DropDown>
      <DropDown title="Shipping & Return Policy">
        <ShippingAndReturn />
      </DropDown>
    </Box>
  )
}
