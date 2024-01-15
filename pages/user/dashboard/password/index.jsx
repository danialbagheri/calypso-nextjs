import * as React from 'react'

import Image from 'next/image'

import {Box, Typography} from '@mui/material'

import {assetsEndPoints, getAssets} from '../../../../utils'

import {
  CustomButton,
  CustomOutlinedInput,
} from '../../../../components/user/localShared'
// import {parseCookies, setCookie} from 'nookies'
import {useRouter} from 'next/router'

const PASSWORD_GIRL_ICON = 'password'
const CHECK_ICON_ORANGE = 'check-icon-orange'

const NEW_PASSWORD = 'new_password'
const CURRENT_PASSWORD = 'current_password'
const RE_NEW_PASSWORD = 're_new_password'

export default function Password(props) {
  const {assets} = props

  const [fieldData, setFieldData] = React.useState({
    [NEW_PASSWORD]: '',
    [CURRENT_PASSWORD]: '',
    [RE_NEW_PASSWORD]: '',
  })

  const [loading] = React.useState(false)

  const router = useRouter()

  const {checkIcon, userAccountTopIcons, popUpPassword} = assetsEndPoints

  const girlIcon = assets[userAccountTopIcons]?.items.find(
    item =>
      item.name.toLowerCase().trim() ===
      PASSWORD_GIRL_ICON.toLowerCase().trim(),
  )
  const orangeCheckIcon = assets[checkIcon]?.items.find(
    item =>
      item.name.toLowerCase().trim() === CHECK_ICON_ORANGE.toLowerCase().trim(),
  )
  const passwordSpecifications = assets[popUpPassword]?.items

  const OrangeIcon = props => {
    const {field, mt = null} = props
    return (
      <Box height={24} mt={mt !== null ? mt : 5} width={24}>
        {field ? (
          <Image
            alt={orangeCheckIcon.name || ''}
            height={20}
            src={orangeCheckIcon.svg_icon || ''}
            width={20}
          />
        ) : null}
      </Box>
    )
  }

  // const saveHandler = async () => {
  //   const {calacc, calref} = parseCookies()
  //   setLoading(true)
  //   try {
  //     await patchUserInfo(fieldData, calacc)
  //   } catch (err) {
  //     if (err.status === 401) {
  //       try {
  //         const {access} = await postRefreshToken({refresh: calref})
  //         setCookie(null, 'calacc', access, {
  //           maxAge: 30 * 60 * 1000,
  //           path: '/',
  //         })
  //         await patchUserInfo(fieldData, access)
  //       } catch {
  //         if (err.status === 401) {
  //           console.error(err)
  //           router.push('/user')
  //         } else {
  //           console.error(err)
  //         }
  //       }
  //     } else {
  //       console.error(err)
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const changeHandler = (value, field) => {
    setFieldData(prev => ({...prev, [field]: value}))
  }

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
        gap: {xs: 3, md: 0},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },
      }}
    >
      <Box>
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
        <Box className="centralize" gap={3} mt={4}>
          <CustomOutlinedInput
            id={'change_password_current_password'}
            label="Old password"
            onChange={e => changeHandler(e.target.value, CURRENT_PASSWORD)}
            placeholder="Old password"
            sx={{width: '100%'}}
            type="password"
            value={fieldData[CURRENT_PASSWORD]}
          />
          <OrangeIcon field={fieldData[CURRENT_PASSWORD]} />
        </Box>
        <Box>
          <Box className="centralize" gap={3} mt={4}>
            <CustomOutlinedInput
              id={'change_password_new_password'}
              label="New password"
              onChange={e => changeHandler(e.target.value, NEW_PASSWORD)}
              placeholder="New password"
              sx={{width: '100%'}}
              type="password"
              value={fieldData[NEW_PASSWORD]}
            />
            <OrangeIcon field={fieldData[NEW_PASSWORD]} />
          </Box>
          <Box className="centralize" gap={3} mt={2}>
            <CustomOutlinedInput
              id={'change_password_re_new_password'}
              onChange={e => changeHandler(e.target.value, RE_NEW_PASSWORD)}
              placeholder="Confirm new password"
              sx={{width: '100%'}}
              type="password"
              value={fieldData[RE_NEW_PASSWORD]}
            />
            <OrangeIcon field={fieldData[RE_NEW_PASSWORD]} mt={0} />
          </Box>
        </Box>

        <CustomButton
          loading={loading}
          onClick={() => {}}
          sx={{width: 216, mx: 'auto', display: 'flex', mt: 12, height: 46}}
          variant="contained"
        >
          Save details
        </CustomButton>
        <CustomButton
          onClick={() => {
            router.push('/user/dashboard')
          }}
          sx={{width: 216, mx: 'auto', display: 'flex', mt: 3, height: 46}}
        >
          Cancel
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
    const {checkIcon, userAccountTopIcons, popUpPassword} = assetsEndPoints

    const assets = await getAssets([
      checkIcon,
      userAccountTopIcons,
      popUpPassword,
    ])

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
