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
import {useAuthFetch} from 'components/customHooks'
import {getFavoriteVariants, getUserInfo} from 'services'
import {
  Container,
  DashboardBody,
  DashboardHeader,
} from 'components/user/dashboard'
import {FAVORITE_VARIANTS, USER_DATA} from 'constants/general'
import {AppContext} from 'components'
/* -------------------------------------------------------------------------- */

export const FIRST_NAME = 'first_name'
export const LAST_NAME = 'last_name'
export const EMAIL = 'email'
export const MOBILE_NUMBER = 'mobile_number'

export default function Dashboard() {
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
  })
  const authFunctions = useAuthFetch()
  const [, setAppState] = React.useContext(AppContext)

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
      const favoriteProducts = await getFavoriteVariants(token)

      localStorage.setItem(
        FAVORITE_VARIANTS,
        JSON.stringify(favoriteProducts.results),
      )
      localStorage.setItem(USER_DATA, JSON.stringify(data))

      setUserData(prevState => ({
        ...prevState,
        info: {...data},
      }))

      setAppState(prevState => ({
        ...prevState,
        isAuthenticate: true,
        favoriteVariants: favoriteProducts.results,
        userData: data,
      }))
      const isComingFromProductPage = Object.keys(router.query).includes(
        'favourite',
      )
      if (isComingFromProductPage) {
        const path = router.query.favourite.split('_').join('/')
        router.push(path)
      }
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
    <>
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
        <Box>
          <Container
            mobileFooter={
              <DashboardBody
                orders={userData.orders}
                sx={{
                  display: {
                    xs: 'flex !important',
                    md: 'none !important',
                  },
                  mt: {xs: '10px', md: 0},
                }}
              />
            }
            route="dashboard"
          >
            <Box
              className="centralize"
              sx={{flexDirection: 'column', gap: '17px'}}
            >
              <DashboardHeader name={userData.info.first_name} />
              <DashboardBody
                sx={{display: {xs: 'none !important', md: 'flex !important'}}}
              />
            </Box>
          </Container>
        </Box>
      )}
    </>
  )
}
