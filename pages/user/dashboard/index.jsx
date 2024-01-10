import * as React from 'react'

import {useRouter} from 'next/router'
import {parseCookies, setCookie} from 'nookies'
import {getUserInfo, getUserOrders, postRefreshToken} from '../../../services'
import {assetsEndPoints, getAssets} from '../../../utils'
import {Box, CircularProgress} from '@mui/material'
import {Header} from '../../../components/user/dashboard'

const {userAccountTopIcons} = assetsEndPoints

export default function Dashboard(props) {
  const {assets} = props

  const headerImage = assets[userAccountTopIcons].items.find(
    item => item.name === 'Dashboard',
  )

  const [loading, setLoading] = React.useState(true)
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    first_name: '',
    last_name: '',
    id: '',
    mobile_number: '',
  })
  const [userOrders, setUserOrders] = React.useState([])

  console.log('🚀 🙂  userOrders:::', userOrders)

  const router = useRouter()
  const cookies = parseCookies()

  const fullName = userInfo.first_name + ' ' + userInfo.last_name

  //We need to get the user info and the user orders here
  //because nextjs does not have access to the cookies on the server side
  const handleGetUserInfo = async () => {
    setLoading(true)
    try {
      const {calacc} = cookies
      const data = await getUserInfo(calacc)
      const orders = await getUserOrders(calacc)

      setUserInfo({...data})
      setUserOrders(orders)
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

          setUserInfo(data)
          setUserOrders(orders)
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
    <>
      {loading ? (
        <Box
          className="centralize"
          sx={{
            width: {xs: '100%', md: '713px'},
            m: '0 auto',
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: {xs: '100%', md: '713px'},
            m: '0 auto',
            height: 200,
          }}
        >
          <Header image={headerImage} name={fullName} />
        </Box>
      )}
    </>
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
