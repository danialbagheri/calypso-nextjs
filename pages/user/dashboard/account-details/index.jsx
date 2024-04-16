import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

import {useRouter} from 'next/router'

/* ---------------------------- Local Components ---------------------------- */
import {EMAIL, FIRST_NAME, LAST_NAME, MOBILE_NUMBER} from '..'
import {useAuthFetch} from 'components/customHooks'
import {validateMobileNumber, validateName} from 'utils'
import {getUserInfo, patchUserInfo} from 'services'
import {Container} from 'components/user/dashboard'
import UserDetailsFields from 'components/user/UserDetailsFields'
import {CustomButton} from 'components/shared'

/* -------------------------------------------------------------------------- */

export default function AccountDetails() {
  /* ---------------------------------- Hooks --------------------------------- */
  const [fieldData, setFieldData] = React.useState({
    id: '',
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [MOBILE_NUMBER]: '',
  })
  const [error, setError] = React.useState({
    [FIRST_NAME]: null,
    [LAST_NAME]: null,
    [EMAIL]: null,
    [MOBILE_NUMBER]: null,
  })
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const router = useRouter()
  const initialFieldData = React.useRef({
    id: '',
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [MOBILE_NUMBER]: '',
  })
  const authFunctions = useAuthFetch()

  /* -------------------------------------------------------------------------- */

  const renderSubtitle = () => {
    if (isEdit) {
      return 'Make sure your details are up to date'
    } else if (success) {
      return 'Your account details has been successfully updated'
    }
    return 'You can view or change your personal details'
  }

  const errorHandler = () => {
    let errorState = false
    setError({
      [FIRST_NAME]: false,
      [LAST_NAME]: false,
      [EMAIL]: false,
      [MOBILE_NUMBER]: false,
    })

    if (fieldData[FIRST_NAME] && !validateName(fieldData[FIRST_NAME])) {
      errorState = true
      setError(prev => ({...prev, [FIRST_NAME]: 'Please enter a valid name'}))
    }
    if (fieldData[LAST_NAME] && !validateName(fieldData[LAST_NAME])) {
      errorState = true
      setError(prev => ({...prev, [LAST_NAME]: 'Please enter a valid name'}))
    }
    if (
      fieldData[MOBILE_NUMBER] &&
      !validateMobileNumber(fieldData[MOBILE_NUMBER])
    ) {
      errorState = true
      setError(prev => ({
        ...prev,
        [MOBILE_NUMBER]: 'Please enter a valid mobile number',
      }))
    }

    return errorState
  }

  const discardHandler = () => {
    setFieldData({...initialFieldData.current})
    setError({
      [FIRST_NAME]: false,
      [LAST_NAME]: false,
      [EMAIL]: false,
      [MOBILE_NUMBER]: false,
    })
    setIsEdit(false)
  }

  const saveHandler = async () => {
    const errorState = errorHandler()
    setSuccess(false)

    if (!errorState) {
      const onAuthenticatedAction = async token => {
        const res = await patchUserInfo(fieldData, token)
        const response = await res.json()
        setFieldData({...response})
        initialFieldData.current = {...response}
        setSuccess(true)
        setIsEdit(false)
      }

      const onNotAuthenticatedAction = () => {
        setSuccess(false)
        router.push('/user')
      }

      const handleError = () => {
        setSuccess(false)
      }

      await authFunctions({
        setLoading,
        onAuthenticatedAction,
        onNotAuthenticatedAction,
        handleError,
      })
    }
  }

  const handleGetUserInfo = async () => {
    const onAuthenticatedAction = async token => {
      const data = await getUserInfo(token)
      initialFieldData.current = {...data}
      setFieldData({...data})
    }

    const onNotAuthenticatedAction = () => {
      router.push('/user')
    }

    await authFunctions({
      onAuthenticatedAction,
      onNotAuthenticatedAction,
    })
  }

  React.useEffect(() => {
    handleGetUserInfo()
  }, [])

  return (
    <Container route="account-details">
      <Box width={{xs: '100%', md: 318}}>
        <Typography sx={{fontSize: 24, fontWeight: 700}} textAlign="center">
          Account details
        </Typography>

        <Typography color="secondary.main" mt={3} textAlign="center">
          {renderSubtitle()}
        </Typography>

        <UserDetailsFields
          error={error}
          fieldData={fieldData}
          isEdit={isEdit}
          setError={setError}
          setFieldData={setFieldData}
        />

        {!isEdit ? (
          <CustomButton
            onClick={() => setIsEdit(true)}
            sx={{width: 220, mx: 'auto', display: 'flex', mt: 12, height: 52}}
            variant="contained"
          >
            Edit details
          </CustomButton>
        ) : null}

        {isEdit ? (
          <>
            <CustomButton
              loading={loading}
              onClick={saveHandler}
              sx={{
                width: 220,
                mx: 'auto',
                display: 'flex',
                mt: 12,
                height: 52,
              }}
              variant="contained"
            >
              Save changes
            </CustomButton>
            <CustomButton
              onClick={discardHandler}
              sx={{
                width: 220,
                mx: 'auto',
                display: 'flex',
                mt: 3,
                height: 52,
              }}
              variant="outlined"
            >
              Discard changes
            </CustomButton>
          </>
        ) : null}
      </Box>
    </Container>
  )
}
