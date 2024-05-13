import {useEffect, useState} from 'react'

import Image from 'next/image'
import {useRouter} from 'next/router'

import {Box, CircularProgress, Divider, Typography} from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import {monthArr, priceHandler} from 'utils'
import {useAuthFetch} from 'components/customHooks'
import {getUserOrders} from 'services'
import {Container} from 'components/user/dashboard'
import {CartEmpty} from 'components/icons'
import {useTheme} from '@emotion/react'

const breadcrumbs = [
  {label: 'Dashboard', href: '/user/dashboard'},
  {label: 'My orders', href: ''},
]

export default function Orders() {
  const fetchHandlers = useAuthFetch()
  const router = useRouter()
  const theme = useTheme()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const formatDate = date => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = monthArr[d.getMonth()]
    const day = d.getDate()
    return `${day} ${month} ${year}`
  }

  useEffect(() => {
    const onAuthenticatedAction = async token => {
      const orders = await getUserOrders(token)

      setOrders(orders)
    }
    const onNotAuthenticatedAction = async () => {
      router.push('/user')
    }

    fetchHandlers({
      onAuthenticatedAction,
      onNotAuthenticatedAction,
      setLoading,
    })
  }, [])

  return (
    <Container breadcrumbs={breadcrumbs}>
      <Box
        className="centralize"
        sx={{width: '100%', mb: {xs: 8, md: 6}, gap: '12px'}}
      >
        <CartEmpty sx={{fill: theme.palette.primary.main}} />
        <Typography sx={{fontSize: '24px', fontWeight: 700}}>
          My orders
        </Typography>
      </Box>
      {loading ? (
        <Box
          className="centralize"
          sx={{
            height: 200,
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            width: '100%',
          }}
        >
          {orders.length ? (
            orders.map(order => (
              <Box key={order.created_at} sx={{width: '100%'}}>
                <Typography
                  color="primary.main"
                  sx={{fontSize: 14, fontWeight: 700}}
                >
                  {formatDate(order.created_at)}
                </Typography>
                <Box
                  sx={{
                    p: '18px 30px',
                    border: '2px solid #F2F2F2',
                    borderRadius: '10px',
                    '&>hr:last-child': {
                      display: 'none',
                    },
                  }}
                >
                  {order.items.map((item, i) => (
                    <>
                      <Box
                        className="centralize"
                        key={item.sku + i}
                        sx={{gap: '14px'}}
                      >
                        <Box
                          sx={{width: 94, height: 110, position: 'relative'}}
                        >
                          <Image
                            alt={item.name || 'Product image'}
                            fill
                            sizes="100vw"
                            src={item.image_original_source || ''}
                            styles={{objectFit: 'cover'}}
                          />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '26px',
                              fontWeight: 700,
                              color: '#226F61',
                            }}
                          >
                            {priceHandler({
                              price: item.total_price.amount,
                              currency: item.total_price.currency,
                            })}
                          </Typography>
                          <Typography>{item.name}</Typography>
                          <Typography sx={{fontSize: '16px', fontWeight: 700}}>
                            x{item.quantity}
                          </Typography>
                        </Box>
                        <ArrowForwardIosIcon />
                      </Box>
                      <Divider sx={{borderColor: '#F2F2F2', my: '12px'}} />
                    </>
                  ))}
                </Box>
              </Box>
            ))
          ) : (
            <Box
              className="centralize"
              sx={{
                width: '100%',
                border: '2px solid #F2F2F2',
                borderRadius: '10px',
                flexDirection: 'column',
                p: 7,
                gap: 3,
              }}
            >
              <LocalGroceryStoreIcon
                sx={{fontSize: '100px', fill: '#D6D6D6'}}
              />
              <Typography
                sx={{fontSize: 21, fontWeight: 700, color: '#D6D6D6'}}
              >
                No orders yet
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  )
}
