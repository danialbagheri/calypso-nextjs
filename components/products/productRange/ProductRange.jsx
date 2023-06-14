import {Box, CircularProgress} from '@mui/material'
import {ProductRangeItem} from '.'

export default function ProductRange(props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridTemplateRows: 'auto',
        rowGap: 9,
        columnGap: 5,
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
          {props.products.slice(0, props.limit).map((product, i) => (
            <ProductRangeItem product={product} key={product.id} />
          ))}
        </>
      )}
    </Box>
  )
}
