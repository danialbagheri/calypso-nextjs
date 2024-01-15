import * as React from 'react'

import Image from 'next/image'

import {Box, Typography} from '@mui/material'

import {assetsEndPoints, getAssets} from '../../../../utils'
import UserDetailsFields from '../../../../components/user/UserDetailsFields'
import {CustomButton} from '../../../../components/user/localShared'
import {
  getUserInfo,
  patchUserInfo,
  postRefreshToken,
} from '../../../../services'
import {parseCookies, setCookie} from 'nookies'
import {EMAIL, FIRST_NAME, LAST_NAME, MOBILE_NUMBER} from '..'
import {useRouter} from 'next/router'

const ACCOUNT_DETAILS = 'account details'
const CHECK_ICON_ORANGE = 'check-icon-orange'

export default function AccountDetails(props) {
  const {assets} = props
  const [fieldData, setFieldData] = React.useState({
    id: '',
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [MOBILE_NUMBER]: '',
  })

  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  const {checkIcon, userAccountTopIcons} = assetsEndPoints

  const girlIcon = assets[userAccountTopIcons]?.items.find(
    item =>
      item.name.toLowerCase().trim() === ACCOUNT_DETAILS.toLowerCase().trim(),
  )
  const orangeCheckIcon = assets[checkIcon]?.items.find(
    item =>
      item.name.toLowerCase().trim() === CHECK_ICON_ORANGE.toLowerCase().trim(),
  )

  const saveHandler = async () => {
    const {calacc, calref} = parseCookies()
    setLoading(true)
    try {
      await patchUserInfo(fieldData, calacc)
    } catch (err) {
      if (err.status === 401) {
        try {
          const {access} = await postRefreshToken({refresh: calref})
          setCookie(null, 'calacc', access, {
            maxAge: 30 * 60 * 1000,
            path: '/',
          })
          await patchUserInfo(fieldData, access)
        } catch {
          if (err.status === 401) {
            console.error(err)
            router.push('/user')
          } else {
            console.error(err)
          }
        }
      } else {
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGetUserInfo = async () => {
    const {calacc, calref} = parseCookies()
    try {
      const data = await getUserInfo(calacc)
      setFieldData({...data})
    } catch (err) {
      if (err.status === 401) {
        try {
          const {access} = await postRefreshToken({refresh: calref})

          setCookie(null, 'calacc', access, {
            maxAge: 30 * 60 * 1000,
            path: '/',
          })

          const data = await getUserInfo(access)
          setFieldData({...data})
        } catch (err) {
          if (err.status === 401) {
            console.error(err)
            router.push('/user')
          } else {
            console.error(err)
          }
        }
      } else {
        console.error(err)
      }
    }
  }

  React.useEffect(() => {
    handleGetUserInfo()
  }, [])

  return (
    <Box
      sx={{
        width: {xs: '100%', md: 640},
        m: '0 auto',
        py: {xs: 6, md: 21},

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },
      }}
    >
      <Box>
        <Typography sx={{fontSize: 24, fontWeight: 700}} textAlign="center">
          Account details
        </Typography>
        <Typography color="secondary.main" mt={3} textAlign="center">
          Please make sure you complete all the boxes
        </Typography>
        <UserDetailsFields
          checkIcon={orangeCheckIcon}
          fieldData={fieldData}
          setFieldData={setFieldData}
        />
        <CustomButton
          loading={loading}
          onClick={saveHandler}
          sx={{width: 162, mx: 'auto', display: 'flex', mt: 12, height: 52}}
          variant="contained"
        >
          Save details
        </CustomButton>
      </Box>
      <Image
        alt={girlIcon.name}
        height={290}
        id="user_details_girl_icon"
        src={girlIcon.svg_icon}
        width={290}
      />
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const {checkIcon, userAccountTopIcons} = assetsEndPoints

    const assets = await getAssets([checkIcon, userAccountTopIcons])

    return {
      props: {
        assets,
      },
      revalidate: 120, // will be passed to the page component as props
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        assets: {},
      },
      revalidate: 120, // will be passed to the page component as props
    }
  }
}
