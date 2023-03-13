import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import {useTheme} from '@mui/material'
import {getSingleProduct} from 'services'

function Variants(props) {
  const [product, setProduct] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [selectedVariant, setSelectedVariant] = React.useState(0)

  const theme = useTheme()

  const imageSelectHandler = (e, id) => {
    e.preventDefault()
    props.changeHandler('variant', id)
    setSelectedVariant(id)
  }

  React.useEffect(() => {
    const slug = window.location.search.split('slug=')[1]
    getSingleProduct(slug)
      .then(res => {
        props.changeHandler('variant', res.variants[0].id)
        setSelectedVariant(res.variants[0].id)
        setProduct({...res})
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <Box>
      <Box textAlign={'center'} mt={15}>
        <Typography variant={'h3'}>Your Once A Day Review</Typography>
        {product.variants?.length > 1 ? (
          <Typography variant={'body3'}>
            Please select which product variant you are reviewing
          </Typography>
        ) : null}
      </Box>
      <Stack>
        {loading ? (
          <Stack justifyContent={'center'} direction={'row'} mt={5}>
            <CircularProgress />
          </Stack>
        ) : product?.variants ? (
          <Stack
            direction={'row'}
            justifyContent={'center'}
            spacing={3}
            mt={5}
            sx={{flexWrap: 'wrap'}}
          >
            {product.variants.map((variant, i) => (
              <Stack
                key={variant.id}
                sx={{
                  border: '2px solid',
                  borderColor:
                    selectedVariant === variant.id
                      ? theme.palette.primary.main
                      : 'transparent',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  transition: '300ms',
                }}
                onClick={e => imageSelectHandler(e, variant.id)}
              >
                <Box
                  sx={{
                    width: '90px',
                    height: '160px',
                    backgroundImage: `url("${variant.image_list[0].image}")`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    boxSizing: 'border-box',
                  }}
                />
                <Typography textAlign={'center'} variant={'body1'}>
                  {variant.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        ) : null}
        <Box />
      </Stack>
    </Box>
  )
}

export default Variants
