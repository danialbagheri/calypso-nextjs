import * as React from 'react'

import Image from 'next/image'

import {Alert, AlertTitle, Box, Typography} from '@mui/material'

import {confirmResetPassword} from 'services'

import {useRouter} from 'next/router'
import {CustomButton, CustomOutlinedInput} from 'components/shared'

const UID = 'uid'
const TOKEN = 'token'
const NEW_PASSWORD = 'new_password'
const RE_NEW_PASSWORD = 're_new_password'
const NON_FIELD_ERRORS = 'non_field_errors'

const errorInitialState = {
  [NEW_PASSWORD]: '',
  [RE_NEW_PASSWORD]: '',
  [NON_FIELD_ERRORS]: '',
}

export default function ResetPassword() {
  const [data, setData] = React.useState({
    [NEW_PASSWORD]: '',
    [RE_NEW_PASSWORD]: '',
  })
  const [error, setError] = React.useState({...errorInitialState})
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const passwordSpecifications = [
    '8-16 characters',
    'lower case characters',
    'upper case characters',
    'digits (0-9)',
  ]

  const onChangeHandler = (value, field) => {
    setData(prev => ({...prev, [field]: value}))
  }

  const resetPasswordHandler = async () => {
    setLoading(true)
    setError({...errorInitialState})

    const apiData = {
      [UID]: router.query[UID],
      [TOKEN]: router.query[TOKEN],
      [NEW_PASSWORD]: data[NEW_PASSWORD],
      [RE_NEW_PASSWORD]: data[RE_NEW_PASSWORD],
    }

    try {
      await confirmResetPassword(apiData)
      router.push('/user/sign-in/?password_changed=true')
    } catch (err) {
      console.error(err)
      setError(err?.res || errorInitialState)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: {xs: 290, md: 640},
        m: '0 auto',
        py: {xs: 6, md: 21},

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},
        gap: {xs: 3, md: 15},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },
      }}
    >
      <Box width="100%">
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
          <Alert severity="error" sx={{mt: 5, width: {xs: '100%', md: 260}}}>
            <AlertTitle>Error</AlertTitle>
            <Typography>{error[NON_FIELD_ERRORS][0]}</Typography>
          </Alert>
        ) : null}

        <CustomOutlinedInput
          error={error[NEW_PASSWORD] || Boolean(error[NON_FIELD_ERRORS])}
          id={'change_password_email_address'}
          label="New password"
          onChange={e => onChangeHandler(e.target.value, NEW_PASSWORD)}
          placeholder="New password"
          sx={{width: {xs: '100%', md: 260}, mt: 7}}
          type="password"
          value={data[NEW_PASSWORD]}
        />
        <CustomOutlinedInput
          error={error[RE_NEW_PASSWORD] || Boolean(error[NON_FIELD_ERRORS])}
          id={'change_password_email_address'}
          onChange={e => onChangeHandler(e.target.value, RE_NEW_PASSWORD)}
          placeholder="Confirm new password"
          sx={{width: {xs: '100%', md: 260}, mt: 3}}
          type="password"
          value={data[RE_NEW_PASSWORD]}
        />

        <CustomButton
          loading={loading}
          onClick={resetPasswordHandler}
          sx={{width: 260, mx: 'auto', display: 'flex', mt: 12, height: 46}}
          variant="contained"
        >
          Save new password
        </CustomButton>
      </Box>
      <Image
        alt={'Calypso girl'}
        height={290}
        id="user_details_girl_icon"
        src={
          'https://calypso-static.s3.amazonaws.com/media/svg-icon-groups/User-account-12.svg'
        }
        width={290}
      />
    </Box>
  )
}
