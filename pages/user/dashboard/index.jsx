import * as React from 'react'

import {useRouter} from 'next/router'
import {parseCookies, setCookie} from 'nookies'
import {getUserInfo, getUserOrders, postRefreshToken} from '../../../services'
import {assetsEndPoints, getAssets} from '../../../utils'
import {Box, CircularProgress} from '@mui/material'
import {Body, Header} from '../../../components/user/dashboard'

const {userAccountTopIcons} = assetsEndPoints

export const FIRST_NAME = 'first_name'
export const LAST_NAME = 'last_name'
export const EMAIL = 'email'
export const MOBILE_NUMBER = 'mobile_number'

const MOCK_ORDER_DATA = [
  {
    created_at: '2021-03-26T11:30:34Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '204.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '34.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml',
        quantity: 17,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '204.0',
          currency: 'GBP',
        },
      },
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml',
        quantity: 17,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '204.0',
          currency: 'GBP',
        },
      },
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml',
        quantity: 17,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '204.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2021-03-20T09:00:45Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '60.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '10.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml',
        quantity: 5,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '60.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2021-02-05T14:33:16Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '180.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '30.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml',
        quantity: 15,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '180.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2021-01-18T16:09:23Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '120.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '20.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml',
        quantity: 10,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '120.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-11-04T16:38:48Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '150.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '25.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 10,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '150.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-10-19T13:53:20Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '90.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '15.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 6,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '90.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-10-01T15:36:01Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '495.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '82.5',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 33,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '495.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-09-16T07:14:18Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '90.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '15.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 6,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '90.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-09-01T16:45:47Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '90.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '15.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 6,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '90.0',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-08-18T17:08:09Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '115.2',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '19.2',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 6,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '115.2',
          currency: 'GBP',
        },
      },
    ],
  },
  {
    created_at: '2020-07-30T08:31:30Z',
    refundable: true,
    financial_status: 'PAID',
    total_price: {
      amount: '192.0',
      currency: 'GBP',
    },
    total_shipping_price: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_tax: {
      amount: '32.0',
      currency: 'GBP',
    },
    total_discount: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded: {
      amount: '0.0',
      currency: 'GBP',
    },
    total_refunded_shipping: {
      amount: '0.0',
      currency: 'GBP',
    },
    items: [
      {
        image_original_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        image_transformed_source:
          'https://cdn.shopify.com/s/files/1/0001/9896/7351/products/CALB06HAndHygieneGel50ml.jpg?v=1591098283',
        name: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12 - 12 x 50ml',
        title: 'Anti Bacterial Hand Hygiene Gel 50ml - pack of 12',
        quantity: 10,
        'product-slug': 'once-a-day',
        sku: 'CALB06BOX',
        total_price: {
          amount: '192.0',
          currency: 'GBP',
        },
      },
    ],
  },
]

export default function Dashboard(props) {
  const {assets} = props
  const headerImage = assets[userAccountTopIcons].items.find(
    item => item.name === 'Dashboard',
  )
  /* --------------------------------- States --------------------------------- */
  const [loading, setLoading] = React.useState(true)
  const [userData, setUserData] = React.useState({
    info: {
      [EMAIL]: '',
      [FIRST_NAME]: '',
      [LAST_NAME]: '',
      id: '',
      [MOBILE_NUMBER]: '',
    },
    orders: [],
  })
  /* -------------------------------------------------------------------------- */
  const router = useRouter()
  const cookies = parseCookies()

  const fullName = userData.info.first_name + ' ' + userData.info.last_name

  //We need to get the user info and the user orders here
  //because nextjs does not have access to the cookies on the server side
  const handleGetUserInfo = async () => {
    setLoading(true)
    try {
      const {calacc} = cookies
      const data = await getUserInfo(calacc)
      const orders = await getUserOrders(calacc)

      setUserData(prevState => ({...prevState, info: {...data}, orders}))

      setLoading(false)
    } catch (err) {
      if (err.status === 401) {
        try {
          const {access} = await postRefreshToken({refresh: cookies.calref})

          setCookie(null, 'calacc', access, {
            maxAge: 30 * 60 * 1000,
            path: '/',
          })

          const data = await getUserInfo(access)
          const orders = await getUserOrders(access)

          setUserData(prevState => ({...prevState, info: {...data}, orders}))
          setLoading(false)
        } catch (err) {
          if (err.status === 401) {
            console.error(err)
            setLoading(false)
            router.push('/user')
          } else {
            console.error(err)
            setLoading(false)
          }
        }
      } else {
        console.error(err)
        setLoading(false)
      }
    }
  }

  React.useEffect(() => {
    if (cookies.calacc) {
      handleGetUserInfo()
    } else {
      router.push('/user')
    }
  }, [])

  return (
    <Box sx={{width: {xs: '100%', md: '713px'}, margin: '0 auto'}}>
      {loading ? (
        <Box
          className="centralize"
          sx={{
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Header image={headerImage} name={fullName} />
          <Body orders={MOCK_ORDER_DATA} />
        </>
      )}
    </Box>
  )
}

/* ---------------------------- GET STATIC PROPS ---------------------------- */

export async function getStaticProps() {
  const assets = await getAssets([userAccountTopIcons])

  return {
    props: {assets},
    revalidate: 120, // will be passed to the page component as props
  }
}
