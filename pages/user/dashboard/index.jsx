import * as React from 'react'

import {useRouter} from 'next/router'
import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {getUserInfo, getUserOrders, postRefreshToken} from '../../../services'
import {assetsEndPoints, getAssets} from '../../../utils'
import {Box, CircularProgress} from '@mui/material'
import {Body, Header} from '../../../components/user/dashboard'

const {userAccountTopIcons} = assetsEndPoints

export const FIRST_NAME = 'first_name'
export const LAST_NAME = 'last_name'
export const EMAIL = 'email'
export const MOBILE_NUMBER = 'mobile_number'

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
            destroyCookie(null, 'calacc', {path: '/'})
            destroyCookie(null, 'calref', {path: '/'})
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
          <Header image={headerImage} name={userData.info.first_name} />
          <Body orders={userData.orders} />
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
