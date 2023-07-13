import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import {useTheme} from '@mui/material'
import {getSingleProduct} from 'services'
import {useRouter} from 'next/router'

function Variants(props) {
  const router = useRouter()
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
    const slug = router.query.slug
    if (slug) {
      getSingleProduct(slug)
        .then(res => {
          props.changeHandler('variant', res.variants[0].id)
          setSelectedVariant(res.variants[0].id)
          setProduct({...res})
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [router.query])

  return (
    <Box>
      <Box mt={15} textAlign={'center'}>
        <Typography variant={'h3'}>Your {product.name} Review</Typography>
        {product.variants?.length > 1 ? (
          <Typography variant={'body3'}>
            Please select which product variant you are reviewing
          </Typography>
        ) : null}
      </Box>
      <Stack>
        {loading ? (
          <Stack direction={'row'} justifyContent={'center'} mt={5}>
            <CircularProgress />
          </Stack>
        ) : product?.variants ? (
          <Stack
            direction={'row'}
            justifyContent={'center'}
            mt={5}
            spacing={3}
            sx={{flexWrap: 'wrap'}}
          >
            {product.variants.map(variant => (
              <Stack
                key={variant.id}
                onClick={e => imageSelectHandler(e, variant.id)}
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
