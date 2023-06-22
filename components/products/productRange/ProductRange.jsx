import {Box, CircularProgress} from '@mui/material'
import {ProductRangeItem} from '.'

export default function ProductRange(props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 220px))',
        gridTemplateRows: 'auto',
        rowGap: 4,
        columnGap: 3,
        justifyContent: 'center',
      }}
    >
      {props.products.length < 1 ? (
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {props.products.slice(0, props.limit).map(product => (
            <ProductRangeItem key={product.id} product={product} />
          ))}
        </>
      )}
    </Box>
  )
}
