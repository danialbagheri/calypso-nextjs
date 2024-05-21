import {Fragment, useEffect, useState} from 'react'

import {useRouter} from 'next/router'

import {Box, CircularProgress, Divider, Typography} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import {useAuthFetch} from 'components/customHooks'
import {getUserOrders} from 'services'
import {
  Container,
  OrderDetails,
  OrderItem,
  OrdersEmptyState,
} from 'components/user/dashboard'
import {CartEmpty} from 'components/icons'
import {monthArr} from 'utils'
import {useTheme} from '@emotion/react'

const breadcrumbsInitState = [
  {label: 'Dashboard', href: '/user/dashboard'},
  {
    label: 'My orders',
    href: '',
  },
]

export const formatDate = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = monthArr[d.getMonth()]
  const day = d.getDate()
  return `${day} ${month} ${year}`
}

export default function Orders() {
  const fetchHandlers = useAuthFetch()
  const router = useRouter()
  const theme = useTheme()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderDetail, setOrderDetail] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState(breadcrumbsInitState)

  const displayOrderDetail = Boolean(orderDetail)

  const backHandler = () => {
    setOrderDetail(null)
    setBreadcrumbs(breadcrumbsInitState)
  }

  const orderItemClickHandler = order => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    setOrderDetail(order)
    setBreadcrumbs([
      {label: 'Dashboard', href: '/user/dashboard'},
      {
        label: 'My orders',
        href: '',
        onClick: backHandler,
      },
      {label: 'Order details', href: ''},
    ])
  }

  const renderProperTitle = () => {
    return displayOrderDetail ? 'Order details' : 'My orders'
  }

  const title = renderProperTitle()

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
        sx={{
          width: '100%',
          mb: {xs: 8, md: 6},
          gap: '12px',
          position: 'relative',
        }}
      >
        <Box
          onClick={backHandler}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-35%)',
            cursor: 'pointer',
            display: displayOrderDetail ? 'block' : 'none',
          }}
        >
          <KeyboardBackspaceIcon color="primary" />
        </Box>
        <CartEmpty sx={{fill: theme.palette.primary.main}} />
        <Typography sx={{fontSize: '24px', fontWeight: 700}}>
          {title}
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
            display: displayOrderDetail ? 'none' : 'flex',
            flexDirection: 'column',
            gap: 6,
            width: '100%',
          }}
        >
          {orders.length ? (
            orders.map((order, i) => (
              <Box
                key={order.created_at + i}
                onClick={() => orderItemClickHandler(order)}
                sx={{width: '100%', cursor: 'pointer'}}
              >
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
                    <Fragment key={item.sku}>
                      <OrderItem item={item} key={i} />
                      <Divider sx={{borderColor: '#F2F2F2', my: '12px'}} />
                    </Fragment>
                  ))}
                </Box>
              </Box>
            ))
          ) : (
            <OrdersEmptyState />
          )}
        </Box>
      )}
      <OrderDetails
        order={orderDetail}
        sx={{display: displayOrderDetail ? 'flex' : 'none'}}
      />
    </Container>
  )
}
