import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Alert, AlertTitle, Box, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ------------------------------- Libraries ------------------------------- */
import {destroyCookie} from 'nookies'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {postSetPassword} from 'services'
import {AppContext} from 'components/appProvider'
import {useAuthFetch} from 'components/customHooks'
import {Container} from 'components/user/dashboard'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import {passwordDetails, routes} from 'constants/user'
/* -------------------------------------------------------------------------- */

const NEW_PASSWORD = 'new_password'
const CURRENT_PASSWORD = 'current_password'
const RE_NEW_PASSWORD = 're_new_password'
const NON_FIELD_ERRORS = 'non_field_errors'

const initialState = {
  [NEW_PASSWORD]: '',
  [CURRENT_PASSWORD]: '',
  [RE_NEW_PASSWORD]: '',
}
/* -------------------------------------------------------------------------- */

export default function Password() {
  /* ---------------------------------- Hooks --------------------------------- */
  const [fieldData, setFieldData] = React.useState({
    ...initialState,
  })
  const [error, setError] = React.useState({
    ...initialState,
  })
  const [loading, setLoading] = React.useState(false)
  const [, setAppState] = React.useContext(AppContext)
  const router = useRouter()
  const authFunctions = useAuthFetch()
  /* -------------------------------------------------------------------------- */

  const handleError = state => {
    if (state && typeof state === 'object') {
      Object.keys(state).forEach(key => {
        setError(prev => ({...prev, [key]: state[key]}))
      })
    }
  }

  const saveHandler = async () => {
    setError({...initialState})

    const onAuthenticatedAction = async token => {
      await postSetPassword({data: fieldData, token})
      destroyCookie(null, 'calacc', {path: '/'})
      destroyCookie(null, 'calref', {path: '/'})
      setAppState(perv => ({...perv, isAuthenticate: false}))
      router.push('/user/sign-in/?password_changed=true')
    }

    const onNotAuthenticatedAction = () => {
      router.push('/user')
    }

    await authFunctions({
      setLoading,
      onAuthenticatedAction,
      onNotAuthenticatedAction,
      handleError,
    })
  }

  const changeHandler = (value, field) => {
    setFieldData(prev => ({...prev, [field]: value}))
  }

  return (
    <Container route={routes.PASSWORD}>
      <Box width={{xs: '100%', md: 318}}>
        <Typography sx={{fontSize: 24, fontWeight: 700}} textAlign="center">
          Password
        </Typography>
        <Typography color="secondary.main" mt={3}>
          Please provide the following details
        </Typography>
        <Box mt={1}>
          {passwordDetails?.map(item => (
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
    </Container>
  )
}
