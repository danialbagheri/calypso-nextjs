import * as React from 'react'

/* ---------------------------- NextJs Component ---------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Libraries ------------------------------- */
import {parseCookies} from 'nookies'
/* -------------------------------------------------------------------------- */

/* ------------------------------ MUI Component ----------------------------- */
import {Box, CircularProgress} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {assetsEndPoints, getAssets} from 'utils'
import {useAuthFetch} from 'components/customHooks'
import {getUserInfo, getUserOrders} from 'services'
import {Body, Header} from 'components/user/dashboard'
/* -------------------------------------------------------------------------- */

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
  const authFunctions = useAuthFetch()

  /* -------------------------------------------------------------------------- */
  const router = useRouter()
  const cookies = parseCookies()

  const handleGetUserInfo = async () => {
    /**
     *
     * @param {string} token Is access token which is passed from useAuthFetch hook
     * @returns void
     * Functions which should be done when user is authenticated
     */
    const onAuthenticatedAction = async token => {
      const data = await getUserInfo(token)
      const orders = await getUserOrders(token)
      setUserData(prevState => ({...prevState, info: {...data}, orders}))
    }

    /**
     * Functions which should be done when user is not authenticated
     */
    const onNotAuthenticatedAction = () => {
      router.push('/user')
    }

    await authFunctions({
      setLoading,
      onAuthenticatedAction,
      onNotAuthenticatedAction,
    })
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
