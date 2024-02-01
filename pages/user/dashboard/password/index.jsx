import * as React from 'react'

import {Alert, AlertTitle, Box, Typography} from '@mui/material'

import {assetsEndPoints, getAssets} from '../../../../utils'

import {
  CustomButton,
  CustomOutlinedInput,
} from '../../../../components/user/localShared'
// import {parseCookies, setCookie} from 'nookies'
import {useRouter} from 'next/router'
import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {postRefreshToken, postSetPassword} from '../../../../services'
import SideBar from '../../../../components/user/dashboard/SideBar'
import {AppContext} from '../../../../components/appProvider'

const PASSWORD_GIRL_ICON = 'password'

const NEW_PASSWORD = 'new_password'
const CURRENT_PASSWORD = 'current_password'
const RE_NEW_PASSWORD = 're_new_password'
const NON_FIELD_ERRORS = 'non_field_errors'

const initialState = {
  [NEW_PASSWORD]: '',
  [CURRENT_PASSWORD]: '',
  [RE_NEW_PASSWORD]: '',
}

export default function Password(props) {
  const {assets} = props

  const [fieldData, setFieldData] = React.useState({
    ...initialState,
  })
  const [error, setError] = React.useState({
    ...initialState,
  })
  const [loading, setLoading] = React.useState(false)
  const [, setAppState] = React.useContext(AppContext)

  const router = useRouter()

  const {userAccountTopIcons, popUpPassword} = assetsEndPoints

  const girlIcon = assets[userAccountTopIcons]?.items.find(
    item =>
      item.name.toLowerCase().trim() ===
      PASSWORD_GIRL_ICON.toLowerCase().trim(),
  )

  const passwordSpecifications = assets[popUpPassword]?.items

  const handleError = state => {
    if (state && typeof state === 'object') {
      Object.keys(state).forEach(key => {
        setError(prev => ({...prev, [key]: state[key]}))
      })
    }
  }

  const saveHandler = async () => {
    const {calacc, calref} = parseCookies()

    setError({...initialState})

    setLoading(true)
    try {
      await postSetPassword({data: fieldData, token: calacc})
      destroyCookie(null, 'calacc', {path: '/'})
      destroyCookie(null, 'calref', {path: '/'})
      setAppState(perv => ({...perv, isAuthenticate: false}))
      router.push('/user/sign-in/?password_changed=true')
    } catch (err) {
      if (err.status === 401) {
        try {
          const {access} = await postRefreshToken({
            refresh: calref || 'null_token',
          })
          setCookie(null, 'calacc', access, {
            path: '/',
          })
          await postSetPassword({data: fieldData, token: access})
          destroyCookie(null, 'calacc', {path: '/'})
          destroyCookie(null, 'calref', {path: '/'})
          setAppState(perv => ({...perv, isAuthenticate: false}))
          router.push('/user/sign-in/?password_changed=true')
        } catch {
          if (err.status === 401) {
            destroyCookie(null, 'calacc', {path: '/'})
            destroyCookie(null, 'calref', {path: '/'})
            setAppState(perv => ({...perv, isAuthenticate: false}))
            console.error(err)
            router.push('/user')
          } else {
            console.error(err)
            handleError(err.res)
          }
        }
      } else {
        console.error(err)
        handleError(err.res)
      }
    } finally {
      setLoading(false)
    }
  }

  const changeHandler = (value, field) => {
    setFieldData(prev => ({...prev, [field]: value}))
  }

  return (
    <Box
      sx={{
        width: {xs: 270, md: 740},
        m: '0 auto',
        py: {xs: 6, md: 21},

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},
        gap: {xs: 3, md: 20},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },
      }}
    >
      <SideBar girlIcon={girlIcon} route="password" />

      <Box width={{xs: '100%', md: 318}}>
        <Typography sx={{fontSize: 24, fontWeight: 700}} textAlign="center">
          Password
        </Typography>
        <Typography color="secondary.main" mt={3}>
          Please provide the following details
        </Typography>
        <Box mt={1}>
          {passwordSpecifications?.map(item => (
            <Typography key={item.id}>{item.text}</Typography>
          ))}
        </Box>
        {error[NON_FIELD_ERRORS] ? (
          <Alert severity="error" sx={{mt: 5}}>
            <AlertTitle>Error</AlertTitle>
            <Typography>{error[NON_FIELD_ERRORS][0]}</Typography>
          </Alert>
        ) : null}
        <Box className="centralize" gap={3} mt={4}>
          <CustomOutlinedInput
            error={error[CURRENT_PASSWORD]}
            id={'change_password_current_password'}
            label="Old password"
            onChange={e => changeHandler(e.target.value, CURRENT_PASSWORD)}
            placeholder="Old password"
            sx={{width: '100%'}}
            type="password"
            value={fieldData[CURRENT_PASSWORD]}
          />
        </Box>
        <Box>
          <Box className="centralize" gap={3} mt={4}>
            <CustomOutlinedInput
              error={error[NEW_PASSWORD]}
              id={'change_password_new_password'}
              label="New password"
              onChange={e => changeHandler(e.target.value, NEW_PASSWORD)}
              placeholder="New password"
              sx={{width: '100%'}}
              type="password"
              value={fieldData[NEW_PASSWORD]}
            />
          </Box>
          <Box className="centralize" gap={3} mt={2}>
            <CustomOutlinedInput
              error={error[RE_NEW_PASSWORD]}
              id={'change_password_re_new_password'}
              onChange={e => changeHandler(e.target.value, RE_NEW_PASSWORD)}
              placeholder="Confirm new password"
              sx={{width: '100%'}}
              type="password"
              value={fieldData[RE_NEW_PASSWORD]}
            />
          </Box>
        </Box>

        <CustomButton
          loading={loading}
          onClick={saveHandler}
          sx={{width: 216, mx: 'auto', display: 'flex', mt: 12, height: 46}}
          variant="contained"
        >
          Save details
        </CustomButton>
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const {userAccountTopIcons, popUpPassword} = assetsEndPoints

    const assets = await getAssets([userAccountTopIcons, popUpPassword])

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
